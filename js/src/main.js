import React from "react"
import ReactDOM from "react-dom"
import DOM from "react-dom-factories"
import ReactPropTypes from "prop-types"

import MyTextarea from "./components/my-textarea"
import Hello from "./components/hello"
import Excel from "./components/excel"


const style = {
    myapp: {
        fontFamily: "verdana",
        textAlign: "center",
        color: "steelblue",
    },
}

class MyApp extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style={style.myapp}>
                <h1>GARMENT test</h1>
                <MyTextarea />
                <Hello />
                <Excel />
            </div>
        );
    }
}

ReactDOM.render(
    <MyApp />,
    document.getElementById("myapp"),
);
