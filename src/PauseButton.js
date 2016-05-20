import React, {PropTypes} from "react";

const PauseButton = React.createClass({
    render () {
        return (
            <button onClick={() => {
                this.props.ctx.suspend();
            }}>Pause!</button>
        );
    }
});

PauseButton.propTypes = {
    ctx: PropTypes.instanceOf(AudioContext).isRequired
};

export default PauseButton;
