import React from 'react';
import './DateHourInput.scss';
import { FieldError, FieldPath, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface DateInputProps<FieldValuesType extends FieldValues> {
    label: string;
    dateInputName: FieldPath<FieldValuesType>;
    register: UseFormRegister<FieldValuesType>;
    dateInputRegisterOptions?: RegisterOptions;
    dateInputError?: FieldError;
    minDate?: string;
    maxDate?: string;
}

export function DateInput<FieldValuesType extends FieldValues>({
    label,
    dateInputName,
    register,
    dateInputRegisterOptions,
    dateInputError,
    minDate,
    maxDate,
}: DateInputProps<FieldValuesType>): JSX.Element {
    return (
        <div className="date-hour-input-group form-group">
            <label>{label}</label>
            <div className="input-group">
                <input
                    type="date"
                    className="form-control"
                    min={minDate}
                    max={maxDate}
                    {...register(dateInputName, dateInputRegisterOptions)}
                />
                {dateInputError && (
                    <div className="alert alert-danger custom-alert" role="alert">
                        {dateInputError.message}
                    </div>
                )}
            </div>
        </div>
    );
}
