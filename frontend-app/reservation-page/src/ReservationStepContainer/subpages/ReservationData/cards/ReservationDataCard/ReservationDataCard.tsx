import React from 'react';
import { LocationSelection } from './components/LocationSelection';
import './ReservationDataCard.scss';
import { useHistory } from 'react-router-dom';
import date from 'date-and-time';
import { LocalisationResponseDTO } from '@car-rental/shared/model';
import { carSelectSubpageLink } from '../../../../../constants/Links';
import { endpoints } from '../../../../../constants/PathsAPI';
import { FieldValues, PathValue, SubmitHandler, useWatch } from 'react-hook-form';
import { Control, FieldError, FieldPath, Merge } from 'react-hook-form/dist/types';
import { DateInput } from './components/DateInput';
import { UseFormHandleSubmit, UseFormSetValue, UseFormTrigger } from 'react-hook-form/dist/types/form';
import { ReactHookFormStorage } from '../../../../../utils/StorageUtil';

interface ReservationDataCardProperties<FieldValuesType extends FieldValues> {
    setValue: UseFormSetValue<FieldValuesType>;
    locationSelectName: FieldPath<FieldValuesType>;
    vehicleSelectName: FieldPath<FieldValuesType>;
    control: Control<FieldValuesType>;
    localisationError: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    receptionDateError: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    returnDateError: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    receptionDateSelectName: FieldPath<FieldValuesType>;
    returnDateSelectName: FieldPath<FieldValuesType>;
    onClickNext: UseFormHandleSubmit<FieldValuesType>;
    trigger: UseFormTrigger<FieldValuesType>;
    reservationStorage: ReactHookFormStorage<FieldValuesType>;
    localisations: LocalisationResponseDTO[];
}

export function ReservationDataCard<FieldValuesType extends FieldValues>({
    locationSelectName,
    vehicleSelectName,
    localisationError,
    receptionDateError,
    returnDateError,
    control,
    setValue,
    receptionDateSelectName,
    returnDateSelectName,
    onClickNext,
    reservationStorage,
    localisations,
}: ReservationDataCardProperties<FieldValuesType>): JSX.Element {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickNext: SubmitHandler<FieldValuesType> = (): any | Promise<any> => {
        history.push(carSelectSubpageLink);
    };

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
                        reservationStorage={reservationStorage}
                        afterChange={() => {
                            setValue(vehicleSelectName, '' as PathValue<FieldValuesType, FieldPath<FieldValuesType>>);
                            reservationStorage.removeValueFromStorage(vehicleSelectName);
                        }}
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
                        control={control}
                        reservationStorage={reservationStorage}
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
                        control={control}
                        reservationStorage={reservationStorage}
                    />
                    <div className="row">
                        <a
                            href={endpoints.homeEndpoint}
                            className="linkstyle btn btn-lg btn-secondary btn-block col-md-3 ml-5"
                            onClick={() => {
                                reservationStorage.clear();
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
