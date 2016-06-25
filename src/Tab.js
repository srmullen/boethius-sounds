import React, {PropTypes} from "react";

const Tab = (props) => {
    const unselected = {
        display: "inline-block",
        color: "black",
        textAlign: "center",
        padding: "14px 16px",
        textDecoration: "none",
        transition: "0.3s",
        fontSize: "17px"
    };

    const selected = {
        display: "inline-block",
        color: "red",
        textAlign: "center",
        padding: "14px 16px",
        textDecoration: "none",
        transition: "0.3s",
        fontSize: "17px"
    };

    return (
        <span
            style={props.selected ? selected : unselected}
            onClick={props.onTabChange}>
            {props.title}
        </span>
    );
};

Tab.propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onTabChange: PropTypes.func.isRequired
}

export default Tab;
