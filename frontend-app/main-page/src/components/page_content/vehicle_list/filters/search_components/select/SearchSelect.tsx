import React from 'react';
import Select, { Props } from 'react-select';

interface SearchItemProperties extends Props<SearchSelectOption, false> {
    label: string;
}

export type SearchSelectOption = { value: string | null; label: string | null };

export const mapToOptionType = (val?: string): SearchSelectOption => {
    if (val) {
        return {
            value: val,
            label: translate(val),
        };
    } else {
        return {
            value: null,
            label: null,
        };
    }
};

const translate = (val: string): string | null => {
    return val;
};

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
