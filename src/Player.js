import React from "react";
import PlayButton from "./PlayButton";
import CodeMirror from "react-codemirror";

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
                <PlayButton getFreq={() => {
                    return this.state.code
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
