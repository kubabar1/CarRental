import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { CarItem } from './CarItem/CarItem';
import { endpoints } from '../../../constants/PathsAPI';
import { vehicleResponseDTOMock, vehicleResponseDTOMock2 } from '../../../constants/MockData';
import VehicleResponseDTO from '../../../model/VehicleResponseDTO';
import { confirmationSubpageLink, reservationDataSubpageLink } from '../../../constants/Links';
import ClipLoader from 'react-spinners/ClipLoader';
import './ReservationCarSelect.scss';

interface ReservationCarSelectProperties {
    selectedLocalisationId: string;
    selectedVehicleId?: number;
    selectCar: (carId: number) => void;
    setStep: (step: number) => void;
}

export function ReservationCarSelect({
    selectedLocalisationId,
    selectedVehicleId,
    selectCar,
    setStep,
}: ReservationCarSelectProperties): JSX.Element {
    const [vehicles, setVehicles] = React.useState<VehicleResponseDTO[] | undefined>(undefined);
    const [inputError] = React.useState<string | undefined>(undefined);
    const [redirect, setRedirect] = React.useState<boolean>(false);

    setStep(2);
    React.useEffect(() => {
        fetch(endpoints.carListByCityEndpoint(selectedLocalisationId))
            .then((response: Response) => {
                response.json().then((vehicles: VehicleResponseDTO[]) => {
                    setVehicles(vehicles);
                });
            })
            .finally(() => setVehicles([vehicleResponseDTOMock, vehicleResponseDTOMock2])); // TODO: Remove
    }, [selectedLocalisationId]);

    const createCarItem = (vehicle: VehicleResponseDTO): JSX.Element => {
        let selected = false;
        if (vehicle.id === selectedVehicleId) {
            selected = true;
        }
        return <CarItem vehicle={vehicle} key={vehicle.id} selectCar={selectCar} selected={selected} />;
    };

    const onClickNext = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setRedirect(true);
    };

    const getVehicleById = (vehicles?: VehicleResponseDTO[], vehicleId?: number): VehicleResponseDTO | undefined => {
        if (vehicles && vehicleId) {
            return vehicles.find((vehicle: VehicleResponseDTO) => {
                return vehicle.id === vehicleId;
            });
        }
    };

    const selectedVehicle = getVehicleById(vehicles, selectedVehicleId);

    if (!selectedLocalisationId) {
        return (
            <div key="inputError" className="text-center container alert alert-danger my-4">
                {'Error: Incorrect data'}
            </div>
        );
    }

    if (redirect && !inputError) {
        return <Redirect to={confirmationSubpageLink} push />;
    }

    return (
        <main>
            <div className="container col-md-8 offset-md-2 my-5 ">
                <form>
                    <div className="shadow card">
                        <div className="card-header">
                            <h1>Select car:</h1>
                        </div>
                        <div id="car-item-container" className="card-body">
                            <div className="row justify-content-center">
                                {vehicles ? vehicles.map(createCarItem) : <ClipLoader size={50} />}
                            </div>
                        </div>
                        <div className="shadow card mt-3">
                            <div className="card-body">
                                <h4 className="ml-4 mt-3">
                                    Selected car:{' '}
                                    <strong>
                                        {selectedVehicle && selectedVehicle.brand + ' ' + selectedVehicle.model}
                                    </strong>
                                </h4>
                                {inputError && (
                                    <div key="input_Error" className="alert alert-danger my-4">
                                        Fill all fields with valid values.
                                    </div>
                                )}
                                <div className="row mb-3 mt-5">
                                    <Link
                                        to={reservationDataSubpageLink}
                                        className="linkstyle btn btn-lg btn-secondary btn-block col-md-2 ml-5"
                                    >
                                        Back
                                    </Link>
                                    <button
                                        className="btn btn-lg btn-primary btn-block  col-md-2 ml-auto mr-5"
                                        onClick={onClickNext}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
