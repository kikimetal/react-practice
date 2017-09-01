import React from "react"
import ReactDOM from "react-dom"
import DOM from "react-dom-factories"
import ReactPropTypes from "prop-types"

import MyTextarea from "./components/MyTextarea"
import Hello from "./components/Hello"
import Excel from "./components/Excel"
import Button from "./components/Button"
import Garment from "./components/Garment"
import Door from "./components/Door"

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
        let age = this.state.helloDisplayNum * 22;
        let hello;
        if(this.state.helloDisplayNum === 1){
            hello = (
                <div>
                    <Hello style={{margin: "1em", background: "white"}} age={age} />
                    <Hello style={{margin: "1em"}} age={age * 1.2} />
                </div>
            )
        }else{
            hello = <Hello style={{margin: "1em", background: "white"}} age={age} />
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
                <h1>React Practice</h1>
                <h1>MyTextarea Component</h1>
                <MyTextarea />
                <h1>Hello Component</h1>
                {hello}
                <h1>Excel Component</h1>
                <Excel />

                <h1>style change test</h1>
                <div style={{padding: "1em"}}>
                    <div
                        style={btnStyle}
                        onClick={this.exchangeDisplayHello}>
                        exchangeDisplay Hello
                    </div>
                    <div
                        style={btnStyle}
                        onClick={this.backgroundColorChange}>
                        change background (NG)
                    </div>
                </div>

                <h1>Button Component</h1>
                <Button>hello my button</Button>
                <Button />
                <Button />
                <Button>
                    <h3>
                        h3 btn<Button>
                            btn
                            <Button>btn</Button>
                            <Button>btn</Button>
                        </Button>
                    </h3>
                </Button>

                <h1>Door Component</h1>
                <h2>click me! vvv</h2>
                <Door style={{height: "200px"}} />
                <Door style={{height: "200px"}} />
                <Door style={{height: "200px"}} />
                <Door style={{height: "200px"}} />
                <Door />
                <Door />
                <Door />
                <Door />
                <Door />
            </div>
        );
    }
}

ReactDOM.render(
    <MyApp />,
    document.getElementById("app")
);
