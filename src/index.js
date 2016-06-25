import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import WebFont from "webfontloader";
import Root from "./Root";
import {reducer} from "./reducers/rootReducer";

function start (cb) {
    WebFont.load({
        custom: {
            families: ["gonville", "gonvillealpha"]
        },
        active: cb
    });
}

const store = createStore(reducer);

start(() => {
    ReactDOM.render(
        <Provider store={store}>
            <Root />
        </Provider>,
        document.getElementById("root")
    );
});
