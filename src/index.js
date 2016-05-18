import React from "react";
import ReactDOM from "react-dom";
import {parser} from "boethius-lang";
import superSaw from "./synths/superSaw";
import PlayButton from "./PlayButton";

ReactDOM.render(
    <PlayButton />,
    document.getElementById("root")
)

window.parser = parser;
window.superSaw = superSaw;
