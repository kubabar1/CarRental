import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface FormGroupProperties {
    label: string;
    name: string;
    value: string | ReadonlyArray<string> | number;
    onChange: Dispatch<SetStateAction<string>>;
    type?: string;
    isDisabled?: boolean;
}

export function FormGroup({
    name,
    label,
    value,
    onChange,
    type,
    isDisabled = false,
}: FormGroupProperties): JSX.Element {
    return (
        <div className="form-group">
            <div className="row">
                <label className="ml-5 mt-4 col-md-2">{label}</label>
                <div className="ml-4 mt-3 col-md-3">
                    <input
                        type={type ? type : 'text'}
                        disabled={isDisabled}
                        className="form-control"
                        name={name}
                        value={value}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
