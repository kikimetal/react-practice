import React from "react"
import ReactDOM from "react-dom"

// react-icons
import Beer from 'react-icons/lib/fa/beer'
import Camera from 'react-icons/lib/md/camera'
import Asterisk from 'react-icons/lib/fa/asterisk'
import Apps from 'react-icons/lib/md/apps'

import Button from "./Button"
import Door from "./Door"
import PoyoyoBox from "./PoyoyoBox"
import SVG from "./SVG"

export default class Discover extends React.Component{
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
        const Discover = (
            <div className="Discover">
                <h1>Discover Components</h1>

                <section>
                    <h1>SVG</h1>
                    <SVG />
                </section>

                <section>
                    <h1>PoyoyoBox</h1>
                    <PoyoyoBox />
                </section>

                <section>
                    <h1>Button</h1>
                    <Button />
                </section>

                <section>
                    <h1>Door</h1>
                    <Door style={{height: "200px"}} />
                </section>
            </div>
        )
        const buttonStyle = {
            display: "block",
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 999999999,
        }
        const spin = this.state.show ? "spin" : null
        return (
            <div>
                <Button style={buttonStyle} onClick={switchDisplay}>
                    <Beer className={spin} />
                    <Camera className={spin} />
                    <Asterisk className={spin} />
                    <Apps className={spin} />
                    switchDisplay Discover
                </Button>
                {this.state.show ? Discover : null}
            </div>
        )
    }
}
