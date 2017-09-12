import React from "react"
import PropTypes from "prop-types"

export default class Button extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            innerText: this.props.defaultText,
        }
    }
    render(){
        const attr = {
            className: "Button",
            style: this.props.style || null,
            onClick: this.props.onClick || null,
        }
        const innerValue = this.props.children || this.state.innerText;
        return (
            <div {...attr}>{innerValue}</div>
        )
    }
}
Button.defaultProps = {
    defaultText: "button",
}
Button.propTypes = {
    defaultText: PropTypes.string.isRequired,
}
