import React from "react";
import synth from "./synths/superSaw";

const PlayButton = React.createClass({
    render () {
        return (
            <button onClick={() => {
                synth();
            }}>Play!</button>
        );
    }
});

export default PlayButton;
