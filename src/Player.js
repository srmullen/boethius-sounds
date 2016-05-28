import React, {PropTypes} from "react";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import StopButton from "./StopButton";
import TimeBar from "./TimeBar";

const Player = React.createClass({
    getInitialState () {
        const ctx = new AudioContext();
        const masterGain = ctx.createGain();
        masterGain.connect(ctx.destination);
        // ctx and masterGain should maybe be props
        return {
            ctx,
            masterGain
        }
    },

    render () {
        return (
            <div>
                <PlayButton
                    ctx={this.state.ctx}
                    out={this.state.masterGain}
                    music={this.props.music} />
                <PauseButton ctx={this.state.ctx} />
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
