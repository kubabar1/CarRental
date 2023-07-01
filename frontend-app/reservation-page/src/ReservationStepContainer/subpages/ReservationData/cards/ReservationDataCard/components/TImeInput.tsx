import React from 'react';
import { FieldError, FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface ReceptionDateHourInputs<FieldValuesType extends FieldValues> {
    label: string;
    inputName: FieldPath<FieldValuesType>;
    register: UseFormRegister<FieldValuesType>;
    inputRegisterOptions?: RegisterOptions;
    inputError?: FieldError | undefined;
    min?: string;
    max?: string;
}

export function TimeInput<FieldValuesType extends FieldValues>({
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
                    type="time"
                    className="form-control"
                    min={min}
                    max={max}
                    step="1"
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
