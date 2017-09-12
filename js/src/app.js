import React from "react"
import ReactDOM from "react-dom"
import DOM from "react-dom-factories"
import PropTypes from "prop-types"

import Button from "./components/Button"
import Door from "./components/Door"
import Form from "./components/Form"

class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const attr = {
            className: "App",
        }
        return (
            <div {...attr}>
                <h1>hello my App</h1>
                <Door />
                <Button />
                <Door />
                <Button />
                <Door />
                <Button />
                <Door />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("App")
)
