import square from "./square";
import sine from "./sine";
import saw from "./saw";

const SYNTHS = {
    square,
    sine,
    saw,
    defaultSynth: sine
};

export function getSynth (item) {
    return SYNTHS[item.part] || SYNTHS.defaultSynth;
}
