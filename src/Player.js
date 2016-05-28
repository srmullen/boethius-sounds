import React, {PropTypes} from "react";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import StopButton from "./StopButton";
import TimeBar from "./TimeBar";
import {calculateDuration} from "./time";
import synth from "./synths/superSaw";

const Player = React.createClass({
    getInitialState () {
        const ctx = new AudioContext();
        const masterGain = ctx.createGain();
        masterGain.connect(ctx.destination);
        // ctx and masterGain should maybe be props
        return {
            ctx,
            out: masterGain
        }
    },

    render () {
        return (
            <div>
                <PlayButton
                    onClick={() => {
                        if (this.state.ctx.state === "suspended") {
                            this.state.ctx.resume();
                        } else {
                            const voices = this.props.music;
                            for (let voice in voices) {
                                voices[voice].map((item, i) => {
                                    const duration = calculateDuration(item).valueOf();
                                    if (item.type === "note") {
                                        synth(this.state.ctx, this.state.out, {duration, ...item});
                                    } else if (item.type === "chord") {
                                        const time = item.time;
                                        const value = item.value;
                                        item.children.map(child => {
                                            synth(this.state.ctx, this.state.out, {time, value, duration, ...child});
                                        });
                                    } else {
                                        // do nothing
                                    }
                                });
                            }
                        }
                    }} />
                <PauseButton onClick={() => {
                    this.state.ctx.suspend();
                }} />
                <StopButton />
                <TimeBar />
            </div>
        )
    }
});

Player.propTypes = {
    music: PropTypes.object
}

export default Player;
