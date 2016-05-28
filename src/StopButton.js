import React, {PropTypes} from "react";

const StopButton = React.createClass({
    render () {
        return (
            <button>
                <svg className="icon icon-stop2" viewBox="0 0 32 32">
                    <title>stop2</title>
                    <path class="path1" d="M4 4h24v24h-24z"></path>
                </svg>
            </button>
        );
    }
});

StopButton.propTypes = {

};

export default StopButton;
