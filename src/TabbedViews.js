import React, {PropTypes} from "react";
import Tab from "./Tab";

/*
 * Container for views that can be tabbed through.
 */
const TabbedViews = React.createClass({
    render () {
        const tabs = this.props.children.map((child, i) => {
            return (
                <li style={{float: "left"}} key={"" + child.props.title + i}>
                    <Tab
                        title={child.props.title}
                        selected={i === this.props.viewIndex}
                        onTabChange={this.props.onTabChange.bind(null, i)} />
                </li>
            );
        });

        const style = {
            listStyleType: "none",
            margin: 0,
            padding: 0,
            overflow: "hidden",
            border: "1px solid #ccc",
            backgroundColor: "#f1f1f1"
        };

        return (
            <div>
                <ul style={style}>
                    {tabs}
                </ul>
                <div>{this.props.children[this.props.viewIndex]}</div>
            </div>
        );
    }
});

TabbedViews.propTypes = {
    viewIndex: PropTypes.number.isRequired,
    // onTabChange is passed the index of the view/tab.
    onTabChange: PropTypes.func.isRequired
};

export default TabbedViews;
