import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import DOM from "react-dom-factories"

const headers = ["TITLE", "AUTHOR", "LANG", "YEAR", "SALES"];
const data = [
    ["title", "author", "language", "year", "sales"],
    ["aatitle", "author", "language", "Z", "sales"],
    ["author", "language", "after", "", ""],
    ["bbtitle", "author", "language", "yyy", "sales"],
    ["bbbtitle", "author", "before", "xxx", ""],
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
        this.state = {
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null,
        };
        this._sort = this._sort.bind(this);
        this._showEditer = this._showEditer.bind(this);
        this._save = this._save.bind(this);
    }
    _sort(e){
        const data = this.state.data.slice();
        const column = e.target.cellIndex;
        const descending = this.state.sortby === column && !this.state.descending;
        data.sort((a, b) => {
            return descending
                ? a[column] < b[column] ? 1 : -1
                : a[column] > b[column] ? 1 : -1;
        });
        this.setState({
            data: data,
            sortby: column,
            descending: descending,
        });
    }
    _showEditer(e){
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex,
            },
        });
        // console.log(e.target.dataset.row, e.target.cellIndex);
    }
    _save(e){
        e.preventDefault();
        console.log(e.target);
        const input = e.target.firstChild;
        let data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this.setState({
            edit: null,
            data: data,
        });
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
                DOM.thead(
                    {
                        style: {
                            cursor: "pointer",
                        },
                        onClick: this._sort,
                    },
                    DOM.tr(
                        {
                            style: {
                                // background: "#fdd",
                            }
                        },
                        this.props.headers.map(function(title, index){
                            if(index === this.state.sortby){
                                title += this.state.descending ? " \u2191" : " \u2193";
                            }
                            return DOM.th(
                                {
                                    key: generateKey("th"),
                                    style: {
                                        background: "#fcc",
                                        borderBottom: "2px solid steelblue",
                                    },
                                },
                                title
                            );
                        }, this)
                    )
                ),
                DOM.tbody(
                    {
                        onDoubleClick: this._showEditer,
                    },
                    this.state.data.map(function(row, rowIndex){
                        return DOM.tr(
                            {
                                key: generateKey("row"),
                            },
                            row.map(function(cell, cellIndex){
                                let content = cell;
                                // 処理
                                const edit = this.state.edit;
                                if(edit && edit.row === rowIndex && edit.cell === cellIndex){
                                    content = DOM.form(
                                        {
                                            onSubmit: this._save,
                                        },
                                        DOM.input({
                                            type: "text",
                                            defaultValue: content,
                                            size: 8,
                                        })
                                    );
                                }
                                return DOM.td(
                                    {
                                        key: generateKey("cell"),
                                        "data-row": rowIndex,
                                        style: {
                                            background: "#fdd",
                                            borderBottom: "1px solid steelblue",
                                        },
                                    },
                                    content
                                );
                            }, this)
                        );
                    }, this)
                )
            )
        );
    }
}
Excel.defaultProps = {
    headers: headers,
    initialData: data,
}
Excel.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
}
