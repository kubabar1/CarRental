import React from 'react';

interface StepsHeaderProperties {
    step: number;
}

export function StepsHeader(props: StepsHeaderProperties): JSX.Element {
    const activePageClassBg = 'bg-primary';
    const donePageClassBg = 'bg-secondary';
    const activePageClassText = 'text-white';

    return (
        <div className="container my-5">
            <div className="card-deck">
                <div
                    className={
                        'card mx-4 ' + (props.step === 1 ? activePageClassBg : props.step > 1 ? donePageClassBg : '')
                    }
                >
                    <div className="card-body text-center">
                        <h3 className={'card-text ' + (props.step === 1 ? activePageClassText : '')}>Data</h3>
                    </div>
                </div>
                <div
                    className={
                        'card mx-4 ' + (props.step === 2 ? activePageClassBg : props.step > 2 ? donePageClassBg : '')
                    }
                >
                    <div className="card-body text-center">
                        <h3 className={'card-text ' + (props.step === 2 ? activePageClassText : '')}>Select car</h3>
                    </div>
                </div>
                <div
                    className={
                        'card mx-4 ' + (props.step === 3 ? activePageClassBg : props.step > 3 ? donePageClassBg : '')
                    }
                >
                    <div className="card-body text-center">
                        <h3 className={'card-text ' + (props.step === 3 ? activePageClassText : '')}>Confirm</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
