import React, {PropTypes} from "react";
import Pause from "./icons/Pause";

const PauseButton = React.createClass({
    render () {
        return (
            <button onClick={() => {
                this.props.ctx.suspend();
            }}>
                <Pause />
            </button>
        );
    }
});

PauseButton.propTypes = {
    ctx: PropTypes.instanceOf(AudioContext).isRequired
};

export default PauseButton;
