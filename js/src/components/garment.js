import React, {Component} from "react"
import ReactPropTypes from "prop-types"
import DOM from "react-dom-factories"

export default class Garment extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div id="garment-app">
                hello i am garment
            </div>
        );
    }
}
