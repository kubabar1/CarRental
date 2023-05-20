import { FilterProps } from 'react-table';
import React, { ChangeEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import './RangeColumnFilter.scss';
import classNames from 'classnames';
import { FilterDropdown } from '../filter_dropdown/FilterDropdown';

type RangeType = { min?: number | string; max?: number | string };

interface RangeColumnFilterInterface<D extends object> extends FilterProps<D> {
    inputType?: string;
}

export function RangeColumnFilter<D extends object>({
    column: { filterValue, setFilter },
    inputType = 'search',
}: RangeColumnFilterInterface<D>) {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [min, setMin] = useState<number | string>('');
    const [max, setMax] = useState<number | string>('');

    const menu = (
        <form
            className="range-column-filter-container row filter-card"
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
            }}
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
            }}
        >
            <input
                className="form-control"
                type={inputType}
                value={min}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setMin(e.target.value);
                }}
            />
            <p className="form-control-dash">-</p>
            <input
                className="form-control"
                type={inputType}
                value={max}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setMax(e.target.value);
                }}
            />
            <Button
                onClick={() => {
                    const dateFilter: RangeType = {
                        ...(!!min && { min: min }),
                        ...(!!max && { max: max }),
                    };
                    if (!dateFilter.min) {
                        delete dateFilter.min;
                    }
                    if (!dateFilter.max) {
                        delete dateFilter.max;
                    }
                    setVisible(false);
                    if (!!dateFilter.min || !!dateFilter.max) {
                        setFilter(dateFilter);
                    } else {
                        setFilter(undefined);
                    }
                }}
            >
                Filter
            </Button>
        </form>
    );

    return (
        <FilterDropdown menu={menu} visible={visible} setVisible={setVisible}>
            <FontAwesomeIcon
                className={classNames('link-style-black', 'font-awesome-style', 'filter-icon', {
                    'filter-icon-active': !!filterValue,
                })}
                icon={faFilter}
                onClick={() => {
                    setVisible(!visible);
                }}
            />
        </FilterDropdown>
    );
}
