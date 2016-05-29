import React, {PropTypes} from "react";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import PlayPauseButton from "./PlayPauseButton";
import StopButton from "./StopButton";
import TimeBar from "./TimeBar";
import {calculateDuration} from "./time";
import synth from "./synths/superSaw";

const Player = React.createClass({
    getInitialState () {
        return {
            time: 0,
            playing: false
        }
    },

    render () {
        return (
            <div>
                <PlayPauseButton
                    playing={this.state.playing}
                    onPlay={() => {
                        this.switchPlayingState();
                        if (this.ctx.state === "suspended") {
                            this.ctx.resume();
                        } else {
                            const voices = this.props.music;
                            for (let voice in voices) {
                                voices[voice].map(item => {
                                    this.scheduledEvents = this.scheduledEvents.concat(this.scheduleEvent(item));
                                });
                            }
                        }
                    }}
                    onPause={() => {
                        this.switchPlayingState();
                        this.ctx.suspend();
                    }}
                />
                <StopButton />
                <TimeBar time={this.state.time} duration={2} />
            </div>
        )
    },

    switchPlayingState () {
        this.setState({
            playing: !this.state.playing
        });
    },

    // List of events to be played
    scheduledEvents: [],

    scheduleEvent (item) {
        const duration = calculateDuration(item).valueOf();
        if (item.type === "note") {
            return synth(this.ctx, this.out, {duration, ...item});
        } else if (item.type === "chord") {
            const time = item.time;
            const value = item.value;
            return item.children.map(child => {
                return synth(this.ctx, this.out, {time, value, duration, ...child});
            });
        }
    },

    componentDidMount () {
        this.ctx = new AudioContext();
        this.out = this.ctx.createGain();
        this.out.connect(this.ctx.destination);
    }
});

Player.propTypes = {
    music: PropTypes.object
}

export default Player;
