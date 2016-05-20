import React from "react";
import PlayButton from "./PlayButton";
import CodeMirror from "react-codemirror";
import {parser} from "boethius-lang";
import * as musicBox from "./musicBox";

window.musicBox = musicBox;

const Player = React.createClass({
    getInitialState () {
        return {
            code: ""
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
                <PlayButton getMusic={() => {
                    try {
                        return parser.parse(this.state.code).map(item => {
                            return {...item, ...musicBox.noteInfo(item.pitch)};
                        });
                    } catch (e) {
                        console.error(e);
                    }

                }} />
                <CodeMirror
                    value={this.state.code}
                    options={{lineNumbers: true}}
                    onChange={this.updateCode} />
            </div>
        )
    }
});

export default Player;
