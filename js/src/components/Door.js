import React from "react"

export default class Door extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            className: "Door",
            innerText: null,
        }
    }
    render(){
        const doorOpen = (e) => {
            e.preventDefault()
            this.setState({
                className: this.state.isOpen ? "Door" : "Door open",
                isOpen: !this.state.isOpen,
            })
            console.log(e.type)
        }
        const attr = {
            style: this.props.style,
            className: this.state.className,
            onClick: doorOpen,
        }
        return (
            <div {...attr}>
                <div className="inner">{this.state.innerText || "hello^o^"}</div>
                <div className="left">Left</div>
                <div className="right">Right</div>
            </div>
        )
    }
}
