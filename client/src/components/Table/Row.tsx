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
                    if (col.name === "edit" || col.name === "trash") {
                        return <th className='table-cell icon'><img id={col.name + ";" + row.id}
                                                                    src={`./icons/${col.name}.svg`}
                                                                    alt={col.name} /></th>
                    } else if (col.hasOwnProperty("parsingFunction")) {
                        // @ts-ignore
                        return <th className='table-cell'>{col.parsingFunction?.(row[col.name])}</th>
                    } else {
                        return <th className="table-cell">{row[col.name]}</th>
                    }
                })
            }
        </tr>
    )
};

export default Row