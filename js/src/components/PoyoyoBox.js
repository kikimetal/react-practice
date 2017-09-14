import React from "react"
import InsertEmoticon from "react-icons/lib/md/insert-emoticon"

import getRandomColor from "./functions/get-random-color"
import {Motion, spring, presets, StaggeredMotion, TransitionMotion} from 'react-motion'
import Button from "./Button"

export default class PoyoyoBox extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show: false,
        }
    }
    render(){
        const boxWidth = 300
        const beforeHeight = 0
        const afterHeight = 60
        const n = 5

        const PoyoyoBoxAttr = {
            className: "PoyoyoBox",
            style: {
                minHeight: afterHeight * n + 60,
            }
        }

        const ButtonAttr = {
            onClick: e => this.setState({show: !this.state.show}),
            style: {
                display: "block",
                maxWidth: "140px",
                margin: "10px auto",
                color: "hotpink",
            }
        }

        const boxColors = new Array(n).fill(null).map(() => {
            return getRandomColor("pastel")
        })

        return (
            <div {...PoyoyoBoxAttr}>
                <Button {...ButtonAttr}>
                    <InsertEmoticon className="hmm" style={{padding: "0 0.3em", verticalAlign: "-3px"}} />
                    Lets Poyoyo!
                </Button>
                {
                    this.state.show &&
                    <StaggeredMotion
                        defaultStyles={new Array(n).fill({h: 0})}
                        styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
                            return i === 0
                            ? {h: spring(afterHeight, {stiffness: 200, damping: 8, precision: 0.2})}
                            : {h: spring(prevInterpolatedStyles[i - 1].h)}
                        })}
                    >
                        {interpolatingStyles =>
                            <div>
                                {interpolatingStyles.map((style, i) =>
                                    <div key={i} className={`box box${i}`} style={{
                                            height: style.h,
                                            width: boxWidth + style.h,
                                            background: boxColors[i],
                                        }}>
                                        hello
                                    </div>
                                )}
                            </div>
                        }
                    </StaggeredMotion>
                }
            </div>
        )
    }
}

// <Motion defaultStyle={{x: 0}} style={{x: spring(100)}}>
//     {value => <div>{value.x}</div>}
// </Motion>
// <Motion defaultStyle={{opacity: 0, translateX: -100}} style={{opacity: spring(1), translateX: spring(100)}}>
//     {value => <div style={{opacity: value.opacity, transform: `translateX(${value.translateX}px)`}}>ああああああ</div>}
// </Motion>
// <Motion defaultStyle={{opacity: 0, translateX: -100}} style={{opacity: spring(1), translateX: spring(200, presets.gentle)}}>
//     {value => <div style={{opacity: value.opacity, transform: `translateX(${value.translateX}px)`}}>ああああああ</div>}
// </Motion>
// <Motion defaultStyle={{opacity: 0, translateX: -100}} style={{opacity: spring(1), translateX: spring(200, {stiffness: 120, damping: 6, precision: 0.1})}}>
//     {value => <div style={{opacity: value.opacity, transform: `translateX(${value.translateX}px)`}}>ああああああ</div>}
// </Motion>
