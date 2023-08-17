import React, { useCallback } from 'react';
import BTable from 'react-bootstrap/Table';
import {
    TableOptions,
    useTable,
    usePagination,
    useFilters,
    useSortBy,
    Filters,
    useRowSelect,
    Hooks,
    TableState,
    ActionType,
    CellProps,
    HeaderProps,
    ColumnInstance,
    UseRowSelectState,
} from 'react-table';
import './Table.scss';
import classNames from 'classnames';
import { SubpagePagination } from '../subpage/pagination/SubpagePagination';
import { useLocation } from 'react-router-dom';
import { getCountFromUrl, getPageFromUrl } from '../../../../main-page/src/utils/UrlUtil';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'rc-dropdown/assets/index.css';
import { DefaultColumnFilter } from './tab_items/default_column_filter/DefaultColumnFilter';
import { NoData } from './tab_items/no-data/NoData';
import { Loading } from './tab_items/loading/Loading';
import { IndeterminateCheckbox } from './tab_items/indeterminate_checkbox/IndeterminateCheckbox';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@car-rental/shared/constant';

interface TableComponentInterface<T extends object> extends TableOptions<T> {
    fetchData: (
        pageIndex: number,
        pageSize: number,
        filters?: string,
        sortBy?: string,
        desc?: boolean
    ) => Promise<void>;
    tableContainerClassName?: string;
    selectEnabled?: boolean;
    reference?: (node: UseRowSelectState<T>) => void;
}

const stateReducer = (ids: string[]) => (newState: TableState, action: ActionType) => {
    if (action.type === 'toggleAllRowsSelected') {
        if (action.value) {
            return {
                ...newState,
                selectedRowIds: extractSelectedRowIds(ids),
            };
        }
        return { ...newState, selectedRowIds: {} };
    }
    return newState;
};

const extractSelectedRowIds = (ids: string[]) => {
    return ids.reduce((row, id) => ({ ...row, [id]: true }), {});
};

interface TableInterface {
    id: string;
}

export function Table<T extends TableInterface>({
    columns,
    data,
    fetchData,
    getRowId = (row: T) => row.id,
    tableContainerClassName,
    selectEnabled = false,
    pageCount: controlledPageCount,
    reference,
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
        ({
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
            autoResetSelectedRows: false,
            getRowId: getRowId,
            stateReducer: stateReducer(data.map((d: T) => d.id)),
            defaultColumn: {
                Filter: DefaultColumnFilter,
            },
        } as unknown) as TableOptions<T>,
        useFilters,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks: Hooks<T>) => {
            if (selectEnabled) {
                hooks.visibleColumns.push((columns: ColumnInstance<T>[]) => [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<T>) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                            </div>
                        ),
                        Cell: ({ row }: CellProps<T>) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);
            }
        }
    );

    React.useImperativeHandle(
        reference,
        () => ({
            selectedRowIds: state.selectedRowIds,
        }),
        [state.selectedRowIds]
    );

    const createFilterString = useCallback((filters: Filters<T>): string => {
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
    }, []);

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
    }, [fetchData, state.pageIndex, state.pageSize, state.filters, state.sortBy, createFilterString]);

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
