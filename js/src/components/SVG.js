import React from "react"
import Triangle from "./Triangle"

export default class SVG extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const svgAttr = {
            width: 160,
            height: 150,
            style: {
                display: "block",
                background: "transparent",
                margin: "0 auto",
                padding: "20px",
            }
        }

        return (
            <svg {...svgAttr}>
                <Triangle color="hsl(200, 70%, 80%)" />
                <Triangle color="hsl(205, 70%, 75%)" delay="120" scale={0.85} />
                <Triangle color="hsl(210, 70%, 70%)" delay="600" scale={0.7} />
                <Triangle color="hsl(215, 70%, 65%)" delay="900" scale={0.55} />
                <Triangle color="hsl(220, 70%, 60%)" delay="1200" scale={0.4} />
            </svg>
        )
    }
}
