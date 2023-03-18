import React from 'react';
import { FieldError, FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Merge } from 'react-hook-form/dist/types';

interface ReceptionDateHourInputs<FieldValuesType extends FieldValues> {
    label: string;
    inputName: FieldPath<FieldValuesType>;
    register: UseFormRegister<FieldValuesType>;
    inputRegisterOptions?: RegisterOptions;
    inputError?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    min?: string;
    max?: string;
}

export function DateInput<FieldValuesType extends FieldValues>({
    label,
    inputName,
    register,
    inputRegisterOptions,
    inputError,
    min,
    max,
}: ReceptionDateHourInputs<FieldValuesType>): JSX.Element {
    return (
        <div>
            <div className="form-group">
                <label>{label}</label>
                <input
                    type="date"
                    className="form-control"
                    min={min}
                    max={max}
                    {...register(inputName, inputRegisterOptions)}
                />
            </div>
            {inputError && (
                <div className="alert alert-danger custom-alert" role="alert">
                    {inputError.message}
                </div>
            )}
        </div>
    );
}
