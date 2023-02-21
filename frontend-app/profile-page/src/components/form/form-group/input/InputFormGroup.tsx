import React from 'react';
import './InputFormGroup.scss';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { FieldError, FieldPath, FieldValues } from 'react-hook-form/dist/types';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

type InputType = 'text' | 'number' | 'date';

interface FormGroupProperties<FieldValuesType extends FieldValues> {
    label: string;
    name: FieldPath<FieldValuesType>;
    register: UseFormRegister<FieldValuesType>;
    registerOptions?: RegisterOptions;
    type?: InputType;
    isDisabled?: boolean;
    error?: FieldError;
    step?: number;
    min?: number;
    max?: number;
}

export function InputFormGroup<FieldValuesType extends FieldValues>({
    label,
    name,
    register,
    registerOptions,
    type = 'text',
    isDisabled = false,
    error,
    step = 1,
    min,
    max,
}: FormGroupProperties<FieldValuesType>): JSX.Element {
    return (
        <div className="form-group input-form-group-container">
            <div className="row">
                <label className="ml-5 mt-4 col-md-2">{label}</label>
                <div className={'ml-4 mt-3 col-md-8'}>
                    <input
                        type={type}
                        disabled={isDisabled}
                        className="form-control"
                        step={step}
                        min={min}
                        max={max}
                        {...register(name, registerOptions)}
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
