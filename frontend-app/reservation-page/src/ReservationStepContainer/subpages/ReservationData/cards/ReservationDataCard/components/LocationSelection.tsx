import React from 'react';
import { SingleValue } from 'react-select/dist/declarations/src/types';
import { Control, FieldError, FieldPath, FieldValues, Merge, RegisterOptions } from 'react-hook-form/dist/types';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { LocalisationResponseDTO } from '@car-rental/shared/model';
import { ReactHookFormStorage } from '../../../../../../utils/StorageUtil';

interface LocationSelectionProps<FieldValuesType extends FieldValues> {
    allLocations: LocalisationResponseDTO[];
    inputName: FieldPath<FieldValuesType>;
    control: Control<FieldValuesType>;
    rules: Omit<
        RegisterOptions<FieldValuesType, FieldPath<FieldValuesType>>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    reservationStorage?: ReactHookFormStorage<FieldValuesType>;
    afterChange?: () => void;
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
    inputName,
    rules,
    control,
    error,
    reservationStorage,
    afterChange,
}: LocationSelectionProps<FieldValuesType>): JSX.Element {
    const options: LocationOptionType[] = allLocations.map((o: LocalisationResponseDTO) =>
        mapToLocationOptionType(`${o.id}`, `${o.city}, ${o.streetAndNb}`)
    );
    return (
        <div className="location-select-group">
            <label>Localisation:</label>
            <Controller
                name={inputName}
                control={control}
                rules={rules}
                render={({ field: { onChange, value } }) => (
                    <div className="select-row form-group">
                        <Select<LocationOptionType>
                            options={options}
                            value={options.filter((val: LocationOptionType) => {
                                return val.value == value;
                            })}
                            onChange={(val: SingleValue<LocationOptionType>) => {
                                const changedValue = val === null ? val : (val as LocationOptionType).value;
                                onChange(changedValue);
                                if (reservationStorage) {
                                    reservationStorage.replaceValueInStorage(inputName, changedValue);
                                }
                                if (afterChange) {
                                    afterChange();
                                }
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
