import React from 'react';
import './StepsHeader.scss';
import { TranslationService } from '@car-rental/shared/service';

interface StepsHeaderProperties {
    step: number;
}

export function StepsHeader(props: StepsHeaderProperties): JSX.Element {
    const activePageClassBg = 'active-step';
    const donePageClassBg = 'done-step';
    const activePageClassText = 'text-white';

    return (
        <div className="container my-5 step-container">
            <div className="card-deck">
                <div
                    className={
                        'card mx-4 ' + (props.step === 1 ? activePageClassBg : props.step > 1 ? donePageClassBg : '')
                    }
                >
                    <div className="card-body text-center">
                        <h3 className={'card-text ' + (props.step === 1 ? activePageClassText : '')}>
                            {TranslationService.translate('dataStepHeader')}
                        </h3>
                    </div>
                </div>
                <div
                    className={
                        'card mx-4 ' + (props.step === 2 ? activePageClassBg : props.step > 2 ? donePageClassBg : '')
                    }
                >
                    <div className="card-body text-center">
                        <h3 className={'card-text ' + (props.step === 2 ? activePageClassText : '')}>
                            {TranslationService.translate('selectCarStepHeader')}
                        </h3>
                    </div>
                </div>
                <div
                    className={
                        'card mx-4 ' + (props.step === 3 ? activePageClassBg : props.step > 3 ? donePageClassBg : '')
                    }
                >
                    <div className="card-body text-center">
                        <h3 className={'card-text ' + (props.step === 3 ? activePageClassText : '')}>
                            {TranslationService.translate('confirmStepHeader')}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
