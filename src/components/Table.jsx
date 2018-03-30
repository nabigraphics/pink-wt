import React, { Component } from 'react';

class Table extends Component {
    renderColumn(columns) {
        return columns.map((column, i) => {
            let key = column.key + '_' + i;
            let attrs = { key };
            if(column.width) attrs.width = column.width;
            return <th {...attrs} >{column.title}</th>
        })
    }
    renderData(columns, data) {
        return data.map((item, i) => {
            return (
                <tr key={item.key}>
                    {
                        columns.map((column, i) => {
                            let key = item.key + '_' + column.key + '_' + i;
                            // if(column.render) 
                            // console.log(column);
                            if (column.render) {
                                return (
                                    <td key={key}>{column.render(item[column.key], item, i)}</td>
                                )
                            } else {
                                return (
                                    <td key={key}>{item[column.key]}</td>
                                )
                            }
                        })
                    }
                </tr>
            )
        })
    }
    render() {
        const { columns, data } = this.props;
        return (
            <table className="table-responsive">
                <thead>
                    <tr>
                        {this.renderColumn(columns)}
                    </tr>
                </thead>
                <tbody>
                    {this.renderData(columns, data)}
                </tbody>
            </table>
        );
    }
}

export default Table;