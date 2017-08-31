import React from "react"
import DOM from "react-dom-factories"
import ReactPropTypes from "prop-types"

import mergeStyle from "./functions/merge-style"

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
        // const style = {
        //     background: "thistle",
        //     textDecoration: "underline",
        //     color: "dimgrey",
        // };
        // mergeStyle(style, this.props.style);
        this.state = {
            name: this.props.name,
            age: this.props.age,
            job: this.props.job,
        };
    }
    componentDidMount(){
        console.log("<Hello /> didMount", this.props);

    }
    render(){
        const style = {
            background: "thistle",
            textDecoration: "underline",
            color: "dimgrey",
        };
        mergeStyle(style, this.props.style);
        // console.log(style);
        return (
            <div style={style}>
                <HelloJSX h1text={"JSX^-^"} />
                <p><input defaultValue={"hello " + this.state.name} /></p>
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
