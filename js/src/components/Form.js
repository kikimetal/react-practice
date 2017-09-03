import React from "react"

export default class Form extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: this.props.initialValue || "default",
        }
    }
    render(){
        const onChangeInForm = (e) => {
            const val = e.target.value
            this.setState({
                value: val || "default",
            })
        }
        const clickSubmit = (e) => {
            e.preventDefault()
            this.setState({
                value: "clear!",
            })
            this.refs.form.querySelectorAll("input[type='text']").forEach((v, i)=>{
                v.value = ""
            })
            setTimeout(()=>{
                this.setState({
                    value: "default",
                })
            }, 1000)
        }

        const inputs = (new Array(9)).fill(null).map(function(value, i){
            return <input key={"input" + i} type="text" />
        })
        console.log(inputs)
        return (
            <div className="Form">
                <h3>{this.state.value}</h3>
                <form onChange={onChangeInForm} ref="form">
                    {inputs}
                    <input type="submit" value="clear" onClick={clickSubmit} />
                </form>
            </div>
        )
    }
}
