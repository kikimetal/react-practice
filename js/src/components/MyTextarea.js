import React from "react"
import DOM from "react-dom-factories"
import ReactPropTypes from "prop-types"

export default class myTextarea extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: this.props.defaultValue,
            author: this.props.author,
        };
        this._textChange = this._textChange.bind(this);
    }
    _textChange(e){
        this.setState({
            text: e.target.value,
        });
    }
    render(){
        return DOM.div(
            {
                id: "my-textarea",
                style: {
                    border: "1px solid grey",
                    textAlign: "center",
                }
            },
            DOM.h2(null, "my textarea"),
            DOM.textarea(
                {
                    value: this.state.text,
                    onChange: this._textChange,
                }
            ),
            DOM.h3(null, this.state.text.length),
            DOM.p(null, "by " + this.state.author)
        );
    }
}
myTextarea.propTypes = {
    defaultValue: ReactPropTypes.string.isRequired,
    author: ReactPropTypes.string.isRequired,
};
myTextarea.defaultProps = {
    defaultValue: "hellooo",
    author: "",
};
