import React from 'react';
import { DropEvent, DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone';
import { PathString, FieldPathValue, FieldValues } from 'react-hook-form';
import { vehicleImageFromServer } from '../../../../constants/PathsServer';

interface DropzoneProperties<FieldValuesType extends FieldValues> extends DropzoneOptions {
    onDrop?: (acceptedFiles: FileWithPreview[], fileRejections: FileRejection[], event: DropEvent) => void;
    file: FieldPathValue<FieldValuesType, PathString>;
    isDisabled?: boolean;
    multiple?: boolean;
}

export interface FileWithPreview extends File {
    objectUrlPreview?: string;
}

export function Dropzone<FieldValuesType extends FieldValues>({
    onDrop,
    file,
    isDisabled = false,
    ...rest
}: DropzoneProperties<FieldValuesType>): JSX.Element {
    const { getRootProps, getInputProps } = useDropzone({
        disabled: isDisabled,
        accept: {
            'image/*': [],
        },
        onDrop: onDrop,
        ...rest,
    });

    const renderThumb = (fileWithPreview: FileWithPreview): JSX.Element => {
        if (fileWithPreview && fileWithPreview.name && fileWithPreview.objectUrlPreview) {
            return (
                <div className="thumb" key={fileWithPreview.name}>
                    <div className="thumb-inner">
                        <img
                            src={fileWithPreview.objectUrlPreview}
                            onLoad={() => {
                                if (fileWithPreview.objectUrlPreview) {
                                    URL.revokeObjectURL(fileWithPreview.objectUrlPreview);
                                }
                            }}
                        />
                    </div>
                </div>
            );
        } else if (fileWithPreview && fileWithPreview.name) {
            return (
                <div className="thumb" key={fileWithPreview.name}>
                    <div className="thumb-inner">
                        <img src={vehicleImageFromServer(fileWithPreview.name)} />
                    </div>
                </div>
            );
        } else {
            return <div />;
        }
    };

    return (
        <section>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>{"Drag 'n' drop some files here, or click to select files"}</p>
            </div>
            <aside className="thumbs-container">{renderThumb(file)}</aside>
        </section>
    );
}
