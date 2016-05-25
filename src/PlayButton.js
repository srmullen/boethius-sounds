import React, {PropTypes} from "react";
import synth from "./synths/superSaw";

const PlayButton = React.createClass({
    render () {
        return (
            <button onClick={() => {
                if (this.props.ctx.state === "suspended") {
                    this.props.ctx.resume();
                } else {
                    const music = this.props.getMusic();
                    music.map((item, i) => {
                        if (item.type !== "rest") synth(this.props.ctx, this.props.out, item);
                    });
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
