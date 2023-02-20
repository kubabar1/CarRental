import React, { FormEvent, FormEventHandler } from 'react';
import { Button } from 'react-bootstrap';

interface FormContainerProperties {
    onSubmit: FormEventHandler<HTMLFormElement>;
    isSubmitButtonDisabled?: boolean;
    submitButtonValue?: string;
    children?: React.ReactNode;
}

export function FormContainer({
    children,
    onSubmit,
    isSubmitButtonDisabled = false,
    submitButtonValue = 'Update',
}: FormContainerProperties): JSX.Element {
    return (
        <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                onSubmit(event);
            }}
            className="form-container"
        >
            {children}
            <div className="my-4 text-center">
                <Button type="submit" disabled={isSubmitButtonDisabled}>
                    {submitButtonValue}
                </Button>
            </div>
        </form>
    );
}
