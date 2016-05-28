import React, {PropTypes} from "react";
import Stop from "./icons/Stop";

const StopButton = React.createClass({
    render () {
        return (
            <button>
                <Stop />
            </button>
        );
    }
});

StopButton.propTypes = {

};

export default StopButton;
