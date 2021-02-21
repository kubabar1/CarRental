import React from 'react';
import { Logo } from './components/Logo/Logo';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
    carSelectSubpageLink,
    confirmationSubpageLink,
    reservationDataSubpageLink,
    reservationRootLink,
} from '../constants/Links';
import { ReservationData } from './subpages/ReservationData/ReservationData';
import { endpoints } from '../constants/PathsAPI';
import LocalisationResponseDTO from '../model/LocalisationResponseDTO';
import UserDataResponseDTO from '../model/UserDataResponseDTO';
import { currentUserDataResponseDTOMock, localisationResponseDTOMock } from '../constants/MockData';
import { ReservationCarSelect } from './subpages/ReservationCarSelect/ReservationCarSelect';
import { ReservationConfirmation } from './subpages/ReservationConfirmation/ReservationConfirmation';
import { StepsHeader } from './components/StepsHeader/StepsHeader';
import { ErrorCard } from './components/ErrorCard/ErrorCard';

interface ReservationStepContainerState {
    step: number;
    userData?: UserDataResponseDTO;
    localisations?: LocalisationResponseDTO[];
    selectedLocalisationId?: string;
    selectedReceptionDate?: Date;
    selectedReceptionHour?: string;
    selectedReturnDate?: Date;
    selectedReturnHour?: string;
    selectedVehicleId?: number;
    validationErrorMessage?: string;
}

export class ReservationStepContainer extends React.Component<Record<string, never>, ReservationStepContainerState> {
    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            step: 1,
        };
    }

    componentDidMount(): void {
        fetch(endpoints.localisationsEndpoint)
            .then((response: Response) => {
                response.json().then((localisations: LocalisationResponseDTO[]) => {
                    this.setState({ localisations: localisations });
                });
            })
            .finally(() => this.setState({ localisations: [localisationResponseDTOMock] })); // TODO: Remove
        fetch(endpoints.currentUserDataEndpoint)
            .then((response: Response) => {
                response.json().then((userData: UserDataResponseDTO) => {
                    this.setState({ userData: userData });
                });
            })
            .finally(() => this.setState({ userData: currentUserDataResponseDTOMock })); // TODO: Remove
    }

    setLocalisation = (selectedLocalisationId: string): void => {
        this.setState({ selectedLocalisationId: selectedLocalisationId });
    };

    setReceptionDate = (receptionDate: Date): void => {
        this.setState({ selectedReceptionDate: receptionDate });
    };

    setReceptionHour = (receptionHour: string): void => {
        this.setState({ selectedReceptionHour: receptionHour });
    };

    setReturnDate = (returnDate: Date): void => {
        this.setState({ selectedReturnDate: returnDate });
    };

    setReturnHour = (returnHour: string): void => {
        this.setState({ selectedReturnHour: returnHour });
    };

    setCar = (vehicleId: number): void => {
        this.setState({ selectedVehicleId: vehicleId });
    };

    setStep = (step: number): void => {
        this.setState({ step: step });
    };

    renderReservationDataSubpage = (): JSX.Element => {
        const {
            localisations,
            userData,
            selectedLocalisationId,
            selectedReceptionDate,
            selectedReceptionHour,
            selectedReturnDate,
            selectedReturnHour,
        } = this.state;
        return (
            <ReservationData
                localisations={localisations}
                userData={userData}
                selectedLocalisationId={selectedLocalisationId}
                selectedReceptionDate={selectedReceptionDate}
                selectedReceptionHour={selectedReceptionHour}
                selectedReturnDate={selectedReturnDate}
                selectedReturnHour={selectedReturnHour}
                setLocalisation={this.setLocalisation}
                setReceptionDate={this.setReceptionDate}
                setReceptionHour={this.setReceptionHour}
                setReturnDate={this.setReturnDate}
                setReturnHour={this.setReturnHour}
                setStep={this.setStep}
            />
        );
    };

    renderCarSelectSubpage = (): JSX.Element => {
        const {
            selectedLocalisationId,
            selectedReceptionDate,
            selectedReceptionHour,
            selectedReturnDate,
            selectedReturnHour,
            selectedVehicleId,
        } = this.state;
        return selectedLocalisationId &&
            selectedReceptionDate &&
            selectedReceptionHour &&
            selectedReturnDate &&
            selectedReturnHour ? (
            <ReservationCarSelect
                selectedLocalisationId={selectedLocalisationId}
                selectedVehicleId={selectedVehicleId}
                selectCar={this.setCar}
                setStep={this.setStep}
            />
        ) : (
            <ErrorCard message={'You need to provide proper data in previous step'} setStep={this.setStep} step={2} />
        );
    };

    renderConfirmationSubpage = (): JSX.Element => {
        const {
            userData,
            selectedLocalisationId,
            selectedVehicleId,
            selectedReceptionDate,
            selectedReceptionHour,
            selectedReturnDate,
            selectedReturnHour,
        } = this.state;
        return userData &&
            selectedLocalisationId &&
            selectedVehicleId &&
            selectedReceptionDate &&
            selectedReceptionHour &&
            selectedReturnDate &&
            selectedReturnHour ? (
            <ReservationConfirmation
                userData={userData}
                selectedCityId={selectedLocalisationId}
                selectedVehicleId={selectedVehicleId}
                setStep={this.setStep}
                selectedReceptionDate={selectedReceptionDate}
                selectedReceptionHour={selectedReceptionHour}
                selectedReturnDate={selectedReturnDate}
                selectedReturnHour={selectedReturnHour}
            />
        ) : (
            <ErrorCard message={'You need to provide proper data in previous steps'} setStep={this.setStep} step={3} />
        );
    };

    render(): JSX.Element {
        const { step } = this.state;
        return (
            <div>
                <Logo />
                <StepsHeader step={step} />
                <Switch>
                    <Route
                        exact
                        path={reservationRootLink}
                        render={() => <Redirect to={reservationDataSubpageLink} />}
                    />
                    <Route exact path={reservationDataSubpageLink} component={this.renderReservationDataSubpage} />
                    <Route exact path={carSelectSubpageLink} component={this.renderCarSelectSubpage} />
                    <Route exact path={confirmationSubpageLink} component={this.renderConfirmationSubpage} />
                </Switch>
            </div>
        );
    }
}
