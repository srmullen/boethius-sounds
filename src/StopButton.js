import React, {PropTypes} from "react";
import Stop from "./icons/Stop";

const StopButton = React.createClass({
    render () {
        return (
            <button onClick={this.props.onClick}>
                <Stop />
            </button>
        );
    }
});

StopButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default StopButton;
