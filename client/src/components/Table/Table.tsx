import React from 'react';
import './index.css';

export type column = { title: string, name: string, width?: number, parsingFunction?: object };

interface TableProps {
  columns: Array<column>;
  eventListener: (event: React.SyntheticEvent) => void;
  children?: React.ReactChild[];
}

function Table({ columns, eventListener, children }: TableProps) {

    return (
        <table className='table' onClick={eventListener}>
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