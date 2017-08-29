import React from "react";
import ReactDOM from "react-dom";
import DOM from "react-dom-factories";
import ReactPropTypes from "prop-types";

// import injectTapEvent from "react-tap-event-plugin";
// injectTapEvent();

import MyTextarea from "./components/my-textarea";
import Hello from "./components/hello";
import Excel from "./components/excel";

class MyApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style: {
                background: "#fee",
                fontFamily: "verdana",
                textAlign: "center",
                color: "dimgrey",
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

        const btnStyle = {
            background: "#ccf",
            borderRadius: "0.2em",
            padding: "0.6em",
            margin: "0.2em auto",
            width: "20em",
            maxWidth: "90%",
            cursor: "pointer",
        };

        return (
            <div style={this.state.style}>
                <h1>GARMENT test</h1>
                <MyTextarea />
                {hello}
                <Excel />
                <div style={{padding: "1em"}}>
                    <div
                        style={btnStyle}
                        onClick={this.exchangeDisplayHello}>
                        exchangeDisplay Hello
                    </div>
                    <div
                        style={btnStyle}
                        onClick={this.backgroundColorChange}>
                        change background!
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <MyApp />,
    document.getElementById("myapp")
);
