import React, { ChangeEvent } from 'react';

interface FormGroupProperties {
    label: string;
    name: string;
    value?: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    isDisabled?: boolean;
    required?: boolean;
    rows?: number;
}

export function TextAreaFormGroup({
    name,
    label,
    value,
    onChange,
    isDisabled = false,
    required = false,
    rows = 8,
}: FormGroupProperties): JSX.Element {
    return (
        <div className="form-group">
            <div className="row">
                <label className="ml-5 mt-4 col-md-2">{label}</label>
                <div className="ml-4 mt-3 col-md-8">
                    <textarea
                        rows={rows}
                        disabled={isDisabled}
                        className="form-control"
                        name={name}
                        value={value}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event)}
                        required={required}
                    />
                </div>
            </div>
        </div>
    );
}
