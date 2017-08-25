import React from "react"
import DOM from "react-dom-factories"

const headers = ["TITLE", "AUTHOR", "LANG", "YEAR", "SALES"];
const data = [
    ["title", "author", "language", "year", "sales"],
    ["title", "author", "language", "year", "sales"],
    ["title", "author", "language", "year", "sales"],
    ["title", "author", "language", "year", "sales"],
];
const generateKey = (function(name){
    let key = 0;
    return function(){
        return `name::${key++}`;
    }
})();

export default class Excel extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            DOM.table(
                {
                    style: {
                        border: "1px solid grey",
                        padding: "0.5rem",
                        margin: "0 auto",
                    },
                },
                DOM.thead(null,
                    DOM.tr(
                        {
                            style: {
                                background: "pink",
                            }
                        },
                        this.props.headers.map(function(value){
                            return DOM.th(
                                {
                                    key: generateKey("th"),
                                    style: {
                                        border: "1px solid lightgrey",
                                    },
                                },
                                value
                            );
                        }),
                    ),
                ),
                DOM.tbody(null,
                    this.props.initialData.map(function(tr){
                        return DOM.tr(
                            {
                                key: generateKey("tr"),
                            },
                            tr.map(function(td){
                                return DOM.td(
                                    {
                                        key: generateKey("td"),
                                    },
                                    td,
                                );
                            }),
                        );
                    }),
                ),
            )
        );
    }
}
Excel.defaultProps = {
    headers: headers,
    initialData: data,
}
