import React from "react";
import ReactDOM from "react-dom";
import superSaw from "./synths/superSaw";
import Root from "./Root";
ReactDOM.render(
    <Root />,
    document.getElementById("root")
)

window.superSaw = superSaw;
