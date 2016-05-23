
function synth (ctx, out, {frequency = 440, value = 4, gain = 0.5, time = 0} = {}) {
    const now = ctx.currentTime;
    const startTime = now + time;
    const endTime = startTime + 1/value;
    const gainNode = ctx.createGain();
    const osc = ctx.createOscillator();

    gainNode.gain.setValueAtTime(gain, now);
    osc.type = "square";
    osc.frequency.value = frequency;
    osc.connect(gainNode);
    gainNode.connect(out);
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
