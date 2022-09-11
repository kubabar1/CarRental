import React from 'react';
import Select, { Props } from 'react-select';

interface SearchItemProperties extends Props<SearchSelectOption, false> {
    label: string;
}

export type SearchSelectOption = { value: string | null; label: string | null };

export function SearchSelect(props: SearchItemProperties): JSX.Element {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <Select
                value={props.value}
                options={props.options}
                onChange={props.onChange}
                isClearable={!!props.value && (props.value as SearchSelectOption).value != null}
            />
        </div>
    );
}
