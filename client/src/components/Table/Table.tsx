import React from 'react';
import './index.css';

export type column = { title: string, name: string, width?: number };

function Table({ columns, children }:{ columns: Array<column>, children?: React.ReactNode[] }) {

    return (
        <table className='table'>
            <thead>
                { buildTableHeader(columns) }
            </thead>

            <tbody className='table-body'>
                { children }
            </tbody>
        </table>
    )
}

function buildTableHeader(columns: Array<column>): React.ReactElement {

    return (
        <tr className='table-header'>
            {columns.map((col: column) => <th style={{width: col?.width }}>{col.title}</th>)}
        </tr>
    )
}

export default Table