import React from 'react';

interface ErrorCardProperties {
    message?: string;
    step: number;
    setStep: (step: number) => void;
}

export class ErrorCard extends React.Component<ErrorCardProperties> {
    constructor(props: ErrorCardProperties) {
        super(props);
    }

    componentDidMount(): void {
        this.props.setStep(this.props.step);
    }

    render(): JSX.Element {
        return (
            <div key="inputError" className="text-center container alert alert-danger my-4">
                {this.props.message}
            </div>
        );
    }
}
