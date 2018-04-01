import React, { Component } from 'react';

class Table extends Component {
    renderColumn(columns) {
        return columns.map((column, i) => {
            let key = column.key + '_' + i;
            let attrs = { key };
            if (column.width) attrs.width = column.width;
            if (column.align) attrs.align = column.align;
            return <th {...attrs} >{column.title}</th>
        })
    }
    renderData(columns, data) {
        // console.log(data.length);
        return data.map((item, i) => {
            return (
                <tr key={item.key}>
                    {
                        columns.map((column, i) => {
                            let key = item.key + '_' + column.key + '_' + i;
                            // if(column.render) 
                            // console.log(column);
                            let attrs = { key };
                            if (column.width) attrs.width = column.width;
                            if (column.align) attrs.align = column.align;
                            if (column.render) {
                                return (
                                    <td {...attrs}>{column.render(item[column.key], item, i)}</td>
                                )
                            } else {
                                return (
                                    <td {...attrs}>{item[column.key]}</td>
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
                {(columns || columns.length > 0) ?
                    <thead key="table-thead">
                        <tr>
                            {this.renderColumn(columns)}
                        </tr>
                    </thead>
                    :
                    null
                }
                {
                    (columns && data && columns.length > 0 && data.length > 0) ?
                        <tbody key="table-tbody">
                            {this.renderData(columns, data)}
                        </tbody>
                        :
                        null
                }
            </table>
        );
    }
}

export default Table;