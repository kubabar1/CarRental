import React from 'react';
import './SubpagePagination.scss';
import ReactPaginate from 'react-paginate';
import Select, { SingleValue } from 'react-select';
import qs, { ParsedQs } from 'qs';
import { useHistory } from 'react-router-dom';

interface SubpagePaginationProperties {
    totalPagesCount: number;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    perPageCount: number;
    setPerPageCount: (perPageCount: number) => void;
}

type OptionType = { value: string | null; label: string | null };

export function SubpagePagination({
    totalPagesCount,
    currentPage,
    setCurrentPage,
    perPageCount,
    setPerPageCount,
}: SubpagePaginationProperties): JSX.Element {
    const history = useHistory();
    const VEHICLES_PER_PAGE_COUNTS: number[] = [5, 10, 25, 50];

    const mapToOptionType = (val: number): OptionType => {
        return {
            value: `${val}`,
            label: `${val}`,
        };
    };

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
                    const currentParams: ParsedQs = qs.parse(location.search, {
                        ignoreQueryPrefix: true,
                    });
                    currentParams['page'] = `${selectedItem.selected}`;
                    history.push({
                        search: `?${qs.stringify(currentParams)}`,
                    });
                    setCurrentPage(selectedItem.selected);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={currentPage}
            />
            <Select
                className="count-per-page-select"
                value={mapToOptionType(perPageCount)}
                options={VEHICLES_PER_PAGE_COUNTS.map(mapToOptionType)}
                onChange={(newValue: SingleValue<OptionType>) => {
                    if (newValue && newValue.value) {
                        const currentParams: ParsedQs = qs.parse(location.search, {
                            ignoreQueryPrefix: true,
                        });
                        currentParams['count'] = `${newValue.value}`;
                        history.push({
                            search: `?${qs.stringify(currentParams)}`,
                        });
                        setPerPageCount(parseInt(newValue.value));
                    }
                }}
            />
        </div>
    );
}
