import React from 'react';
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
import { AuthenticatedUserDTO } from '../model/AuthenticatedUserDTO';
import { useForm } from 'react-hook-form';
import { ReservationConfirmation } from './subpages/ReservationConfirmation/ReservationConfirmation';
import useFormPersist from 'react-hook-form-persist';
import qs from 'qs';
import date from 'date-and-time';
import { PersonalDataCard } from './subpages/ReservationData/cards/PersonalDataCard/PersonalDataCard';
import { ReservationDataCard } from './subpages/ReservationData/cards/ReservationDataCard/ReservationDataCard';

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
    const [modalVehicleDetailsId, setModalVehicleDetailsId] = React.useState<string | undefined>(undefined);
    const { formState, control, handleSubmit, register, watch, trigger, setValue } = useForm<ReservationFormValues>({
        mode: 'onChange',
    });
    const location = useLocation();

    const reservationSessionStorage = useFormPersist('reservationSessionStorage', {
        watch,
        setValue,
        storage: window.sessionStorage,
    });

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
                        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
                        console.log(localisationIdFromUrl);
                        console.log(vehicleIdFromUrl);
                        if (localisationIdFromUrl) {
                            setValue('localisationId', localisationIdFromUrl);
                        }
                        if (vehicleIdFromUrl) {
                            setValue('vehicleId', vehicleIdFromUrl);
                        }
                        if (receptionDateFromUrl) {
                            setValue('receptionDate', date.format(new Date(receptionDateFromUrl), 'YYYY-MM-DD'));
                        }
                        if (receptionDateFromUrl) {
                            setValue('returnDate', date.format(new Date(returnDateFromUrl), 'YYYY-MM-DD'));
                        }
                        return <Redirect to={reservationDataSubpageLink} />;
                    }}
                />
                <Route
                    exact
                    path={reservationDataSubpageLink}
                    component={(): JSX.Element => {
                        setStep(1);
                        return (
                            <main>
                                <div id="reservation-data-container" className="container col-md-6 offset-md-3 my-5 ">
                                    <PersonalDataCard authenticatedUser={authenticatedUser} />
                                    <ReservationDataCard<ReservationFormValues>
                                        register={register}
                                        locationSelectName={'localisationId'}
                                        control={control}
                                        localisationError={formState.errors.localisationId}
                                        receptionDateError={formState.errors.receptionDate}
                                        returnDateError={formState.errors.returnDate}
                                        receptionDateSelectName={'receptionDate'}
                                        returnDateSelectName={'returnDate'}
                                        onClickNext={handleSubmit}
                                        trigger={trigger}
                                        clearReservationSessionStorage={reservationSessionStorage.clear}
                                    />
                                </div>
                            </main>
                        );
                    }}
                />
                <Route
                    exact
                    path={carSelectSubpageLink}
                    component={(): JSX.Element => {
                        setStep(2);
                        return (
                            <ReservationCarSelect<ReservationFormValues>
                                control={control}
                                vehicleSelectName={'vehicleId'}
                                locationSelectName={'localisationId'}
                                onClickNext={handleSubmit}
                                vehiclesError={formState.errors.vehicleId}
                                modalVehicleDetailsId={modalVehicleDetailsId}
                                setModalVehicleDetailsId={setModalVehicleDetailsId}
                            />
                        );
                    }}
                />
                <Route
                    exact
                    path={confirmationSubpageLink}
                    component={(): JSX.Element => {
                        setStep(3);
                        return (
                            <ReservationConfirmation<ReservationFormValues>
                                authenticatedUser={authenticatedUser}
                                control={control}
                                vehicleSelectName={'vehicleId'}
                                receptionDateSelectName={'receptionDate'}
                                returnDateSelectName={'returnDate'}
                                locationSelectName={'localisationId'}
                                clearReservationSessionStorage={reservationSessionStorage.clear}
                                onClickReserve={handleSubmit}
                            />
                        );
                    }}
                />
            </Switch>
        </div>
    );
}
