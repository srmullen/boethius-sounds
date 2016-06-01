import React, {PropTypes} from "react";
import _ from "lodash";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import PlayPauseButton from "./PlayPauseButton";
import StopButton from "./StopButton";
import TimeBar from "./TimeBar";
import {calculateDuration, getVoiceDuration, startTimer} from "./time";
import {getSynth} from "./synths/synths";

const Player = React.createClass({
    getInitialState () {
        return {
            time: 0,
            playing: false
        }
    },

    render () {
        // get the time the longest voice ends
        const musicDuration = _.max(_.map(this.props.music, (voice) => {
            return getVoiceDuration(voice);
        }));

        return (
            <div>
                <PlayPauseButton
                    playing={this.state.playing}
                    onPlay={() => {
                        const startTime = this.props.ctx.currentTime;
                        const endTime = startTime + musicDuration;
                        this.switchPlayingState();
                        if (this.props.ctx.state === "suspended") {
                            this.props.ctx.resume();
                        } else {
                            const voices = this.props.music;
                            for (let voice in voices) {
                                voices[voice].map(item => {
                                    this.scheduledEvents = this.scheduledEvents.concat(this.scheduleEvent(item));
                                });
                            }

                            // start timer and assign it to components stopTimer function
                            this.stopTimer = startTimer((next) => {
                                if (this.props.ctx.currentTime >= endTime) {
                                    this.setState({
                                        playing: false,
                                        time: musicDuration
                                    });
                                } else {
                                    this.setState({
                                        time: (this.props.ctx.currentTime - startTime)
                                    });
                                    next();
                                }
                            }, 10);
                        }

                    }}
                    onPause={() => {
                        this.switchPlayingState();
                        this.props.ctx.suspend();
                    }} />
                <StopButton
                    onClick={() => {
                        if (this.stopTimer) this.stopTimer();

                        this.scheduledEvents.map((event) => {
                            if (event && event.stop) {
                                event.stop();
                            }
                        });

                        this.setState({
                            playing: false,
                            time: 0
                        });

                        this.scheduledEvents = [];

                        // if the player is paused restart the audio context
                        if (this.props.ctx.state === "suspended") {
                            this.props.ctx.resume();
                        }
                    }} />
                <TimeBar
                    ctx={this.props.ctx}
                    time={this.state.time}
                    duration={musicDuration || 0} />
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

    // function to stop the running timer
    stopTimer: undefined,

    scheduleEvent (item) {
        const duration = calculateDuration(item).valueOf();
        const synth = getSynth(item);
        if (item.type === "note") {
            return synth(this.props.ctx, this.props.out, {duration, ...item});
        } else if (item.type === "chord") {
            const time = item.time;
            const value = item.value;
            return item.children.map(child => {
                return synth(this.props.ctx, this.props.out, {time, value, duration, ...child});
            });
        }
    }
});

Player.propTypes = {
    ctx: PropTypes.instanceOf(AudioContext).isRequired,
    out: PropTypes.instanceOf(GainNode).isRequired,
    music: PropTypes.object
}

export default Player;
