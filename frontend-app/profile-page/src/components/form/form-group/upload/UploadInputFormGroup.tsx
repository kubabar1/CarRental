import React from 'react';
import './UploadInputFormGroup.scss';
import { Control } from 'react-hook-form/dist/types/form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { Auto, Controller, PathString, FieldValues, Message } from 'react-hook-form';
import { Dropzone, FileWithPreview } from './Dropzone';

interface FormGroupProperties<FieldValuesType extends FieldValues> {
    label: string;
    name: Auto.FieldPath<FieldValuesType, PathString>;
    control: Control<FieldValuesType>;
    rules?: Omit<
        RegisterOptions<FieldValuesType, PathString>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    isDisabled?: boolean;
    error?: Message;
}

export function UploadInputFormGroup<FieldValuesType extends FieldValues>({
    label,
    name,
    control,
    rules,
    isDisabled = false,
    error,
}: FormGroupProperties<FieldValuesType>): JSX.Element {
    return (
        <div className="form-group upload-input-form-group-container">
            <div className="row">
                <label className="ml-5 mt-4 col-md-2">{label}</label>
                <div className={'ml-4 mt-3 col-md-8'}>
                    <Controller
                        name={name}
                        control={control}
                        rules={rules}
                        render={({ field: { onChange, value } }) => (
                            <Dropzone
                                onDrop={(acceptedFiles: FileWithPreview[]) => {
                                    if (!!acceptedFiles && !!acceptedFiles.length) {
                                        acceptedFiles[0].objectUrlPreview = URL.createObjectURL(acceptedFiles[0]);
                                        return onChange(acceptedFiles[0]);
                                    }
                                }}
                                isDisabled={isDisabled}
                                file={value}
                            />
                        )}
                    />
                    {error && (
                        <div className="alert alert-danger custom-alert" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
