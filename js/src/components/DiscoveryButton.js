import React, {Component} from "react"

export default class DiscoveryButton extends Component{
    constructor(props){
        super(props)
        this.state = {
            discovery: false,
        }
    }
    render(){
        const exchangeDisplay = () => {
            this.setState({
                discovery: !this.state.discovery,
            })
        }
        const attr = {
            className: "DiscoveryExchangeButton",
            onClick: exchangeDisplay,
        }
        return <button {...attr}>exchangeDisplay Discovery</button>
    }
}
