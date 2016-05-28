import React, {PropTypes} from "react";
import synth from "./synths/superSaw";
import {calculateDuration} from "./time";

const PlayButton = React.createClass({
    render () {
        return (
            <button onClick={() => {
                if (this.props.ctx.state === "suspended") {
                    this.props.ctx.resume();
                } else {
                    const voices = this.props.getMusic();
                    for (let voice in voices) {
                        voices[voice].map((item, i) => {
                            const duration = calculateDuration(item).valueOf();
                            if (item.type === "note") {
                                synth(this.props.ctx, this.props.out, {duration, ...item});
                            } else if (item.type === "chord") {
                                const time = item.time;
                                const value = item.value;
                                item.children.map(child => {
                                    synth(this.props.ctx, this.props.out, {time, value, duration, ...child});
                                });
                            } else {
                                // do nothing
                            }
                        });
                    }
                }
            }}>Play!</button>
        );
    }
});

PlayButton.propTypes = {
    ctx: PropTypes.instanceOf(AudioContext).isRequired,
    out: PropTypes.instanceOf(GainNode).isRequired
};

export default PlayButton;
