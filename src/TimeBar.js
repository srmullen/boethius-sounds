import React, {PropTypes} from "react";

const TimeBar = React.createClass({
    getInitialState () {
        return {};
    },

    render () {
        return (
            <div style={{width: "50%"}}>
                <span style={{float: "left"}}>{secondsToMinutes(this.props.time)}</span>
                <div style={{position: "relative", left: "2em", border: "1px solid black", width: "90%", height: "20px", margin: "2px"}}>
                    <div
                        style={{width: timeToPercent(this.props.time, this.props.duration), height: "100%", borderRight: "solid blue 2px"}}>
                    </div>
                    <div style={{position: "absolute", top: "0px", right: "-2em"}}>{secondsToMinutes(this.props.duration)}</div>
                </div>
            </div>
        );
    }
});

/*
 * Returns the music time as a percentage of the total duration
 */
function timeToPercent (time, duration) {
    const percent = (time / duration) * 100;
    return "" + percent + "%";
};

/*
 * @param seconds - time in seconds
 * @return {string} - time in minutes
 */
function secondsToMinutes (seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds) % 60;
    return `${mins}:${padSeconds(secs)}`;
}

/*
 * @param - seconds as integer
 * @return string - seconds with zero padding
 */
function padSeconds (seconds) {
    // convert seconds to string.
    const str = "" + seconds;
    if (str.length === 1) {
        return "0" + str;
    } else {
        return str;
    }
}

TimeBar.propTypes = {
    time: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    ctx: PropTypes.instanceOf(AudioContext).isRequired
};

export default TimeBar;
