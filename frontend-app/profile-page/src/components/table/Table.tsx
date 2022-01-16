import React from 'react';
import BTable from 'react-bootstrap/Table';
import { TableOptions, useTable } from 'react-table';

// eslint-disable-next-line @typescript-eslint/ban-types
export function Table<T extends object>({ columns, data }: TableOptions<T>): JSX.Element {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    return (
        <BTable striped bordered hover size="sm" {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup, headerGroupIdx) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIdx}>
                        {headerGroup.headers.map((column, columnIdx) => (
                            <th {...column.getHeaderProps()} key={columnIdx}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {rows.map((row, rowIdx) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={rowIdx}>
                            {row.cells.map((cell, cellIdx) => {
                                return (
                                    <td {...cell.getCellProps()} key={cellIdx}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </BTable>
    );
}
