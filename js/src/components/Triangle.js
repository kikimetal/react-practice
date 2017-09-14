import React from "react"

export default class Triangle extends React.Component{
    render(){
        const scale = this.props.scale || 1

        let pathData = [
            'M', 0, 120,
            'L', 60, 0,
            'L', 120, 120,
            'Z',
        ].map((value) => {
            return (typeof value === "number" ? (value * scale) + 20 : value)
        }).join(" ")

        const attr = {
            className: "Triangle",
            d: pathData,
            fill: this.props.color,
            style: {
                animationDelay: this.props.delay + "ms",
            },
        }

        return (
            <path {...attr}></path>
        )
    }
}
Triangle.defaultProps = {
    color: "grey",
    delay: 0
}
