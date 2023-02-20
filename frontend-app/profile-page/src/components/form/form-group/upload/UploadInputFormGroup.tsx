import React from 'react';
import './UploadInputFormGroup.scss';
import { Control } from 'react-hook-form/dist/types/form';
import { FieldError, FieldPath, FieldValues } from 'react-hook-form/dist/types';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { Controller } from 'react-hook-form';
import { Dropzone, FileWithPreview } from './Dropzone';

interface FormGroupProperties<FieldValuesType extends FieldValues> {
    label: string;
    name: FieldPath<FieldValuesType>;
    control: Control<FieldValuesType>;
    rules?: Omit<
        RegisterOptions<FieldValuesType, FieldPath<FieldValuesType>>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    isDisabled?: boolean;
    error?: FieldError;
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
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
