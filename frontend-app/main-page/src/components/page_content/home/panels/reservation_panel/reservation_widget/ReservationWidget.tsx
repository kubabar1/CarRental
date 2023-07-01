import React, { useEffect } from 'react';
import { LocationSelection } from './components/location_select/LocationSelection';
import './ReservationWidget.scss';
import { AuthenticatedUserDTO, LocalisationResponseDTO, LocalisationsResponseDTO } from '@car-rental/shared/model';
import { LocationService } from '@car-rental/shared/service';
import { useForm } from 'react-hook-form';
import { DateInput } from './components/date_input/DateInput';
import date from 'date-and-time';

interface ReservationWidgetProperties {
    authenticatedUser: AuthenticatedUserDTO | undefined;
}

type ReservationFormValues = {
    location: string;
    receptionDate: Date;
    receptionHour: number;
    returnDate: string;
    returnHour: number;
    notAuthenticated: boolean;
};

export function ReservationWidget({ authenticatedUser }: ReservationWidgetProperties): JSX.Element {
    const [allLocations, setAllLocations] = React.useState<LocalisationResponseDTO[]>([]);
    const {
        formState,
        control,
        handleSubmit,
        register,
        watch,
        setError,
        clearErrors,
        getValues,
    } = useForm<ReservationFormValues>({
        mode: 'onChange',
    });
    const returnDate = watch('returnDate');
    const receptionDate = watch('receptionDate');
    const minReceptionDate = date.format(new Date(), 'YYYY-MM-DD');
    const maxReceptionDate: string = returnDate
        ? date.format(date.addDays(new Date(returnDate), -1), 'YYYY-MM-DD')
        : '';
    const minReturnDate: string = receptionDate
        ? date.format(date.addDays(new Date(receptionDate), 1), 'YYYY-MM-DD')
        : '';

    useEffect(() => {
        LocationService.getAllLocationsList().then((locations: LocalisationsResponseDTO) => {
            setAllLocations(locations.locations);
        });
    }, []);

    const goToBookingCreationPage = (): void => {
        const isAuthenticated: boolean = !!authenticatedUser && authenticatedUser.authenticated;
        if (!isAuthenticated) {
            setError('notAuthenticated', { message: 'You need to authenticate to make a reservation' });
        } else {
            clearErrors('notAuthenticated');
            window.location.replace(
                `http://localhost:3030/reservation?localisationId=${getValues(
                    'location'
                )}&receptionDate=${receptionDate}&returnDate=${returnDate}`
            );
        }
    };

    const renderAuthError = (): boolean | JSX.Element => {
        return (
            !!formState.errors.notAuthenticated && (
                <div className="alert alert-danger custom-alert" role="alert">
                    {'You must be authenticated to make a reservation.'}
                </div>
            )
        );
    };

    return (
        <div className="car-rent-form-container container col-xl-3 col-lg-4 col-md-5 col-sm-7 card card-body shadow mr-3">
            <form onSubmit={handleSubmit(goToBookingCreationPage)}>
                <h3>Reserve car</h3>
                <LocationSelection<ReservationFormValues>
                    allLocations={allLocations}
                    name={'location'}
                    control={control}
                    rules={{ required: 'Location is required' }}
                    error={formState.errors.location}
                />
                <DateInput<ReservationFormValues>
                    label={'Reception date:'}
                    dateInputName={'receptionDate'}
                    register={register}
                    dateInputRegisterOptions={{
                        required: 'Reception date is required',
                        min: { value: minReceptionDate, message: 'Incorrect reception date' },
                        max: { value: maxReceptionDate, message: 'Incorrect reception date' },
                    }}
                    dateInputError={formState.errors.receptionDate?.message}
                    minDate={minReceptionDate}
                    maxDate={maxReceptionDate}
                />
                <DateInput<ReservationFormValues>
                    label={'Return date:'}
                    dateInputName={'returnDate'}
                    register={register}
                    dateInputRegisterOptions={{
                        required: 'Return date is required',
                        min: { value: minReturnDate, message: 'Incorrect return date' },
                    }}
                    dateInputError={formState.errors.returnDate?.message}
                    minDate={minReturnDate}
                />
                {renderAuthError()}
                <input type="submit" value="Reserve" className="btn btn-primary reserve-widget-submit-button" />
            </form>
        </div>
    );
}
