import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";
import Root from "./Root";

function start (cb) {
    WebFont.load({
        custom: {
            families: ["gonville", "gonvillealpha"]
        },
        active: cb
    });
}

start(() => {
    ReactDOM.render(
        <Root />,
        document.getElementById("root")
    );
});
