import React from 'react';
import { EquipmentResponseDTO } from '@car-rental/shared/model';
import './VehicleEquipment.scss';
import { TranslationService } from '@car-rental/shared/service';

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
                <h3 className="mt-2 ml-3 mb-4">{TranslationService.translate('equipmentsHeader')}</h3>
                <ul>{equipments.map(renderEquipmentRow)}</ul>
            </div>
        </section>
    );
}
