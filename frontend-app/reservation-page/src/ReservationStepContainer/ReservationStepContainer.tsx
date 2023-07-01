import React, { useEffect } from 'react';
import { Logo } from './components/Logo/Logo';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import {
    carSelectSubpageLink,
    confirmationSubpageLink,
    reservationDataSubpageLink,
    reservationRootLink,
} from '../constants/Links';
import { ReservationCarSelect } from './subpages/ReservationCarSelect/ReservationCarSelect';
import { StepsHeader } from './components/StepsHeader/StepsHeader';
import {
    AuthenticatedUserDTO,
    LocalisationsResponseDTO,
    LocalisationResponseDTO,
    VehicleResponseDTO,
} from '@car-rental/shared/model';
import { LocationService, VehicleService } from '@car-rental/shared/service';
import { useForm } from 'react-hook-form';
import { ReservationConfirmation } from './subpages/ReservationConfirmation/ReservationConfirmation';
import qs from 'qs';
import date from 'date-and-time';
import { PersonalDataCard } from './subpages/ReservationData/cards/PersonalDataCard/PersonalDataCard';
import { ReservationDataCard } from './subpages/ReservationData/cards/ReservationDataCard/ReservationDataCard';
import { reactHookFormStorage } from '../utils/StorageUtil';

type ReservationFormValues = {
    localisationId: string;
    receptionDate: string;
    returnDate: string;
    vehicleId: string;
};

export const getLocalisationIdFromUrl = (url: string): string | undefined => {
    return qs.parse(url, { ignoreQueryPrefix: true }).localisationId as string;
};

export const getVehicleIdFromUrl = (url: string): string | undefined => {
    return qs.parse(url, { ignoreQueryPrefix: true }).vehicleId as string;
};

export const getReceptionDateFromUrl = (url: string): string => {
    return qs.parse(url, { ignoreQueryPrefix: true }).receptionDate as string;
};

export const getReturnDateFromUrl = (url: string): string => {
    return qs.parse(url, { ignoreQueryPrefix: true }).returnDate as string;
};

interface ReservationStepContainerProps {
    authenticatedUser: AuthenticatedUserDTO;
}

export function ReservationStepContainer({ authenticatedUser }: ReservationStepContainerProps): JSX.Element {
    const [step, setStep] = React.useState<number>(1);
    const { formState, control, handleSubmit, watch, trigger, setValue } = useForm<ReservationFormValues>({
        mode: 'onChange',
    });
    const [localisations, setLocalisations] = React.useState<LocalisationResponseDTO[]>([]);
    const [vehicles, setVehicles] = React.useState<VehicleResponseDTO[]>([]);
    const location = useLocation();
    const selectedLocalisationId = watch('localisationId');

    React.useEffect(() => {
        LocationService.getAllLocationsList().then((localisations: LocalisationsResponseDTO) => {
            setLocalisations(localisations.locations);
        });
    }, []);

    React.useEffect(() => {
        if (selectedLocalisationId) {
            VehicleService.getAvailableVehiclesByLocation(selectedLocalisationId).then((v: VehicleResponseDTO[]) => {
                setVehicles(v);
            });
        }
    }, [selectedLocalisationId]);

    const reservationStorage = reactHookFormStorage<ReservationFormValues>(
        'reservationSessionStorage',
        setValue,
        watch
    );

    useEffect(() => {
        reservationStorage.setValuesInForm();
    }, [reservationStorage]);

    return (
        <div>
            <Logo />
            <StepsHeader step={step} />
            <Switch>
                <Route
                    exact
                    path={reservationRootLink}
                    render={() => {
                        const localisationIdFromUrl = getLocalisationIdFromUrl(location.search);
                        const vehicleIdFromUrl = getVehicleIdFromUrl(location.search);
                        const receptionDateFromUrl = getReceptionDateFromUrl(location.search);
                        const returnDateFromUrl = getReturnDateFromUrl(location.search);
                        if (localisationIdFromUrl) {
                            setValue('localisationId', localisationIdFromUrl);
                            reservationStorage.replaceValueInStorage('localisationId', localisationIdFromUrl);
                        }
                        if (vehicleIdFromUrl) {
                            setValue('vehicleId', vehicleIdFromUrl);
                            reservationStorage.replaceValueInStorage('vehicleId', vehicleIdFromUrl);
                        }
                        if (receptionDateFromUrl) {
                            setValue('receptionDate', date.format(new Date(receptionDateFromUrl), 'YYYY-MM-DD'));
                            reservationStorage.replaceValueInStorage(
                                'receptionDate',
                                date.format(new Date(receptionDateFromUrl), 'YYYY-MM-DD')
                            );
                        }
                        if (receptionDateFromUrl) {
                            setValue('returnDate', date.format(new Date(returnDateFromUrl), 'YYYY-MM-DD'));
                            reservationStorage.replaceValueInStorage(
                                'returnDate',
                                date.format(new Date(returnDateFromUrl), 'YYYY-MM-DD')
                            );
                        }
                        return <Redirect to={reservationDataSubpageLink} />;
                    }}
                />
                <Route
                    exact
                    path={reservationDataSubpageLink}
                    render={(): JSX.Element => {
                        setStep(1);
                        return (
                            <main>
                                <div id="reservation-data-container" className="container col-md-6 offset-md-3 my-5 ">
                                    <PersonalDataCard authenticatedUser={authenticatedUser} />
                                    <ReservationDataCard<ReservationFormValues>
                                        setValue={setValue}
                                        locationSelectName={'localisationId'}
                                        vehicleSelectName={'vehicleId'}
                                        control={control}
                                        localisationError={formState.errors.localisationId}
                                        receptionDateError={formState.errors.receptionDate}
                                        returnDateError={formState.errors.returnDate}
                                        receptionDateSelectName={'receptionDate'}
                                        returnDateSelectName={'returnDate'}
                                        onClickNext={handleSubmit}
                                        trigger={trigger}
                                        reservationStorage={reservationStorage}
                                        localisations={localisations}
                                    />
                                </div>
                            </main>
                        );
                    }}
                />
                <Route
                    exact
                    path={carSelectSubpageLink}
                    render={(): JSX.Element => {
                        setStep(2);
                        return (
                            <ReservationCarSelect<ReservationFormValues>
                                control={control}
                                vehicles={vehicles}
                                vehicleSelectName={'vehicleId'}
                                onClickNext={handleSubmit}
                                vehiclesError={formState.errors.vehicleId}
                                reservationStorage={reservationStorage}
                            />
                        );
                    }}
                />
                <Route
                    exact
                    path={confirmationSubpageLink}
                    render={(): JSX.Element => {
                        setStep(3);
                        return (
                            <ReservationConfirmation<ReservationFormValues>
                                authenticatedUser={authenticatedUser}
                                control={control}
                                vehicleSelectName={'vehicleId'}
                                receptionDateSelectName={'receptionDate'}
                                returnDateSelectName={'returnDate'}
                                locationSelectName={'localisationId'}
                                localisations={localisations}
                                vehicles={vehicles}
                                onClickReserve={handleSubmit}
                                reservationStorage={reservationStorage}
                            />
                        );
                    }}
                />
            </Switch>
        </div>
    );
}
