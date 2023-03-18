import React, { useState } from 'react';
import { LocationSelection } from './components/LocationSelection';
import './ReservationDataCard.scss';
import { Link, useHistory } from 'react-router-dom';
import date from 'date-and-time';
import LocalisationResponseDTO from '../../../../../model/LocalisationResponseDTO';
import { carSelectSubpageLink, reservationDataSubpageLink } from '../../../../../constants/Links';
import { endpoints } from '../../../../../constants/PathsAPI';
import { FieldValues, SubmitHandler, UseFormRegister, useWatch } from 'react-hook-form';
import { Control, FieldError, FieldPath, Merge } from 'react-hook-form/dist/types';
import { DateInput } from './components/DateInput';
import { UseFormHandleSubmit, UseFormTrigger } from 'react-hook-form/dist/types/form';
import { AuthenticatedUserDTO } from '../../../../../model/AuthenticatedUserDTO';
import { getAuthenticatedUserData } from '../../../../../service/AuthenticationService';
import { getAllLocationsList } from '../../../../../service/LocationService';
import { LocalisationsResponseDTO } from '../../../../../model/LocalisationsResponseDTO';

interface ReservationDataCardProperties<FieldValuesType extends FieldValues> {
    register: UseFormRegister<FieldValuesType>;
    locationSelectName: FieldPath<FieldValuesType>;
    control: Control<FieldValuesType>;
    localisationError: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    receptionDateError: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    returnDateError: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    receptionDateSelectName: FieldPath<FieldValuesType>;
    returnDateSelectName: FieldPath<FieldValuesType>;
    onClickNext: UseFormHandleSubmit<FieldValuesType>;
    trigger: UseFormTrigger<FieldValuesType>;
    clearReservationSessionStorage: () => void;
}

export function ReservationDataCard<FieldValuesType extends FieldValues>({
    locationSelectName,
    localisationError,
    receptionDateError,
    returnDateError,
    control,
    register,
    receptionDateSelectName,
    returnDateSelectName,
    onClickNext,
    clearReservationSessionStorage,
}: ReservationDataCardProperties<FieldValuesType>): JSX.Element {
    const [localisations, setLocalisations] = React.useState<LocalisationResponseDTO[]>([]);
    const receptionDate = useWatch({ name: receptionDateSelectName, control: control });
    const returnDate = useWatch({ name: returnDateSelectName, control: control });
    const minReceptionDate = date.format(new Date(), 'YYYY-MM-DD');
    const maxReceptionDate: string = returnDate
        ? date.format(date.addDays(new Date(returnDate), -1), 'YYYY-MM-DD')
        : '';
    const minReturnDate: string = receptionDate
        ? date.format(date.addDays(new Date(receptionDate), 1), 'YYYY-MM-DD')
        : '';
    const history = useHistory();

    const handleClickNext: SubmitHandler<FieldValuesType> = (): any | Promise<any> => {
        history.push(carSelectSubpageLink);
    };

    React.useEffect(() => {
        getAllLocationsList().then((localisations: LocalisationsResponseDTO) => {
            setLocalisations(localisations.locations);
        });
    }, []);

    return (
        <div id="reservation-data-card" className="shadow card mt-2">
            <div className="card-header text-center">
                <h2>{'Reservation data'}</h2>
            </div>
            <div className="card-body">
                <form onSubmit={onClickNext(handleClickNext)}>
                    <LocationSelection<FieldValuesType>
                        allLocations={localisations}
                        inputName={locationSelectName}
                        rules={{ required: 'Location is required' }}
                        error={localisationError}
                        control={control}
                    />
                    <DateInput<FieldValuesType>
                        label={'Reception date:'}
                        inputName={receptionDateSelectName}
                        min={minReceptionDate}
                        max={maxReceptionDate}
                        inputRegisterOptions={{
                            required: 'Reception date is required',
                            min: { value: minReceptionDate, message: 'Incorrect reception date' },
                            max: { value: maxReceptionDate, message: 'Incorrect reception date' },
                        }}
                        inputError={receptionDateError}
                        register={register}
                    />
                    <DateInput<FieldValuesType>
                        label={'Return date:'}
                        inputName={returnDateSelectName}
                        min={minReturnDate}
                        inputRegisterOptions={{
                            required: 'Return date is required',
                            min: { value: minReturnDate, message: 'Incorrect return date' },
                        }}
                        inputError={returnDateError}
                        register={register}
                    />
                    <div className="row">
                        <a
                            href={endpoints.homeEndpoint}
                            className="linkstyle btn btn-lg btn-secondary btn-block col-md-3 ml-5"
                            onClick={() => {
                                clearReservationSessionStorage();
                            }}
                        >
                            Cancel
                        </a>
                        <input
                            type="submit"
                            value="Next"
                            className="next-button btn btn-lg btn-primary btn-block col-md-3 ml-auto mr-5 mt-0"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
