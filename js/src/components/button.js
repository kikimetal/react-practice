import React, { Component } from "react"
// import React from "react"
import ReactDOM from "react-dom"
import DOM from "react-dom-factories"
import ReactPropTypes from "prop-types"

// export default class Button extends React.Component{
export default class Button extends Component{
    constructor(props){
        super(props);
        this.state = {
            innerText: this.props.defaultText,
            style: null,
            defaultStyle: {
                display: "inline-block",
                fontSize: "20px",
                background: "#ccf",
                borderRadius: "0.2em",
                padding: "0.6em",
                margin: "auto",
                maxWidth: "90%",
                cursor: "pointer",
                transition: "0.3s",
            },
            hoverStyle: {
                background: "skyblue",
                color: "white",
            },
            type: true,
        };
        this.updateStyle = this.updateStyle.bind(this);
    }
    componentWillMount(){
        this.updateStyle();
    }
    updateStyle(e){
        e && e.preventDefault();
        console.log(e && e.target);
        const type = !this.state.type;
        this.setState({
            style: type ? this.state.defaultStyle : Object.assign({}, this.state.defaultStyle, this.state.hoverStyle),
            type: type,
        });
    }
    render(){
        const attr = {
            style: this.state.style,
            onMouseOver: this.updateStyle,
            onClick: this.updateStyle,
        }
        const value = this.state.innerText;
        return (
            <div {...attr}>{value}</div>
        )
    }
}
Button.defaultProps = {
    defaultText: "my button",
}
Button.propTypes = {
    defaultText: ReactPropTypes.string.isRequired,
}
