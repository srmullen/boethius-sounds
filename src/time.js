import F from "fraction.js";

function isNote (item) {
	return item.type === "note";
}

function isChord (item) {
	return item.type === "chord";
}

function isRest (item) {
	return item.type === "rest";
}

/*
 * From Boethius timeUtils
 * @param item - Scored item. Given an item, return the rational duration of the item;
 * @return Number
 */
export function calculateDuration (item) {

	// If the event has no type it has no duration.
	if (!(isNote(item) || isChord(item) || isRest(item))) return 0;

	let s = item.tuplet ? item.tuplet.split("/") : null,
		tuplet = s ? new F(s[0], s[1]) : null,
		dur = new F(1, item.value || 4), // 4 is default quarter note
		dots = item.dots || 0;

	for (let i = 0; i < dots; i++) {
		dur = dur.mul(1.5);
	}

	if (tuplet && dur) {
		dur = dur.mul(s[1]).div(s[0]);
	}

	return dur;
}


/*
 * From Boethius Voice
 * @param items - Item[]
 * @param offset - Optional amount of time that will be added to the items times.
 */
export function calculateAndSetTimes (items, offset=0) {
    return items.reduce((acc, item) => {
        const previousItem = acc[acc.length - 1];

        if (previousItem) {
            item.time = F(previousItem.time).add(calculateDuration(previousItem)).add(offset).valueOf();
        } else {
            item.time = 0;
        }

		return acc.concat([item]);
    }, []);
}
