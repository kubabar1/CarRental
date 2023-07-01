import React, { useCallback, useEffect } from 'react';
import './SubpagePagination.scss';
import ReactPaginate from 'react-paginate';
import Select, { SingleValue } from 'react-select';
import qs, { ParsedQs } from 'qs';
import { useHistory } from 'react-router-dom';

interface SubpagePaginationProperties {
    totalPagesCount: number;
    pageIndex: number;
    gotoPage: (currentPage: number) => void;
    perPageCount: number;
    setPageSize: (perPageCount: number) => void;
}

type OptionType = { value: string | null; label: string | null };

export function SubpagePagination({
    totalPagesCount,
    pageIndex,
    gotoPage,
    perPageCount,
    setPageSize,
}: SubpagePaginationProperties): JSX.Element {
    const history = useHistory();
    const PER_PAGE_COUNTS: number[] = [5, 10, 25, 50];

    const mapToOptionType = (val: number): OptionType => {
        return {
            value: `${val}`,
            label: `${val}`,
        };
    };

    const changeLocationSearchParam = useCallback(
        (locationSearchParam: string, value: string) => {
            const currentParams: ParsedQs = qs.parse(location.search, {
                ignoreQueryPrefix: true,
            });
            currentParams[locationSearchParam] = value;
            history.push({
                search: `?${qs.stringify(currentParams)}`,
            });
        },
        [history]
    );

    useEffect(() => {
        changeLocationSearchParam('page', `${pageIndex}`);
    }, [pageIndex, changeLocationSearchParam]);

    useEffect(() => {
        changeLocationSearchParam('count', `${perPageCount}`);
    }, [perPageCount, changeLocationSearchParam]);

    return (
        <div className="subpage-pagination-and-counter-container">
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={totalPagesCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(selectedItem: { selected: number }) => {
                    gotoPage(selectedItem.selected);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={pageIndex}
            />
            <Select
                className="count-per-page-select"
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: '#cccccc',
                        primary50: '#999999',
                        primary70: '#666666',
                        primary: '#333333',
                    },
                })}
                value={mapToOptionType(perPageCount)}
                options={PER_PAGE_COUNTS.map(mapToOptionType)}
                onChange={(newValue: SingleValue<OptionType>) => {
                    if (newValue && newValue.value) {
                        setPageSize(parseInt(newValue.value));
                    }
                }}
            />
        </div>
    );
}
