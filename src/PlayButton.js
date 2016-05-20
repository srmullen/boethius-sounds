import React from "react";
import synth from "./synths/superSaw";

const PlayButton = React.createClass({
    render () {
        return (
            <button onClick={() => {
                const music = this.props.getMusic();
                // synth({freq: this.props.getMusic()});
                music.map((item, i) => {
                    synth({freq: item.frequency, at: i});
                });
            }}>Play!</button>
        );
    }
});

export default PlayButton;
