import React from "react";
import ReactDOM from "react-dom";
import superSaw from "./synths/superSaw";
import Player from "./Player";

ReactDOM.render(
    <Player />,
    document.getElementById("root")
)

window.superSaw = superSaw;
