import React from "react"
import ReactDOM from "react-dom"
import Beer from 'react-icons/lib/fa/beer'
import Camera from 'react-icons/lib/md/camera'
// import * as FontAwesome from 'react-icons/lib/fa' // これでもいける！
// const FaBeer = FontAwesome.FaBeer
import {FaAsterisk} from 'react-icons/lib/fa'
import {MdApps} from 'react-icons/lib/md'


import Button from "./components/Button"
import Door from "./components/Door"

class Discovery extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show: true,
        }
    }
    render(){
        const switchDisplay = (e) => {
            this.setState({
                show: !this.state.show,
            })
        }
        const Discovery = (
            <div className="Discovery">
                <div>
                    <h1>Button</h1>
                    <Button />
                </div>
                <div>
                    <h1>Button</h1>
                    <Button />
                </div>
                <div>
                    <h1>Door</h1>
                    <Door />
                </div>
            </div>
        )
        return (
            <div>
                <button className="DiscoveryExchangeButton" onClick={switchDisplay}>
                    <Beer />
                    <Camera />
                    <FaAsterisk />
                    <MdApps className="spin" />
                    switchDisplay Discovery
                </button>
                {this.state.show ? Discovery : null}
            </div>
        )
    }
}

ReactDOM.render(
    <Discovery />,
    document.getElementById("Discovery")
)
