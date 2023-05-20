import { FilterProps } from 'react-table';
import React, { ChangeEvent } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { FilterDropdown } from '../filter_dropdown/FilterDropdown';

export function DefaultColumnFilter<D extends object>({ column: { filterValue, setFilter } }: FilterProps<D>) {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string | undefined>(undefined);

    const menu: JSX.Element = (
        <form
            className="row filter-card"
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
            }}
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
            }}
        >
            <input
                className="form-control"
                value={value || ''}
                type="search"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setValue(e.target.value || undefined);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        setFilter(value);
                        setVisible(false);
                    }
                }}
            />
            <Button
                onClick={() => {
                    setVisible(false);
                    setFilter(value);
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
