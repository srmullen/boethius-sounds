import React, {PropTypes} from "react";
import Play from "./icons/Play";
import Pause from "./icons/Pause";

const PlayPauseButton = React.createClass({
    render () {
        return (
            <button onClick={() => {
                if (this.props.playing) {
                    this.props.onPause();
                } else {
                    this.props.onPlay();
                }
            }}>
                {this.props.playing ? <Pause /> : <Play />}
            </button>
        );
    }
});

PlayPauseButton.propTypes = {
    playing: PropTypes.bool.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired
};

export default PlayPauseButton;
