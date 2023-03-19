import React from 'react';
import { VehicleResponseDTO } from '../../../../../model/VehicleResponseDTO';
import { VehicleItem } from './vehicle_item/VehicleItem';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

interface VehicleSelectProperties<FieldValuesType extends FieldValues> {
    name: FieldPath<FieldValuesType>;
    control: Control<FieldValuesType>;
    vehicles: VehicleResponseDTO[];
    setModalVehicleDetailsId: (vehicleId: string | undefined) => void;
}

export function VehicleSelect<FieldValuesType extends FieldValues>({
    name,
    control,
    vehicles,
    setModalVehicleDetailsId,
}: VehicleSelectProperties<FieldValuesType>): JSX.Element {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: 'Vehicle need to be selected.' }}
            render={({ field: { onChange, value } }) => (
                <div className="select-row row">
                    {vehicles.map((vehicle: VehicleResponseDTO) => {
                        return (
                            <VehicleItem
                                key={vehicle.id}
                                vehicle={vehicle}
                                isSelected={vehicle.id == value}
                                onClick={() => {
                                    onChange(vehicle.id);
                                }}
                                setModalVehicleDetailsId={setModalVehicleDetailsId}
                            />
                        );
                    })}
                </div>
            )}
        />
    );
}
