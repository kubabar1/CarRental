import React from 'react';
import { SingleValue } from 'react-select/dist/declarations/src/types';
import { Controller, Control, FieldValues, FieldError, RegisterOptions, Auto, PathString } from 'react-hook-form';
import Select from 'react-select';
import { LocalisationResponseDTO } from '@car-rental/shared/model';
import './LocationSelection.scss';

interface CitySelectionProps<FieldValuesType extends FieldValues> {
    allLocations: LocalisationResponseDTO[];
    name: Auto.FieldPath<FieldValuesType, PathString>;
    control: Control<FieldValuesType>;
    rules: Omit<
        RegisterOptions<FieldValuesType, PathString>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    error: FieldError | undefined;
}

export type LocationOptionType = { value: string; label: string };

export const mapToLocationOptionType = (val: string, label: string): LocationOptionType => {
    return {
        value: val,
        label: label,
    };
};

export function LocationSelection<FieldValuesType extends FieldValues>({
    allLocations,
    name,
    rules,
    control,
    error,
}: CitySelectionProps<FieldValuesType>): JSX.Element {
    const options: LocationOptionType[] = allLocations.map((o: LocalisationResponseDTO) =>
        mapToLocationOptionType(o.id, `${o.city}, ${o.streetAndNb}`)
    );
    return (
        <div className="location-select-group form-group">
            <label>City:</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange, value } }) => (
                    <div className="select-row">
                        <Select<LocationOptionType>
                            options={options}
                            value={options.filter((val: LocationOptionType) => {
                                return val.value === value;
                            })}
                            onChange={(val: SingleValue<LocationOptionType>) => {
                                onChange(val === null ? val : (val as LocationOptionType).value);
                            }}
                        />
                    </div>
                )}
            />
            {error && (
                <div className="alert alert-danger custom-alert" role="alert">
                    {error.message}
                </div>
            )}
        </div>
    );
}
