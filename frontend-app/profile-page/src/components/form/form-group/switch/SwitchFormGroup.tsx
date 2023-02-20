import React from 'react';
import './SwitchFormGroup.scss';
import { Control } from 'react-hook-form/dist/types/form';
import { FieldError, FieldPath, FieldValues, Merge } from 'react-hook-form/dist/types';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import Switch from 'react-switch';
import { Controller } from 'react-hook-form';

interface FormGroupProperties<FieldValuesType extends FieldValues> {
    label: string;
    name: FieldPath<FieldValuesType>;
    control: Control<FieldValuesType>;
    rules?: Omit<
        RegisterOptions<FieldValuesType, FieldPath<FieldValuesType>>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    isDisabled?: boolean;
}

export function SwitchFormGroup<FieldValuesType extends FieldValues>({
    label,
    name,
    control,
    rules,
    error,
    isDisabled = false,
}: FormGroupProperties<FieldValuesType>): JSX.Element {
    return (
        <div className="form-group switch-form-group-container">
            <div className="row">
                <label className="ml-5 mt-4 col-md-2">{label}</label>
                <div className={'ml-4 mt-3 col-md-1 checkbox-input-container'}>
                    <Controller
                        name={name}
                        control={control}
                        rules={rules}
                        render={({ field: { onChange, value } }) => (
                            <Switch onChange={onChange} checked={value} disabled={isDisabled} />
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
