import React from 'react';
import { EquipmentResponseDTO } from '../../../../../model/EquipmentResponseDTO';
import './VehicleEquipment.scss';

interface VehicleEquipmentProps {
    equipments: EquipmentResponseDTO[];
}

export function VehicleEquipment({ equipments }: VehicleEquipmentProps): JSX.Element {
    const renderEquipmentRow = (eqp: EquipmentResponseDTO): React.ReactNode => {
        return <li key={eqp.equipmentCode}>{eqp.description}</li>;
    };

    return (
        <section className="vehicle-details-equipment-container">
            <div className="text-left">
                <h3 className="mt-2 ml-3 mb-4">Equipments</h3>
                <ul>{equipments.map(renderEquipmentRow)}</ul>
            </div>
        </section>
    );
}
