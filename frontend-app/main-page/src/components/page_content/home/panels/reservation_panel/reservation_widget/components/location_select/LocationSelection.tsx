import React from 'react';
import { SingleValue } from 'react-select/dist/declarations/src/types';
import { Control, FieldError, FieldPath, FieldValues, Merge, RegisterOptions } from 'react-hook-form/dist/types';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import LocalisationResponseDTO from '../../../../../../../../model/LocalisationResponseDTO';
import './LocationSelection.scss';

interface CitySelectionProps<FieldValuesType extends FieldValues> {
    allLocations: LocalisationResponseDTO[];
    name: FieldPath<FieldValuesType>;
    control: Control<FieldValuesType>;
    rules: Omit<
        RegisterOptions<FieldValuesType, FieldPath<FieldValuesType>>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}

export type LocationOptionType = { value: number; label: string };

export const mapToLocationOptionType = (val: number, label: string): LocationOptionType => {
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
