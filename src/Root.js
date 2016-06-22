import React from "react";
import Player from "./boethius-player/Player";
import Layout from "./boethius-layout/Layout";
import Sheet from "./Sheet";
import CodeMirror from "react-codemirror";
import {parser} from "boethius-lang";
import {getSynth} from "./synths/synths";

const Root = React.createClass({
    getInitialState () {
        const ctx = new AudioContext();
        const out = ctx.createGain();
        out.connect(ctx.destination);

        return {
            code: "",
            ctx,
            out,
            layout: {
                timeSig: [4, 4],
                systems: [],
                lines: []
            }
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
                <Layout
                    layout={this.state.layout}
                    voices={["lh", "rh"]}
                    addSystem={() => console.log("add system")}
                    removeSystem={() => console.log("remove system")}
                    updateSystem={() => console.log("update system")}
                    addLine={() => console.log("add line")}
                    removeLine={() => console.log("remove line")}
                    updateLine={() => console.log("update line")}
                    updateTimeSig={() => console.log("update time sig")}
                    changeStaffSpacing={() => console.log("change staff spacing")}
                    changeTitle={() => console.log("change title")}
                    changeComposer={() => console.log("change composer")}
                     />
                <Player
                    ctx={this.state.ctx}
                    out={this.state.out}
                    getSynth={getSynth}
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

        return voices;
    } catch (e) {
        console.error(e);
    }
}

export default Root;
