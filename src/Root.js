import React from "react";
import Player from "./Player";
import Sheet from "./Sheet";
import CodeMirror from "react-codemirror";
import {parser} from "boethius-lang";
import {calculateAndSetTimes} from "./time";

const Root = React.createClass({
    getInitialState () {
        const ctx = new AudioContext();
        const out = ctx.createGain();
        out.connect(ctx.destination);

        return {
            code: "",
            ctx,
            out
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
                <Player
                    ctx={this.state.ctx}
                    out={this.state.out}
                    music={codeToMusic(this.state.code)} />
                <div>
                    <div style={{float: "left", width: "50%"}}>
                        <CodeMirror
                            value={this.state.code}
                            options={{lineNumbers: true, theme: "paraiso-light"}}
                            onChange={this.updateCode} />
                    </div>
                    <div style={{float: "right", width: "50%"}}>
                        <Sheet />
                    </div>
                </div>
            </div>
        );
    }
});

function codeToMusic (code) {
    try {
        const parsed = parser.parse(code);

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
}

export default Root;
