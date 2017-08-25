import React from "react"
import ReactDOM from "react-dom"
import DOM from "react-dom-factories"
import ReactPropTypes from "prop-types"

import myTextarea from "./components/my-textarea"
import hello from "./components/hello"
import excel from "./components/excel"

const myapp = DOM.div(
    {
        className: "react-myapp-root",
        style: {
            fontFamily: "verdana",
            textAlign: "center",
            color: "dimgrey",
        },
    },
    DOM.h1(null, "Grament Test."),
    React.createElement(myTextarea, {author: "kikimetal"}),
    React.createElement(hello),
    React.createElement(excel),
);

ReactDOM.render(
    myapp,
    document.getElementById("myapp"),
);
