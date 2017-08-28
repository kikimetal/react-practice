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
    }
    render(){
        let style = {
            background: "pink",
            fontFamily: "verdana",
            textAlign: "center",
            color: "steelblue",
            padding: "0.8rem",
            lineHeight: "1.6",
        };
        return (
            <div style={style}>
                <h1>GARMENT test</h1>
                <MyTextarea />
                <Hello style={{background: "white"}} />
                <Hello style={{margin: "1em"}} />
                <Excel />
            </div>
        );
    }
}

ReactDOM.render(
    <MyApp />,
    document.getElementById("myapp"),
);
