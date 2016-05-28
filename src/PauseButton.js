import React, {PropTypes} from "react";
import Pause from "./icons/Pause";

const PauseButton = React.createClass({
    render () {
        return (
            <button onClick={this.props.onClick}>
                <Pause />
            </button>
        );
    }
});

PauseButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default PauseButton;
