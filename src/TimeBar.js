import React, {PropTypes} from "react";

const TimeBar = React.createClass({
    getInitialState () {
        return {};
    },

    render () {
        return (
            <div>{this.props.time} - {this.props.duration}</div>
        );
    }
});

TimeBar.propTypes = {
    time: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    ctx: PropTypes.instanceOf(AudioContext).isRequired
};

export default TimeBar;
