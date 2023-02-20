import React from 'react';
import { InputFormGroup } from '../../../../../components/form/form-group/input/InputFormGroup';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import './AddOptionModal.scss';
import { OptionDTO } from '../../../../../model/OptionDTO';
import { ResponseData } from '../../../../../service/FetchUtil';

type Option = {
    value: string;
};

interface AddOptionModalProperties<FieldValuesType extends FieldValues> {
    headerTitle: string;
    optionLabel: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSubmit: (value: string) => void;
    loadVehicleOptions: () => void;
}

export function AddOptionModal<FieldValuesType extends FieldValues>({
    headerTitle,
    optionLabel,
    isOpen,
    setIsOpen,
    onSubmit,
}: AddOptionModalProperties<Option>): JSX.Element {
    const { register, formState, handleSubmit, setValue } = useForm<Option>({
        mode: 'onChange',
        defaultValues: {
            value: '',
        },
    });

    const addOption = (value: Option) => {
        onSubmit(value.value);
        setValue('value', '');
    };

    return (
        <Modal
            show={isOpen}
            onHide={() => setIsOpen(false)}
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
                    registerOptions={{ required: 'Field cannot be empty' }}
                    error={formState.errors.value}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" variant={'outline-primary'} onClick={handleSubmit(addOption)}>
                    Add
                </Button>
                <Button onClick={() => setIsOpen(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
