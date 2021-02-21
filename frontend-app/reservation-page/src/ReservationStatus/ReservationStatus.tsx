import React from 'react';
import './ReservationStatus.scss';
import okIcon from '../images/ok-icon.png';
import notOkIcon from '../images/not-ok-icon.png';
import { withRouter } from 'react-router-dom';
import { endpoints } from '../constants/PathsAPI';
import ReservationStatusResponseDTO from '../model/ReservationStatusResponseDTO';
import { reservationStatusMock } from '../constants/MockData';
import { Logo } from '../ReservationStepContainer/components/Logo/Logo';

interface ReservationStatusState {
    reservationStatus?: ReservationStatusResponseDTO;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ReservationStatus extends React.Component<any, ReservationStatusState> {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(props: any) {
        super(props);
        this.state = {
            reservationStatus: undefined,
        };
    }

    componentDidMount(): void {
        const reservationId = this.props.match.params.reservationId;
        fetch(endpoints.getReservationStatusById(reservationId))
            .then((response: Response) => {
                response.json().then((reservationStatus: ReservationStatusResponseDTO) => {
                    this.setState({ reservationStatus: reservationStatus });
                });
            })
            .finally(() => this.setState({ reservationStatus: reservationStatusMock })); // TODO: Remove
    }

    render(): JSX.Element {
        const reservationStatus = this.state.reservationStatus;

        return (
            <div id="reservation-status-message-container" className="container my-5">
                <Logo />
                <div className="col-md-4 offset-md-4 card-body shadow-lg text-center mt-4">
                    <div className="container mt-2">
                        {reservationStatus && (
                            <img
                                id={'reservation-status-image'}
                                className="mb-4"
                                src={reservationStatus.isOk ? okIcon : notOkIcon}
                                width="100%"
                                alt={'CarRental logo'}
                            />
                        )}
                    </div>
                    <h3 className="mb-4">{reservationStatus && reservationStatus.message}</h3>
                    <a href={endpoints.homeEndpoint} className="home-link">
                        Home
                    </a>
                </div>
            </div>
        );
    }
}

export default withRouter(ReservationStatus);
