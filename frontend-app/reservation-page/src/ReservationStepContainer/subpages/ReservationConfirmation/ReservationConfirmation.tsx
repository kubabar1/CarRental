import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { carSelectSubpageLink } from '../../../constants/Links';
import { endpoints } from '../../../constants/PathsAPI';
import VehicleResponseDTO from '../../../model/VehicleResponseDTO';
import UserDataResponseDTO from '../../../model/UserDataResponseDTO';
import date from 'date-and-time';
import { localisationResponseDTOMock, vehicleResponseDTOMock } from '../../../constants/MockData';
import LocalisationResponseDTO from '../../../model/LocalisationResponseDTO';

interface ReservationConfirmationProperties {
    userData: UserDataResponseDTO;
    selectedCityId: string;
    selectedVehicleId: number;
    setStep: (step: number) => void;
    selectedReceptionDate: Date;
    selectedReceptionHour: string;
    selectedReturnDate: Date;
    selectedReturnHour: string;
}

export function ReservationConfirmation({
    userData,
    selectedCityId,
    selectedVehicleId,
    setStep,
    selectedReceptionDate,
    selectedReceptionHour,
    selectedReturnDate,
    selectedReturnHour,
}: ReservationConfirmationProperties): JSX.Element {
    const [fullCost] = React.useState<string | undefined>(undefined);
    const [selectedVehicle, setSelectedVehicle] = React.useState<VehicleResponseDTO | undefined>(undefined);
    const [selectedLocalisation, setSelectedLocalisation] = React.useState<LocalisationResponseDTO | undefined>(
        undefined
    );

    const { userName, userSurname, phone, email } = userData;
    setStep(3);

    useEffect(() => {
        fetch(endpoints.carByIdEndpoint(selectedVehicleId))
            .then((response: Response) => {
                response.json().then((vehicle: VehicleResponseDTO) => {
                    setSelectedVehicle(vehicle);
                });
            })
            .finally(() => {
                // TODO: Remove
                setSelectedVehicle(vehicleResponseDTOMock);
            });
        fetch(endpoints.localisationByIdEndpoint(selectedCityId))
            .then((response: Response) => {
                response.json().then((localisation: LocalisationResponseDTO) => {
                    setSelectedLocalisation(localisation);
                });
            })
            .finally(() => {
                // TODO: Remove
                setSelectedLocalisation(localisationResponseDTOMock);
            });
    }, [selectedCityId, selectedVehicleId]);

    const onClickNext = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        // fetch to add reservation eg. '/reservation/add' - it will return reservationId
        const reservationId = 'axd2awd4s1';
        window.location.href = endpoints.orderStatusById(reservationId);
    };

    const renderFormGroupItem = (label: string, value: string): JSX.Element => {
        return (
            <div className="form-group">
                <label>{label}</label>
                <strong>{value}</strong>
            </div>
        );
    };

    return (
        <main>
            <div id="reservation-data-container" className="container col-md-6 offset-md-3 my-5 ">
                <form>
                    <div className="shadow card">
                        <div className="card-header">
                            <h1>Confirm reservation</h1>
                        </div>
                        <div className="card-body">
                            {renderFormGroupItem('Name: ', userName)}
                            {renderFormGroupItem('Surname: ', userSurname)}
                            {renderFormGroupItem('Phone: ', phone)}
                            {renderFormGroupItem('E-mail: ', email)}
                            <hr />
                            {selectedLocalisation &&
                                renderFormGroupItem('City: ', selectedLocalisation.city.toString())}
                            {renderFormGroupItem('Reception date: ', date.format(selectedReceptionDate, 'YYYY-MM-DD'))}
                            {renderFormGroupItem('Reception hour: ', selectedReceptionHour.toString())}
                            {renderFormGroupItem('Return date: ', date.format(selectedReturnDate, 'YYYY-MM-DD'))}
                            {renderFormGroupItem('Return hour: ', selectedReturnHour.toString())}
                            {selectedVehicle &&
                                renderFormGroupItem(
                                    'Selected car: ',
                                    selectedVehicle.brand + ' ' + selectedVehicle.model
                                )}
                            {fullCost && renderFormGroupItem('Cost: ', fullCost.toString())}
                            <hr />
                            <div className="row mt-4">
                                <Link
                                    to={carSelectSubpageLink}
                                    className="linkstyle btn btn-lg btn-secondary btn-block col-md-2 ml-5"
                                >
                                    Back
                                </Link>
                                <button
                                    className="btn btn-lg btn-success btn-block  col-md-2 ml-auto mr-5"
                                    onClick={onClickNext}
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
