import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './AddEquipmentModal.scss';
import { InputFormGroup } from '../../../../components/form/form-group/input/InputFormGroup';
import { TranslationService, VehicleService } from '@car-rental/shared/service';
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
                <Modal.Title id="contained-modal-title-vcenter">
                    {TranslationService.translate('addEquipmentModalTitle')}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputFormGroup<Equipment>
                    label={TranslationService.translate('addEquipmentModalInputCode')}
                    name={'equipmentCode'}
                    register={register}
                    registerOptions={{
                        required: TranslationService.translate('addEquipmentModalInputCodeRequired'),
                        maxLength: {
                            value: 3,
                            message: TranslationService.translate('addEquipmentModalInputCodeMaxLength'),
                        },
                    }}
                    error={formState.errors.equipmentCode}
                />
                <InputFormGroup<Equipment>
                    label={TranslationService.translate('addEquipmentModalInputDescription')}
                    name={'description'}
                    register={register}
                    registerOptions={{
                        required: TranslationService.translate('addEquipmentModalInputRequired'),
                        maxLength: {
                            value: 50,
                            message: TranslationService.translate('addEquipmentModalInputMaxLength'),
                        },
                    }}
                    error={formState.errors.description}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} variant={'outline-primary'}>
                    {TranslationService.translate('addEquipmentModalCloseButton')}
                </Button>
                <Button disabled={!formState.isValid} type="submit" onClick={handleSubmit(addEqp)}>
                    {TranslationService.translate('addEquipmentModalAddButton')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
