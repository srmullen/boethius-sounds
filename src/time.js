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
// memoizable?
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

	if (item.tempo) {
		// 60 bpm is the default tempo
		dur = dur.mul(60/item.tempo);
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

/*
 * @param voice - Array of items
 * @return time in seconds
 */
export function getVoiceDuration (voice) {
	const last = voice[voice.length-1];
	return calculateDuration(last).add(last.time).valueOf();
}

/*
 * tempo: Number
 * Returns a function that translates a beat number into seconds.
 */
function bpm (tempo) {
    return (beat) => {
		let time = new F(beat, tempo);
		return time.mul(60).valueOf();
	}
}

/*
 * Transforms both time and duration according to timing.
 */
function tempo (timing, notes) {
	return where("time", timing, notes.map((note) => {
		let clone = _.clone(note);
		clone.duration = timing(note.time + note.duration) - timing(note.time);
		return clone;
	}));
}
