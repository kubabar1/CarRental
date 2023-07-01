import React from 'react';
import { InputFormGroup } from '../../../../../components/form/form-group/input/InputFormGroup';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './AddOptionModal.scss';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

type Option = {
    value: string;
};

interface AddOptionModalProperties {
    headerTitle: string;
    optionLabel: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSubmit: (value: string) => void;
    loadVehicleOptions: () => void;
    registerOptions?: RegisterOptions;
}

export function AddOptionModal({
    headerTitle,
    optionLabel,
    isOpen,
    setIsOpen,
    onSubmit,
    registerOptions,
}: AddOptionModalProperties): JSX.Element {
    const { register, formState, clearErrors, handleSubmit, setValue } = useForm<Option>({
        mode: 'onChange',
        defaultValues: {
            value: '',
        },
    });

    const addOption = (value: Option) => {
        onSubmit(value.value);
        setValue('value', '');
    };

    const onClose = () => {
        setIsOpen(false);
        clearErrors('value');
        setValue('value', '');
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
                <Modal.Title id="contained-modal-title-vcenter">{headerTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputFormGroup<Option>
                    label={optionLabel}
                    name={'value'}
                    register={register}
                    registerOptions={registerOptions}
                    error={formState.errors.value}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={!formState.isValid}
                    type="submit"
                    variant={'outline-primary'}
                    onClick={handleSubmit(addOption)}
                >
                    Add
                </Button>
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
