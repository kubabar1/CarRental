import React, { MouseEvent } from 'react';
import './SelectFormGroup.scss';
import Select from 'react-select';
import { Control } from 'react-hook-form/dist/types/form';
import { FieldError, FieldPath, FieldValues, Merge } from 'react-hook-form/dist/types';
import { Controller } from 'react-hook-form';
import { OnChangeValue, Options } from 'react-select/dist/declarations/src/types';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type OptionType = { value: string | null; label: string | null };

interface FormGroupProperties<FieldValuesType extends FieldValues> {
    label: string;
    options: Options<OptionType>;
    name: FieldPath<FieldValuesType>;
    control?: Control<FieldValuesType>;
    rules?: Omit<
        RegisterOptions<FieldValuesType, FieldPath<FieldValuesType>>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    isClearable?: boolean;
    isMulti?: boolean;
    displayAddButton?: boolean;
    onClickAddButton?: (event: MouseEvent) => void;
    addButtonText?: string;
    isAddButtonDisabled?: boolean;
}

const translate = (val: string): string | null => {
    return val;
};

export const mapToOptionType = (val?: string): OptionType => {
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

export const mapToOptionTypeWithKeys = (val: string, label: string): OptionType => {
    return {
        value: val,
        label: label,
    };
};

export function SelectFormGroup<FieldValuesType extends FieldValues, IsMulti extends boolean = false>({
    label,
    name,
    control,
    rules,
    options,
    error,
    isMulti = false,
    isClearable = false,
    displayAddButton = false,
    isAddButtonDisabled = false,
    onClickAddButton,
}: FormGroupProperties<FieldValuesType>): JSX.Element {
    return (
        <div className="form-group select-form-group-container">
            <div className="row">
                <label className="ml-5 mt-4 col-md-2">{label}</label>
                <div className={'ml-4 mt-3 col-md-8'}>
                    <Controller
                        name={name}
                        control={control}
                        rules={rules}
                        render={({ field: { onChange, value } }) => (
                            <div className="select-row">
                                <Select<OptionType, IsMulti>
                                    options={options}
                                    value={options.find((val: OptionType) => {
                                        if (value != null && Array.isArray(value)) {
                                            return value.includes(val.value);
                                        } else {
                                            return val.value === value;
                                        }
                                    })}
                                    isClearable={isClearable}
                                    onChange={(val: OnChangeValue<OptionType, IsMulti>) => {
                                        if (val != null && Array.isArray(val)) {
                                            onChange(val.map((v: OptionType) => v.value));
                                        } else if (val != null) {
                                            onChange((val as OptionType).value);
                                        }
                                    }}
                                    className={classNames({
                                        'select-with-add': displayAddButton,
                                        'select-default': !displayAddButton,
                                    })}
                                    isMulti={isMulti as IsMulti}
                                />
                                {displayAddButton && onClickAddButton && (
                                    <Button
                                        onClick={(event: MouseEvent) => {
                                            onClickAddButton(event);
                                        }}
                                        disabled={isAddButtonDisabled}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                )}
                            </div>
                        )}
                    />
                    {error && (
                        <div className="alert alert-danger custom-alert" role="alert">
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
