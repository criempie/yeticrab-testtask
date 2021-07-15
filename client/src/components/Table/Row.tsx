import React from 'react';
import './index.css';
import { column } from "./Table";

function Row({ columns, row }: { columns: Array<column>, row: any }) {

    return buildRow(row, columns)
}

function buildRow(row: any, columns: Array<column>): React.ReactElement {

    return (
        <tr className="table-row">
            {
                columns.map((col:column) => {
                    if (col.name !== "edit" && col.name !== "trash") {
                        return <th className="table-cell">{row[col.name]}</th>
                    } else {
                        return <th className='table-cell icon'><img src={`./icons/${col.name}.svg`}
                                                                    alt={col.name} /></th>
                    }
                })
            }
        </tr>
    )
};

export default Row