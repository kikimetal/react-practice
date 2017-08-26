import React from "react";
import DOM from "react-dom-factories";
import ReactPropTypes from "prop-types";

class HelloJSX extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <h2>hello! {this.props.h1text}</h2>
        );
    }
}
HelloJSX.defaultProps = {
    h1text: "JSX component",
}

export default class Hello extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            age: props.age,
            job: props.job,
        };
    }
    render(){
        return (
            <div>
                <HelloJSX h1text={"初めてのJSX"} />
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
