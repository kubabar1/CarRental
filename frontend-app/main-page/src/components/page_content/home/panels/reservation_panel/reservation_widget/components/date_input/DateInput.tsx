import React from 'react';
import './DateHourInput.scss';
import { FieldValues, RegisterOptions, UseFormRegister, Auto, PathString, Message } from 'react-hook-form';

interface DateInputProps<FieldValuesType extends FieldValues> {
    label: string;
    register: UseFormRegister<FieldValuesType>;
    dateInputName: Auto.FieldPath<FieldValuesType, PathString>;
    dateInputRegisterOptions?: RegisterOptions<FieldValuesType, PathString>;
    dateInputError?: Message;
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
                        {dateInputError}
                    </div>
                )}
            </div>
        </div>
    );
}
