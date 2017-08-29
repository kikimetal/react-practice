import React from "react"
import ReactDOM from "react-dom"
import DOM from "react-dom-factories"
import ReactPropTypes from "prop-types"

import MyTextarea from "./components/my-textarea"
import Hello from "./components/hello"
import Excel from "./components/excel"

class MyApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style: {
                background: "#fee",
                fontFamily: "verdana",
                textAlign: "center",
                color: "steelblue",
                padding: "0.8rem",
                lineHeight: "1.6",
            },
            helloDisplayNum: 1,
        };
        this.backgroundColorChange = this.backgroundColorChange.bind(this);
        this.exchangeDisplayHello = this.exchangeDisplayHello.bind(this);
    }
    backgroundColorChange(){
        this.setState((prevState, currentProps) => {
            const newColor = prevState.style.background === "#fee" ? "#eef" : "#fee";
            const diff = {background: newColor};
            const newStyle = Object.assign(prevState.style, diff);
            return {
                style: newStyle,
            };
        });
    }
    exchangeDisplayHello(){
        this.setState((prevState, currentProps) => {
            const newNum = prevState.helloDisplayNum === 1 ? 2 : 1;
            console.log(newNum);
            return {
                helloDisplayNum: newNum
            };
        });
    }
    render(){
        console.log(this.state.helloDisplayNum);
        let hello;
        let age = this.state.helloDisplayNum * 22;
        if(this.state.helloDisplayNum === 1){
            hello = <Hello style={{margin: "1em", background: "white"}} age={age} />
        }else{
            hello = <Hello style={{margin: "1em"}} age={age} />
        }
        console.log(hello);
        return (
            <div style={this.state.style}>
                <h1>GARMENT test</h1>
                <MyTextarea />
                {hello}
                <Excel />
                <div style={{padding: "1em"}}>
                    <p><button onClick={this.exchangeDisplayHello}>exchangeDisplay Hello</button></p>
                    <p><button onClick={this.backgroundColorChange}>change background!</button></p>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <MyApp />,
    document.getElementById("myapp")
);
