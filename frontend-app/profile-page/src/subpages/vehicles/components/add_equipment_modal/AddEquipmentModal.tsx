import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './AddEquipmentModal.scss';
import { InputFormGroup } from '../../../../components/form/form-group/input/InputFormGroup';
import { VehicleService } from '@car-rental/shared/service';
import { EquipmentAddDTO } from '@car-rental/shared/model';

type Equipment = {
    equipmentCode: string;
    description: string;
};

interface AddEquipmentModalProperties {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    reloadEquipments: (pageIndex?: number, pageSize?: number, filter?: string, sortBy?: string, desc?: boolean) => void;
}

export function AddEquipmentModal({ isOpen, setIsOpen, reloadEquipments }: AddEquipmentModalProperties): JSX.Element {
    const { register, formState, clearErrors, handleSubmit, setValue } = useForm<Equipment>({
        mode: 'onChange',
        defaultValues: {
            equipmentCode: '',
            description: '',
        },
    });

    const addEqp = (value: Equipment) => {
        VehicleService.addEquipment(new EquipmentAddDTO(value.equipmentCode, value.description)).then(() => {
            setValue('equipmentCode', '');
            setValue('description', '');
            setIsOpen(false);
            reloadEquipments();
        });
    };

    const onClose = () => {
        setIsOpen(false);
        clearErrors();
        setValue('equipmentCode', '');
        setValue('description', '');
    };

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'add-option-modal'}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">{'Add equipment'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputFormGroup<Equipment>
                    label={'Code:'}
                    name={'equipmentCode'}
                    register={register}
                    registerOptions={{
                        required: 'Equipment code is required',
                        maxLength: { value: 3, message: 'Equipment code cannot be longer than 3' },
                    }}
                    error={formState.errors.equipmentCode}
                />
                <InputFormGroup<Equipment>
                    label={'Description:'}
                    name={'description'}
                    register={register}
                    registerOptions={{
                        required: 'Equipment description is required',
                        maxLength: { value: 50, message: 'Equipment description cannot be longer than 50' },
                    }}
                    error={formState.errors.description}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={!formState.isValid}
                    type="submit"
                    variant={'outline-primary'}
                    onClick={handleSubmit(addEqp)}
                >
                    Add
                </Button>
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
