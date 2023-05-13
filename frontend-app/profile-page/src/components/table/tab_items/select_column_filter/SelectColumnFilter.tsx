import { FilterProps } from 'react-table';
import React, { useState } from 'react';
import Select from 'react-select';
import { SingleValue } from 'react-select';
import Dropdown from 'rc-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import './SelectColumnFilter.scss';

export type SelectColumnFilterOption = { value: string | null; label: string | null };

interface SelectColumnFilterInterface<D extends object> extends FilterProps<D> {
    options?: SelectColumnFilterOption[];
}

const filterAll: SelectColumnFilterOption = { value: null, label: 'All' };

export function SelectColumnFilter<D extends object>({
    column: { setFilter },
    options = [filterAll],
}: SelectColumnFilterInterface<D>) {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<SelectColumnFilterOption>(filterAll);

    const menu = (
        <form
            className="select-column-filter-container row filter-card"
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
            }}
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
            }}
        >
            <Select
                className={'select-column-filter'}
                value={value}
                onChange={(filterOption: SingleValue<SelectColumnFilterOption>) => {
                    if (filterOption) {
                        setValue(filterOption);
                    }
                }}
                options={[filterAll, ...options]}
            />
            <Button
                onClick={() => {
                    setVisible(false);
                    if (value.value) {
                        setFilter(`${value.value}`);
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
        <Dropdown
            trigger={['click']}
            onVisibleChange={setVisible}
            visible={visible}
            overlay={menu}
            animation="slide-up"
        >
            <a
                href=""
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                }}
            >
                <FontAwesomeIcon
                    className="link-style-black font-awesome-style"
                    icon={faFilter}
                    onClick={() => {
                        setVisible(!visible);
                    }}
                />
            </a>
        </Dropdown>
    );
}
