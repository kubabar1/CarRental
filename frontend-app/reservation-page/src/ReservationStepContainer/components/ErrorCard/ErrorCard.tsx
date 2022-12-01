import React from 'react';

interface ErrorCardProperties {
    message?: string;
    step: number;
    setStep: (step: number) => void;
}

export function ErrorCard({ message, step, setStep }: ErrorCardProperties): JSX.Element {
    setStep(step);

    return (
        <div key="inputError" className="text-center container alert alert-danger my-4">
            {message}
        </div>
    );
}
