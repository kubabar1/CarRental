import React, { ChangeEvent } from 'react';
import './InputFormGroup.scss';
import classNames from 'classnames';

type InputType = 'text' | 'number' | 'checkbox' | 'date';

interface FormGroupProperties {
    label: string;
    name: string;
    value?: string | number | boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: InputType;
    isDisabled?: boolean;
    required?: boolean;
}

export function InputFormGroup({
    name,
    label,
    value,
    onChange,
    type = 'text',
    isDisabled = false,
    required = false,
}: FormGroupProperties): JSX.Element {
    const isCheckbox: boolean = type === 'checkbox';

    return (
        <div className="form-group input-form-group-container">
            <div className="row">
                <label className="ml-5 mt-4 col-md-2">{label}</label>
                <div
                    className={classNames('ml-4 ', 'mt-3', {
                        'col-md-1': isCheckbox,
                        'col-md-8': !isCheckbox,
                        'checkbox-input-container': isCheckbox,
                    })}
                >
                    <input
                        type={type}
                        disabled={isDisabled}
                        className="form-control"
                        name={name}
                        {...(isCheckbox && { checked: value as boolean })}
                        {...(!isCheckbox && { value: value as string | number })}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event)}
                        required={required}
                    />
                </div>
            </div>
        </div>
    );
}
