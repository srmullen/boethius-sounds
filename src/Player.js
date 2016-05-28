import React from "react";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import StopButton from "./StopButton";
import CodeMirror from "react-codemirror";
import {parser} from "boethius-lang";
import {calculateAndSetTimes} from "./time";

const Player = React.createClass({
    getInitialState () {
        const ctx = new AudioContext();
        const masterGain = ctx.createGain();
        masterGain.connect(ctx.destination);
        // ctx and masterGain should maybe be props
        return {
            code: "",
            ctx,
            masterGain
        }
    },

    updateCode (newCode) {
        this.setState({
            code: newCode
        });
    },

    render () {
        return (
            <div>
                <PlayButton
                    ctx={this.state.ctx}
                    out={this.state.masterGain}
                    getMusic={() => {
                        try {
                            const parsed = parser.parse(this.state.code);

                            const voices = parsed.reduce((acc, item) => {
                                if (acc[item.voice]) {
                                    acc[item.voice].push(item);
                                } else {
                                    acc[item.voice] = [item];
                                }

                                return acc;
                            }, {});

                            // const items = calculateAndSetTimes(parsed);
                            for (let voice in voices) {
                                voices[voice] = calculateAndSetTimes(voices[voice]);
                            }

                            console.log(voices);

                            return voices;
                        } catch (e) {
                            console.error(e);
                        }

                }} />
                <PauseButton ctx={this.state.ctx} />
                <StopButton /> 
                <CodeMirror
                    value={this.state.code}
                    options={{lineNumbers: true}}
                    onChange={this.updateCode} />
            </div>
        )
    }
});

export default Player;
