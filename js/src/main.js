import React from "react"
import ReactDOM from "react-dom"
import DOM from "react-dom-factories"
import ReactPropTypes from "prop-types"

import MyTextarea from "./components/my-textarea"
import Hello from "./components/hello"
import Excel from "./components/excel"

// const myapp = DOM.div(
//     {
//         className: "react-myapp-root",
//         style: {
//             fontFamily: "verdana",
//             textAlign: "center",
//             color: "dimgrey",
//         },
//     },
//     DOM.h1(null, "Grament Test."),
//     React.createElement(myTextarea, {author: "kikimetal"}),
//     React.createElement(hello),
//     React.createElement(excel),
// );

const style = {
    myapp: {
        fontFamily: "verdana",
        textAlign: "center",
        color: "dimgrey",
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
