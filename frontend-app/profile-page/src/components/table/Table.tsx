import React, { useEffect } from 'react';
import BTable from 'react-bootstrap/Table';
import { TableOptions, useTable, usePagination } from 'react-table';
import './Table.scss';
import classNames from 'classnames';
import { SubpagePagination } from '../subpage/pagination/SubpagePagination';
import { useLocation } from 'react-router-dom';
import { getCountFromUrl, getPageFromUrl } from '../../../../main-page/src/utils/UrlUtil';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from '../../constants/PathsAPI';

interface TableComponentInterface<T extends object> extends TableOptions<T> {
    fetchData: (pageIndex: number, pageSize: number) => void;
    tableContainerClassName?: string;
}

export function Table<T extends object>({
    columns,
    data,
    fetchData,
    tableContainerClassName,
    pageCount: controlledPageCount,
}: TableComponentInterface<T>): JSX.Element {
    const location = useLocation();
    const pageSizeFromUrl: number = getCountFromUrl(location.search);
    const pageIndexFromUrl: number = getPageFromUrl(location.search);
    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        pageOptions,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable<T>(
        {
            columns,
            data,
            initialState: {
                pageIndex: pageIndexFromUrl <= 0 ? DEFAULT_PAGE_INDEX : pageIndexFromUrl,
                pageSize: pageSizeFromUrl <= 0 ? DEFAULT_PAGE_SIZE : pageSizeFromUrl,
            },
            manualPagination: true,
            pageCount: controlledPageCount,
        },
        usePagination
    );

    useEffect(() => {
        fetchData(pageIndex, pageSize);
    }, [fetchData, pageIndex, pageSize]);

    return (
        <div>
            <BTable
                className={classNames('react-table-customization', tableContainerClassName)}
                bordered
                hover
                size="sm"
                {...getTableProps()}
            >
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
            {!!controlledPageCount && (
                <SubpagePagination
                    totalPagesCount={pageOptions.length}
                    perPageCount={pageSize}
                    setPageSize={setPageSize}
                    pageIndex={pageIndex}
                    gotoPage={gotoPage}
                />
            )}
        </div>
    );
}
