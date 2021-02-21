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

interface ReservationCarSelectState {
    vehicles?: VehicleResponseDTO[];
    inputError?: string;
    redirect: boolean;
}

export class ReservationCarSelect extends React.Component<ReservationCarSelectProperties, ReservationCarSelectState> {
    constructor(props: ReservationCarSelectProperties) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    componentDidMount(): void {
        const selectedLocalisationId = this.props.selectedLocalisationId;
        this.props.setStep(2);

        fetch(endpoints.carListByCityEndpoint(selectedLocalisationId))
            .then((response: Response) => {
                response.json().then((vehicles: VehicleResponseDTO[]) => {
                    this.setState({ vehicles: vehicles });
                });
            })
            .finally(() => this.setState({ vehicles: [vehicleResponseDTOMock, vehicleResponseDTOMock2] })); // TODO: Remove
    }

    createCarItem = (vehicle: VehicleResponseDTO): JSX.Element => {
        let selected = false;
        if (vehicle.id === this.props.selectedVehicleId) {
            selected = true;
        }
        return <CarItem vehicle={vehicle} key={vehicle.id} selectCar={this.props.selectCar} selected={selected} />;
    };

    onClickNext = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        this.setState({ redirect: true });
    };

    getVehicleById = (vehicles?: VehicleResponseDTO[], vehicleId?: number): VehicleResponseDTO | undefined => {
        if (vehicles && vehicleId) {
            return vehicles.find((vehicle: VehicleResponseDTO) => {
                return vehicle.id === vehicleId;
            });
        }
    };

    render(): JSX.Element {
        const { vehicles, inputError, redirect } = this.state;
        const { selectedLocalisationId, selectedVehicleId } = this.props;
        const selectedVehicle = this.getVehicleById(this.state.vehicles, selectedVehicleId);

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
                                    {vehicles ? vehicles.map(this.createCarItem) : <ClipLoader size={50} />}
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
                                            onClick={this.onClickNext}
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
}

// onClickNext = (event) => {
//     event.preventDefault();
//     const selectedCar = this.state.selectedCar;
//
//     const inputError = this.state.inputError;
//
//     if(selectedCar!=null){
//         this.props.history.push({
//             pathname: "/CarRental/reservation/confirm",
//             state: {
//                 selectedCity:this.state.selected_city,
//                 receptionDate:this.state.reception_date,
//                 receptionHour:this.state.reception_hour,
//                 returnDate:this.state.return_date,
//                 returnHour:this.state.return_hour,
//                 selectedCar:this.state.selectedCar
//             }
//         })
//         this.setState({inputError:false});
//     }else{
//         this.setState({inputError:true});
//     }
//
// }
