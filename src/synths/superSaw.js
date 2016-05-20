const ctx = new AudioContext();
const masterGain = ctx.createGain();

masterGain.connect(ctx.destination);

function synth ({freq = 440, dur = 1, gain = 0.5, at = 0} = {}) {
    const now = ctx.currentTime;
    const startTime = now + at;
    const endTime = startTime + dur;
    const gainNode = ctx.createGain();
    const osc = ctx.createOscillator();

    gainNode.gain.setValueAtTime(gain, now);
    osc.type = "square";
    osc.frequency.value = freq;
    osc.connect(gainNode);
    gainNode.connect(masterGain);
    osc.start(startTime);
    // smooth attack
    gainNode.gain.linearRampToValueAtTime(gain, now + 0.05);
    // create AudioParam event at time next linear ramp begins.
    gainNode.gain.setValueAtTime(gain, endTime - 0.05);
    // smooth release
    gainNode.gain.linearRampToValueAtTime(0, endTime);
    osc.stop(endTime);

    return osc;
};

export default synth;
