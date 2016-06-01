import square from "./square";
import sine from "./sine";

const SYNTHS = {
    square,
    sine,
    defaultSynth: sine
};

export function getSynth (item) {
    return SYNTHS[item.part] || SYNTHS.defaultSynth;
}
