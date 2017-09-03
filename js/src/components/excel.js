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
            search: false,
            preSearchData: null,
        };
        this._sort = this._sort.bind(this);
        this._showEditer = this._showEditer.bind(this);
        this._save = this._save.bind(this);
        this._renderTable = this._renderTable.bind(this);
        this._renderToolbar = this._renderToolbar.bind(this);
        this._toggleSearch = this._toggleSearch.bind(this);
        this._renderSearch = this._renderSearch.bind(this);
        this._search = this._search.bind(this);
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
        if (e.target.tagName === "INPUT") return;
        const newEdit = {
            row: parseInt(e.target.dataset.row, 10),
            cell: e.target.cellIndex,
        };
        this.setState({
            edit: newEdit,
        });
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
    _toggleSearch(){
        if(this.state.search){
            this.setState({
                data: this.state.preSearchData,
                search: false,
                preSearchData: null,
            });
        }else{
            this.setState({
                preSearchData: this.state.data,
                search: true,
            });
        }
    }
    _search(e){
        const needle = e.target.value.toLowerCase();
        if(!needle){
            this.setState({
                data: this.state.preSearchData,
            });
            return;
        }
        const idx = e.target.dataset.idx;
        const searchData = this.state.preSearchData.filter(function(row){
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({
            data: searchData,
        });
    }
    _renderSearch(){
        if(!this.state.search){
            return
        };
        return DOM.tr(
            {
                onChange: this._search,
            },
            this.props.headers.map(function(_ignoreValue, idx){
                return DOM.td(
                    {
                        key: idx,
                    },
                    DOM.input({
                        type: "text",
                        "data-idx": idx,
                        style: {
                            display: "inline-block",
                            maxWidth: "6em",
                        },
                    })
                );
            })
        );
    }
    _renderToolbar(){
        return (
            DOM.button(
                {
                    onClick: this._toggleSearch,
                    className: "toolbar",
                    style: {
                        padding: ".6em",
                        background: "white",
                        borderRadius: ".2em",
                    },
                },
                "検索"
            )
        );
    }
    _renderTable(){
        return (
            DOM.table(
                {
                    style: {
                        border: "1px solid grey",
                        padding: "0.5rem",
                        margin: "0 auto",
                        width: "800px",
                        maxWidth: "100%",
                    },
                },
                DOM.thead(
                    {
                        style: {
                            cursor: "pointer",
                        },
                        onClick: this._sort,
                    },
                    DOM.tr(null,
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
                    this._renderSearch(),
                    this.state.data.map(function(row, rowIndex){
                        return DOM.tr(
                            {
                                key: generateKey("row"),
                            },
                            row.map(function(cell, cellIndex){
                                let content = cell;
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
    render(){
        return DOM.div(null,
            this._renderToolbar(),
            this._renderTable()
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
