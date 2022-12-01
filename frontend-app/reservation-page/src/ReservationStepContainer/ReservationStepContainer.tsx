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

export function ReservationStepContainer(): JSX.Element {
    const [step, setStep] = React.useState<number>(1);
    const [userData, setUserData] = React.useState<UserDataResponseDTO | undefined>(undefined);
    const [localisations, setLocalisations] = React.useState<LocalisationResponseDTO[] | undefined>(undefined);
    const [selectedLocalisationId, setSelectedLocalisationId] = React.useState<string | undefined>(undefined);
    const [selectedReceptionDate, setSelectedReceptionDate] = React.useState<Date | undefined>(undefined);
    const [selectedReceptionHour, setSelectedReceptionHour] = React.useState<string | undefined>(undefined);
    const [selectedReturnDate, setSelectedReturnDate] = React.useState<Date | undefined>(undefined);
    const [selectedReturnHour, setSelectedReturnHour] = React.useState<string | undefined>(undefined);
    const [selectedVehicleId, setSelectedVehicleId] = React.useState<number | undefined>(undefined);

    React.useEffect(() => {
        fetch(endpoints.localisationsEndpoint)
            .then((response: Response) => {
                response.json().then((localisations: LocalisationResponseDTO[]) => {
                    setLocalisations(localisations);
                });
            })
            .finally(() => setLocalisations([localisationResponseDTOMock])); // TODO: Remove
        fetch(endpoints.currentUserDataEndpoint)
            .then((response: Response) => {
                response.json().then((userData: UserDataResponseDTO) => {
                    setUserData(userData);
                });
            })
            .finally(() => setUserData(currentUserDataResponseDTOMock)); // TODO: Remove
    }, []);

    const renderReservationDataSubpage = (): JSX.Element => {
        return (
            <ReservationData
                localisations={localisations}
                userData={userData}
                selectedLocalisationId={selectedLocalisationId}
                selectedReceptionDate={selectedReceptionDate}
                selectedReceptionHour={selectedReceptionHour}
                selectedReturnDate={selectedReturnDate}
                selectedReturnHour={selectedReturnHour}
                setLocalisation={setSelectedLocalisationId}
                setReceptionDate={setSelectedReceptionDate}
                setReceptionHour={setSelectedReceptionHour}
                setReturnDate={setSelectedReturnDate}
                setReturnHour={setSelectedReturnHour}
                setStep={setStep}
            />
        );
    };

    const renderCarSelectSubpage = (): JSX.Element => {
        return selectedLocalisationId &&
            selectedReceptionDate &&
            selectedReceptionHour &&
            selectedReturnDate &&
            selectedReturnHour ? (
            <ReservationCarSelect
                selectedLocalisationId={selectedLocalisationId}
                selectedVehicleId={selectedVehicleId}
                selectCar={setSelectedVehicleId}
                setStep={setStep}
            />
        ) : (
            <ErrorCard message={'You need to provide proper data in previous step'} setStep={setStep} step={2} />
        );
    };

    const renderConfirmationSubpage = (): JSX.Element => {
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
                setStep={setStep}
                selectedReceptionDate={selectedReceptionDate}
                selectedReceptionHour={selectedReceptionHour}
                selectedReturnDate={selectedReturnDate}
                selectedReturnHour={selectedReturnHour}
            />
        ) : (
            <ErrorCard message={'You need to provide proper data in previous steps'} setStep={setStep} step={3} />
        );
    };

    return (
        <div>
            <Logo />
            <StepsHeader step={step} />
            <Switch>
                <Route exact path={reservationRootLink} render={() => <Redirect to={reservationDataSubpageLink} />} />
                <Route exact path={reservationDataSubpageLink} component={renderReservationDataSubpage} />
                <Route exact path={carSelectSubpageLink} component={renderCarSelectSubpage} />
                <Route exact path={confirmationSubpageLink} component={renderConfirmationSubpage} />
            </Switch>
        </div>
    );
}
