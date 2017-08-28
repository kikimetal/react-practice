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

const mergeStyles = (defaultStyle, overrideStyle) => overrideStyle ? Object.assign(defaultStyle, overrideStyle) : defaultStyle;

export default class Hello extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            age: this.props.age,
            job: this.props.job,
        };

    }
    componentDidMount(){
        console.log(this.props);
    }
    render(){
        const style = {
            background: "thistle",
            textDecoration: "underline",
            color: "dimgrey",
        };
        mergeStyles(style, this.props.style);
        // console.log(style);
        return (
            <div style={style}>
                <HelloJSX h1text={"JSX^-^"} />
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
