import React from "react";
import DOM from "react-dom-factories";
import ReactPropTypes from "prop-types";

export default class Hello extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            age: this.props.age,
            job: this.props.job,
        };
    }
    render(){
        return (
            <div>
                <h2>Hello jsx component</h2>
                <p><input defaultValue={"hello" + this.state.name} /></p>
                <p>age: <em>{this.state.age}</em></p>
                <p>job: <em>{this.state.job}</em></p>
            </div>
        );
    }
}
Hello.defaultProps = {
    name: "kiki",
    age: 23,
    job: "WAR",
};
