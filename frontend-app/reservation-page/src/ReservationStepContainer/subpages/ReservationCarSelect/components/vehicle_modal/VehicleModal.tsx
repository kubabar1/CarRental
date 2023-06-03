import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import './VehicleModal.scss';
import { VehicleResponseDTO } from '../../../../../model/VehicleResponseDTO';
import { VehicleDetailsHeader } from './components/vehicle_details_header/VehicleDetailsHeader';
import { VehicleProperties } from './components/details_list/VehicleProperties';
import { VehicleEquipment } from './components/vehicle_equipment/VehicleEquipment';

interface AddEquipmentModalProperties {
    isOpen: boolean;
    closeModal: () => void;
    selectedVehicleModalDetails: VehicleResponseDTO;
}

export function VehicleModal({
    isOpen,
    closeModal,
    selectedVehicleModalDetails,
}: AddEquipmentModalProperties): JSX.Element {
    const onClose = () => {
        closeModal();
    };

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'vehicle-details-modal'}
        >
            <Modal.Header>
                <Modal.Title>{'Vehicle details'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <VehicleDetailsHeader vehicle={selectedVehicleModalDetails} />
                    <hr className="mt-5" />
                    <VehicleProperties vehicle={selectedVehicleModalDetails} />
                    <hr className="mt-5" />
                    <VehicleEquipment equipments={selectedVehicleModalDetails.equipments} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}