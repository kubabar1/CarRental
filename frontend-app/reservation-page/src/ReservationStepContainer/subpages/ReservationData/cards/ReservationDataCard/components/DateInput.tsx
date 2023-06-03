import React from 'react';
import { Controller, FieldError, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { Control, Merge } from 'react-hook-form/dist/types';
import { ReactHookFormStorage } from '../../../../../../utils/StorageUtil';

interface ReceptionDateHourInputs<FieldValuesType extends FieldValues> {
    label: string;
    inputName: FieldPath<FieldValuesType>;
    inputRegisterOptions?: RegisterOptions;
    inputError?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    control: Control<FieldValuesType>;
    min?: string;
    max?: string;
    reservationStorage?: ReactHookFormStorage<FieldValuesType>;
}

export function DateInput<FieldValuesType extends FieldValues>({
    label,
    inputName,
    inputRegisterOptions,
    inputError,
    control,
    min,
    max,
    reservationStorage,
}: ReceptionDateHourInputs<FieldValuesType>): JSX.Element {
    return (
        <div>
            <div className="form-group">
                <label>{label}</label>
                <Controller
                    name={inputName}
                    control={control}
                    rules={inputRegisterOptions}
                    render={({ field: { onChange, value } }) => (
                        <input
                            type="date"
                            className="form-control"
                            min={min}
                            max={max}
                            value={value}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const changedValue = event.target.value;
                                onChange(changedValue);
                                if (reservationStorage) {
                                    reservationStorage.replaceValueInStorage(inputName, changedValue);
                                }
                            }}
                        />
                    )}
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