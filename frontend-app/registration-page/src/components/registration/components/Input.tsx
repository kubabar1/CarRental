import React, { ChangeEvent } from 'react';

interface InputContainerProperties {
    label: string;
    inputValue: string | undefined;
    setInputValue: (val: string) => void;
    inputType: string;
    inputPlaceholder: string;
    inputError: string | undefined;
    required?: boolean;
    autoComplete?: boolean;
    autoFocus?: boolean;
    max?: number | string;
    children?: JSX.Element | JSX.Element[] | string | string[];
}

export function Input({
    label,
    inputValue,
    setInputValue,
    inputType,
    inputPlaceholder,
    inputError,
    required = false,
    autoComplete = true,
    autoFocus = false,
    max,
    children,
}: InputContainerProperties): JSX.Element {
    const renderInputAlert = () => {
        return (
            !!inputError && (
                <div className="alert alert-danger custom-alert mt-3" role="alert">
                    {inputError}
                </div>
            )
        );
    };

    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                type={inputType}
                className="form-control"
                placeholder={inputPlaceholder}
                required={required}
                autoFocus={autoFocus}
                autoComplete={autoComplete ? 'on' : 'off'}
                value={inputValue}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setInputValue(event.target.value);
                }}
                max={max}
            />
            {children}
            {renderInputAlert()}
        </div>
    );
}
