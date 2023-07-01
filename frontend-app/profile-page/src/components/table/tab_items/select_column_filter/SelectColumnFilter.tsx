import { FilterProps } from 'react-table';
import React from 'react';
import Select from 'react-select';
import { SingleValue } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import './SelectColumnFilter.scss';
import classNames from 'classnames';
import { FilterDropdown } from '../filter_dropdown/FilterDropdown';

export type SelectColumnFilterOption = { value: string | null; label: string | null };

interface SelectColumnFilterInterface<D extends object> extends FilterProps<D> {
    options?: SelectColumnFilterOption[];
}

const filterAll: SelectColumnFilterOption = { value: null, label: 'All' };

export function SelectColumnFilter<D extends object>({
    column: { filterValue, setFilter },
    options = [filterAll],
}: SelectColumnFilterInterface<D>) {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<SelectColumnFilterOption>(filterAll);

    const optionsSorted: SelectColumnFilterOption[] = options
        ? [...options.sort()].sort((optionA: SelectColumnFilterOption, optionB: SelectColumnFilterOption) => {
              if (optionA.label !== null && optionB.label !== null) {
                  return optionA.label.localeCompare(optionB.label);
              } else {
                  return 0;
              }
          })
        : [];

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
                options={[filterAll, ...optionsSorted]}
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
