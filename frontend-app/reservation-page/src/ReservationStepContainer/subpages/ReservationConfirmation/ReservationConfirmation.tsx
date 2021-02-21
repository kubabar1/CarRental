import React from 'react';
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

interface ReservationConfirmationState {
    selectedVehicle?: VehicleResponseDTO;
    selectedLocalisation?: LocalisationResponseDTO;
    fullCost?: number;
    isError: boolean;
    reservationId?: string;
}

export class ReservationConfirmation extends React.Component<
    ReservationConfirmationProperties,
    ReservationConfirmationState
> {
    constructor(props: ReservationConfirmationProperties) {
        super(props);
        this.state = {
            isError: false,
            reservationId: undefined,
        };
    }

    componentDidMount(): void {
        this.props.setStep(3);
        const selectedVehicleId = this.props.selectedVehicleId;
        fetch(endpoints.carByIdEndpoint(selectedVehicleId))
            .then((response: Response) => {
                response.json().then((vehicle: VehicleResponseDTO) => {
                    this.setState({ selectedVehicle: vehicle });
                });
            })
            .finally(() => {
                // TODO: Remove
                this.setState({
                    selectedVehicle: vehicleResponseDTOMock,
                });
            });
        fetch(endpoints.localisationByIdEndpoint(this.props.selectedCityId))
            .then((response: Response) => {
                response.json().then((localisation: LocalisationResponseDTO) => {
                    this.setState({ selectedLocalisation: localisation });
                });
            })
            .finally(() => {
                // TODO: Remove
                this.setState({
                    selectedLocalisation: localisationResponseDTOMock,
                });
            });
    }

    // countCost = (userId) => {
    // 	const bookingWrapper = JSON.stringify(this.createBookingWrapper(userId));
    //
    // 	const url = 'http://localhost:8080/CarRental/booking/cost';
    //
    //
    // 	fetch(url, {
    // 		method: 'POST',
    // 		headers: {
    // 			'Accept': 'application/json',
    // 			'Content-Type': 'application/json'
    // 		},
    // 		body: bookingWrapper
    // 	}).then(response => response.json())
    // 	.then(json => {this.setState({fullCost:json.fullCost})})
    // 	.catch(error => {});
    // }

    // addBooking = () => {
    // 		const bookingWrapper = JSON.stringify(this.createBookingWrapper(this.state.user_id));
    // 		const url = 'http://localhost:8080/CarRental/booking/reserve';
    //
    //
    // 		fetch(url, {
    // 			method: 'POST',
    // 			headers: {
    // 				'Accept': 'application/json',
    // 				'Content-Type': 'application/json'
    // 			},
    // 			body: bookingWrapper
    // 		})
    // 		.catch(error => {});
    //
    // }

    onClickNext = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        // fetch to add reservation eg. '/reservation/add' - it will return reservationId
        const reservationId = 'axd2awd4s1';
        this.setState({
            reservationId: reservationId,
        });
        window.location.href = endpoints.orderStatusById(reservationId);
    };

    renderFormGroupItem = (label: string, value: string): JSX.Element => {
        return (
            <div className="form-group">
                <label>{label}</label>
                <strong>{value}</strong>
            </div>
        );
    };

    render(): JSX.Element {
        const { userName, userSurname, phone, email } = this.props.userData;
        const { fullCost, selectedVehicle, selectedLocalisation } = this.state;
        const { selectedReceptionDate, selectedReceptionHour, selectedReturnDate, selectedReturnHour } = this.props;

        return (
            <main>
                <div id="reservation-data-container" className="container col-md-6 offset-md-3 my-5 ">
                    <form>
                        <div className="shadow card">
                            <div className="card-header">
                                <h1>Confirm reservation</h1>
                            </div>
                            <div className="card-body">
                                {this.renderFormGroupItem('Name: ', userName)}
                                {this.renderFormGroupItem('Surname: ', userSurname)}
                                {this.renderFormGroupItem('Phone: ', phone)}
                                {this.renderFormGroupItem('E-mail: ', email)}
                                <hr />
                                {selectedLocalisation &&
                                    this.renderFormGroupItem('City: ', selectedLocalisation.city.toString())}
                                {this.renderFormGroupItem(
                                    'Reception date: ',
                                    date.format(selectedReceptionDate, 'YYYY-MM-DD')
                                )}
                                {this.renderFormGroupItem('Reception hour: ', selectedReceptionHour.toString())}
                                {this.renderFormGroupItem(
                                    'Return date: ',
                                    date.format(selectedReturnDate, 'YYYY-MM-DD')
                                )}
                                {this.renderFormGroupItem('Return hour: ', selectedReturnHour.toString())}
                                {selectedVehicle &&
                                    this.renderFormGroupItem(
                                        'Selected car: ',
                                        selectedVehicle.brand + ' ' + selectedVehicle.model
                                    )}
                                {fullCost && this.renderFormGroupItem('Cost: ', fullCost.toString())}
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
                                        onClick={this.onClickNext}
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
}
