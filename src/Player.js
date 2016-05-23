import React from "react";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
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
                            const items = calculateAndSetTimes(parser.parse(this.state.code));
                            console.log(items);
                            return items;
                        } catch (e) {
                            console.error(e);
                        }

                }} />
                <PauseButton ctx={this.state.ctx} />
                <CodeMirror
                    value={this.state.code}
                    options={{lineNumbers: true}}
                    onChange={this.updateCode} />
            </div>
        )
    }
});

export default Player;
