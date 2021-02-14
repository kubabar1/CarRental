import React from 'react';
import {Logo} from "./components/Logo/Logo";
import {StepsHeader} from "./components/StepsHeader/StepsHeader";

interface ReservationStepContainerProperties {}

interface ReservationStepContainerState {
    step: number;
}

export class ReservationStepContainer extends React.Component<
    ReservationStepContainerProperties,
    ReservationStepContainerState
> {
    constructor(props: ReservationStepContainerProperties) {
        super(props);
        this.state = {
            step: 1,
        };
    }

    render(): JSX.Element {
        const { step } = this.state;
        return (
            <div>
                <Logo />
                <StepsHeader step={step} />
            </div>
        );
    }
}
