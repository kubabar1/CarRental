import React from 'react';
import './InputFormGroup.scss';
import Select, { Props } from 'react-select';
import { SearchSelectOption } from '../../../../main-page/src/components/page_content/vehicle_list/filters/search_components/select/SearchSelect';

export type OptionType = { value: string | null; label: string | null };

interface FormGroupProperties<IS_MULTI extends boolean> extends Props<OptionType, IS_MULTI> {
    label: string;
}

const translate = (val: string): string | null => {
    return val;
};

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

export function SelectFormGroup<IS_MULTI extends boolean>({
    label,
    value,
    options,
    onChange,
    isMulti,
}: FormGroupProperties<IS_MULTI>): JSX.Element {
    return (
        <div className="form-group input-form-group-container">
            <div className="row">
                <label className="ml-5 mt-4 col-md-2">{label}</label>
                <div className={'ml-4 mt-3 col-md-8'}>
                    <Select
                        value={value}
                        options={options}
                        onChange={onChange}
                        isClearable={!!value && (value as OptionType).value != null}
                        isMulti={isMulti}
                    />
                </div>
            </div>
        </div>
    );
}
