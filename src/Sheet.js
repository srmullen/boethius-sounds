import React, {PropTypes} from "react";
import Scored from "./boethius/src/Scored";

const Sheet = React.createClass({
    render () {
        return (
            <div className="sheet" style={{overflowY: "scroll", border: "1px solid black"}}>
                <canvas key="scoredCanvas" ref="scoredCanvas" height="1000" style={{width: "100%"}}></canvas>
            </div>
        );
    },

    componentDidMount () {
        console.log("mounted");
    }
});

export default Sheet;
