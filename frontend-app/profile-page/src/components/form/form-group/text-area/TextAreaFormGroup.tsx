import React from 'react';
import './TextAreaFormGroup.scss';
import { FieldError, FieldPath, FieldValues } from 'react-hook-form/dist/types';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

interface FormGroupProperties<FieldValuesType extends FieldValues> {
    label: string;
    name: FieldPath<FieldValuesType>;
    register: UseFormRegister<FieldValuesType>;
    registerOptions?: RegisterOptions;
    isDisabled?: boolean;
    error?: FieldError;
    rows?: number;
}

export function TextAreaFormGroup<FieldValuesType extends FieldValues>({
    label,
    name,
    register,
    registerOptions,
    error,
    isDisabled = false,
    rows = 8,
}: FormGroupProperties<FieldValuesType>): JSX.Element {
    return (
        <div className="form-group test-area-form-group-container">
            <div className="row">
                <label className="ml-5 mt-4 col-md-2">{label}</label>
                <div className="ml-4 mt-3 col-md-8">
                    <textarea
                        rows={rows}
                        disabled={isDisabled}
                        className="form-control"
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