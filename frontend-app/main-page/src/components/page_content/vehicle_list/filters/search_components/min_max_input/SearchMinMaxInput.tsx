import React, { ChangeEvent } from 'react';
import './SearchMinMaxInput.scss';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface SearchMinMaxInputProperties {
    label: string;
    labelMin?: string;
    labelMax?: string;
    minValue: string | undefined;
    maxValue: string | undefined;
    setMinValue: (value: string | undefined) => void;
    setMaxValue: (value: string | undefined) => void;
}

export function SearchMinMaxInput({
    label,
    labelMin,
    labelMax,
    minValue,
    maxValue,
    setMinValue,
    setMaxValue,
}: SearchMinMaxInputProperties): JSX.Element {
    return (
        <div className="search-min-max-input-container">
            <label>{label}</label>
            <div className="search-min-max-input-groups-container row">
                <InputGroup className="search-min-max-input-group col-xl-6 col-lg-12">
                    {!!labelMin && <InputGroup.Text>{labelMin}</InputGroup.Text>}
                    <Form.Control
                        aria-label={labelMin}
                        type="number"
                        value={minValue}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setMinValue(event.target.value);
                        }}
                    />
                </InputGroup>
                <InputGroup className="search-min-max-input-group col-xl-6 col-lg-12">
                    {!!labelMax && <InputGroup.Text>{labelMax}</InputGroup.Text>}
                    <Form.Control
                        aria-label={labelMax}
                        type="number"
                        value={maxValue}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setMaxValue(event.target.value);
                        }}
                    />
                </InputGroup>
            </div>
        </div>
    );
}
