import React, {PropTypes} from "react";
import Play from "./icons/Play";

const PlayButton = React.createClass({
    render () {
        return (
            <button onClick={this.props.onClick}>
                <Play />
            </button>
        );
    }
});

PlayButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default PlayButton;
