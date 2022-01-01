import React, { FormEvent, FormEventHandler } from 'react';

interface FormContainerProperties {
    onSubmit: FormEventHandler<HTMLFormElement>;
    children?: React.ReactNode;
}

export function FormContainer({ children, onSubmit }: FormContainerProperties): JSX.Element {
    return (
        <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                onSubmit(event);
            }}
        >
            {children}
            <div className="ml-4 my-4 text-center">
                <input type="submit" value="Update" className="btn btn-primary" />
            </div>
        </form>
    );
}
