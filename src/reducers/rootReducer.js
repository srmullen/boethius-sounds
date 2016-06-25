import * as types from "../constants/actions";
import {combineReducers} from "redux";

function tab (state = 0, action) {
    switch (action.type) {
        case types.CHANGE_TAB: {
            console.log("changing tab");
            return action.tab;
        }
        default:
            return state;
    }
}

export const reducer = combineReducers({tab});
