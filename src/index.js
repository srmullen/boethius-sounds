import React from "react";
import ReactDOM from "react-dom";
import {parser} from "boethius-lang";
import superSaw from "./synths/superSaw";
import PlayButton from "./PlayButton";
import CodeMirror from "react-codemirror";

ReactDOM.render(
    <div>
        <PlayButton />
        <CodeMirror value={"hello"} options={{lineNumbers: true}} />
    </div>,
    document.getElementById("root")
)

window.parser = parser;
window.superSaw = superSaw;
