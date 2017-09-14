import React from "react"
import ReactDOM from "react-dom"
import DOM from "react-dom-factories"
import PropTypes from "prop-types"

import RouterTest from "./components/RouterTest"

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
                <h1>Router test</h1>
                <RouterTest />
            </div>
        )
    }
}

export default App

// ReactDOM.render(
//     <App />,
//     document.getElementById("App")
// )
