import React, {PropTypes} from "react";

const PauseButton = React.createClass({
    render () {
        return (
            <button onClick={() => {
                this.props.ctx.suspend();
            }}>
                <svg className="icon icon-pause2" viewBox="0 0 32 32">
                    <title>pause2</title>
                    <path class="path1" d="M4 4h10v24h-10zM18 4h10v24h-10z"></path>
                </svg>
            </button>
        );
    }
});

PauseButton.propTypes = {
    ctx: PropTypes.instanceOf(AudioContext).isRequired
};

export default PauseButton;
