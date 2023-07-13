import React from 'react';
import { LocationSelection } from './components/LocationSelection';
import './ReservationDataCard.scss';
import { useHistory } from 'react-router-dom';
import date from 'date-and-time';
import { LocalisationResponseDTO } from '@car-rental/shared/model';
import { carSelectSubpageLink } from '../../../../../constants/Links';
import { endpoints } from '../../../../../constants/PathsAPI';
import { Auto, FieldValues, PathString, SubmitHandler, useWatch } from 'react-hook-form';
import { Control, FieldError } from 'react-hook-form/dist/types';
import { DateInput } from './components/DateInput';
import { UseFormHandleSubmit, UseFormSetValue, UseFormTrigger } from 'react-hook-form/dist/types/form';
import { ReactHookFormStorage } from '../../../../../utils/StorageUtil';
import { FieldPathSetValue } from 'react-hook-form/dist/types/path';
import { TranslationService } from '@car-rental/shared/service';

interface ReservationDataCardProperties<FieldValuesType extends FieldValues> {
    setValue: UseFormSetValue<FieldValuesType>;
    locationSelectName: Auto.FieldPath<FieldValuesType, PathString>;
    vehicleSelectName: Auto.FieldPath<FieldValuesType, PathString>;
    control: Control<FieldValuesType>;
    localisationError: FieldError | undefined;
    receptionDateError: FieldError | undefined;
    returnDateError: FieldError | undefined;
    receptionDateSelectName: Auto.FieldPath<FieldValuesType, PathString>;
    returnDateSelectName: Auto.FieldPath<FieldValuesType, PathString>;
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
                <h2>{TranslationService.translate('reservationDataCardHeader')}</h2>
            </div>
            <div className="card-body">
                <form onSubmit={onClickNext(handleClickNext)}>
                    <LocationSelection<FieldValuesType>
                        allLocations={localisations}
                        inputName={locationSelectName}
                        rules={{ required: TranslationService.translate('localizationSelectionRequired') }}
                        error={localisationError}
                        control={control}
                        reservationStorage={reservationStorage}
                        afterChange={() => {
                            setValue(vehicleSelectName, '' as FieldPathSetValue<FieldValuesType, PathString>);
                            reservationStorage.removeValueFromStorage(vehicleSelectName);
                        }}
                    />
                    <DateInput<FieldValuesType>
                        label={TranslationService.translate('receptionDateSelectLabel')}
                        inputName={receptionDateSelectName}
                        min={minReceptionDate}
                        max={maxReceptionDate}
                        inputRegisterOptions={{
                            required: TranslationService.translate('receptionDateSelectRequired'),
                            min: {
                                value: minReceptionDate,
                                message: TranslationService.translate('receptionDateSelectMin'),
                            },
                            max: {
                                value: maxReceptionDate,
                                message: TranslationService.translate('receptionDateSelectMax'),
                            },
                        }}
                        inputError={receptionDateError}
                        control={control}
                        reservationStorage={reservationStorage}
                    />
                    <DateInput<FieldValuesType>
                        label={TranslationService.translate('returnDateSelectLabel')}
                        inputName={returnDateSelectName}
                        min={minReturnDate}
                        inputRegisterOptions={{
                            required: TranslationService.translate('returnDateSelectRequired'),
                            min: {
                                value: minReturnDate,
                                message: TranslationService.translate('returnDateSelectMinLen'),
                            },
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
                            {TranslationService.translate('reservationDataCancelButton')}
                        </a>
                        <input
                            type="submit"
                            value={TranslationService.translate('reservationDataNextButton')}
                            className="next-button btn btn-lg btn-primary btn-block col-md-3 ml-auto mr-5 mt-0"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
