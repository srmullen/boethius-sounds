import React from "react";
import ReactDOM from "react-dom";
import {parser} from "boethius-lang";
import superSaw from "./synths/superSaw";
import Player from "./Player";

ReactDOM.render(
    <Player />,
    document.getElementById("root")
)

window.parser = parser;
window.superSaw = superSaw;
