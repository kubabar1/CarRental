import React from 'react';
import BTable from 'react-bootstrap/Table';
import { TableOptions, useTable, usePagination, useFilters, useSortBy, Filters } from 'react-table';
import './Table.scss';
import classNames from 'classnames';
import { SubpagePagination } from '../subpage/pagination/SubpagePagination';
import { useLocation } from 'react-router-dom';
import { getCountFromUrl, getPageFromUrl } from '../../../../main-page/src/utils/UrlUtil';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from '../../constants/PathsAPI';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'rc-dropdown/assets/index.css';
import { DefaultColumnFilter } from './tab_items/default_column_filter/DefaultColumnFilter';
import { NoData } from './tab_items/no-data/NoData';
import { Loading } from './tab_items/loading/Loading';

interface TableComponentInterface<T extends object> extends TableOptions<T> {
    fetchData: (
        pageIndex: number,
        pageSize: number,
        filters?: string,
        sortBy?: string,
        desc?: boolean
    ) => Promise<void>;
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
    const [loading, setLoading] = React.useState(true);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        pageOptions,
        gotoPage,
        setPageSize,
        state,
    } = useTable<T>(
        {
            columns,
            data,
            initialState: {
                pageIndex: pageIndexFromUrl <= 0 ? DEFAULT_PAGE_INDEX : pageIndexFromUrl,
                pageSize: pageSizeFromUrl <= 0 ? DEFAULT_PAGE_SIZE : pageSizeFromUrl,
            },
            manualPagination: true,
            manualFilters: true,
            manualSortBy: true,
            pageCount: controlledPageCount,
            defaultColumn: {
                Filter: DefaultColumnFilter,
            },
        } as TableOptions<T>,
        useFilters,
        useSortBy,
        usePagination
    );

    const createFilterString = (filters: Filters<T>): string => {
        return filters
            .map((f) => {
                if (f.value.min || f.value.max) {
                    let filterStr = '';
                    if (f.value.min) {
                        filterStr += `${f.id}>${f.value.min}`;
                    }
                    if (f.value.max) {
                        if (filterStr !== '') {
                            filterStr += ',';
                        }
                        filterStr += `${f.id}<${f.value.max}`;
                    }
                    return filterStr;
                } else {
                    return `${f.id}:${f.value}`;
                }
            })
            .join(',');
    };

    React.useEffect(() => {
        fetchData(
            state.pageIndex,
            state.pageSize,
            createFilterString(state.filters),
            state.sortBy.length ? state.sortBy[0].id : undefined,
            state.sortBy.length ? state.sortBy[0].desc : undefined
        ).then(() => {
            setLoading(false);
        });
    }, [fetchData, state.pageIndex, state.pageSize, state.filters, state.sortBy]);

    return !loading ? (
        <div className="table-container">
            <div className="table-content-container">
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
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} key={columnIdx}>
                                        <div className="custom-table-header-container">
                                            <div className="custom-table-header-text">
                                                <div>
                                                    {column.isSorted && (
                                                        <FontAwesomeIcon
                                                            className="link-style-black font-awesome-style sort-icon"
                                                            icon={column.isSortedDesc ? faSortDown : faSortUp}
                                                        />
                                                    )}
                                                    {column.render('Header')}
                                                </div>
                                            </div>
                                            <div className="custom-table-header-filter">
                                                {column.canFilter ? column.render('Filter') : null}
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {rows.length ? (
                        <tbody {...getTableBodyProps()}>
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
                    ) : (
                        <NoData />
                    )}
                </BTable>
            </div>
            {!!controlledPageCount && (
                <SubpagePagination
                    totalPagesCount={pageOptions.length}
                    perPageCount={state.pageSize}
                    setPageSize={setPageSize}
                    pageIndex={state.pageIndex}
                    gotoPage={gotoPage}
                />
            )}
        </div>
    ) : (
        <Loading />
    );
}
