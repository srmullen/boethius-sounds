import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
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
