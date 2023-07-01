import React from 'react';
import { Link } from 'react-router-dom';
import { carSelectSubpageLink } from '../../../constants/Links';
import {
    AuthenticatedUserDTO,
    BookingAddRequestDTO,
    LocalisationResponseDTO,
    VehicleResponseDTO,
} from '@car-rental/shared/model';
import { PersonalData } from './components/PersonalData';
import { Control, FieldPath, FieldValues, SubmitHandler, useWatch } from 'react-hook-form';
import { ReservationData } from './components/ReservationData';
import { SelectedVehicleData } from './components/SelectedVehicleData';
import './ReservationConfirmation.scss';
import { ReservationCost } from './components/ReservationCost';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { createBooking } from '@car-rental/shared/service';
import { homePath } from '../../../../../login-page/src/constants/Paths';
import { ReactHookFormStorage } from '../../../utils/StorageUtil';

interface ReservationConfirmationProperties<FieldValuesType extends FieldValues> {
    control: Control<FieldValuesType>;
    authenticatedUser: AuthenticatedUserDTO;
    vehicleSelectName: FieldPath<FieldValuesType>;
    receptionDateSelectName: FieldPath<FieldValuesType>;
    returnDateSelectName: FieldPath<FieldValuesType>;
    locationSelectName: FieldPath<FieldValuesType>;
    onClickReserve: UseFormHandleSubmit<FieldValuesType>;
    reservationStorage: ReactHookFormStorage<FieldValuesType>;
    localisations: LocalisationResponseDTO[];
    vehicles: VehicleResponseDTO[];
}

export function ReservationConfirmation<FieldValuesType extends FieldValues>({
    authenticatedUser,
    control,
    vehicleSelectName,
    receptionDateSelectName,
    returnDateSelectName,
    locationSelectName,
    onClickReserve,
    reservationStorage,
    localisations,
    vehicles,
}: ReservationConfirmationProperties<FieldValuesType>): JSX.Element {
    const selectedVehicleId = useWatch({ name: vehicleSelectName, control: control });
    const receptionDate = useWatch({ name: receptionDateSelectName, control: control });
    const returnDate = useWatch({ name: returnDateSelectName, control: control });
    const selectedLocalisationId = useWatch({ name: locationSelectName, control: control });
    const selectedLocation: LocalisationResponseDTO | undefined = localisations.find(
        (l) => l.id == selectedLocalisationId
    );
    const selectedVehicle: VehicleResponseDTO | undefined = vehicles.find((v) => v.id === selectedVehicleId);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFormSubmit: SubmitHandler<FieldValuesType> = (): any | Promise<any> => {
        createBooking(
            new BookingAddRequestDTO(selectedLocalisationId, selectedVehicleId, receptionDate, returnDate)
        ).then(() => {
            reservationStorage.clear();
            window.location.href = homePath;
        });
    };

    const renderFormGroupItem = (label: string, value: string): JSX.Element => {
        return (
            <div className="form-group">
                <label>{label}</label>
                <strong className="ml-2">{value}</strong>
            </div>
        );
    };

    return (
        <main>
            <div className="reservation-confirmation-container container col-md-6 offset-md-3 my-5 ">
                <form onSubmit={onClickReserve(handleFormSubmit)}>
                    <div className="shadow card">
                        <div className="card-header">
                            <h2 className="text-center">Confirm reservation</h2>
                        </div>
                        <div className="card-body">
                            <PersonalData
                                authenticatedUser={authenticatedUser}
                                renderFormGroupItem={renderFormGroupItem}
                            />
                            <SelectedVehicleData
                                renderFormGroupItem={renderFormGroupItem}
                                selectedVehicle={selectedVehicle}
                            />
                            <ReservationData
                                renderFormGroupItem={renderFormGroupItem}
                                selectedLocation={selectedLocation}
                                receptionDate={receptionDate}
                                returnDate={returnDate}
                            />
                            <ReservationCost
                                selectedVehicleId={selectedVehicleId}
                                receptionDate={receptionDate}
                                returnDate={returnDate}
                                renderFormGroupItem={renderFormGroupItem}
                            />
                            <div className="row mt-4">
                                <Link
                                    to={carSelectSubpageLink}
                                    className="linkstyle btn btn-lg btn-secondary btn-block col-md-2 ml-5"
                                >
                                    Back
                                </Link>
                                <button
                                    className="btn btn-lg btn-success btn-block  col-md-2 ml-auto mr-5 mt-0"
                                    type="submit"
                                >
                                    Rent car
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
