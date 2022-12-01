import React, { useEffect } from 'react';
import './ReservationStatus.scss';
import okIcon from '../images/ok-icon.png';
import notOkIcon from '../images/not-ok-icon.png';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { endpoints } from '../constants/PathsAPI';
import ReservationStatusResponseDTO from '../model/ReservationStatusResponseDTO';
import { reservationStatusMock } from '../constants/MockData';
import { Logo } from '../ReservationStepContainer/components/Logo/Logo';

export function ReservationStatus({ match }: RouteComponentProps<{ reservationId: string }>): JSX.Element {
    const [reservationStatus, setReservationStatus] = React.useState<ReservationStatusResponseDTO | undefined>(
        undefined
    );

    useEffect(() => {
        const reservationId = match.params.reservationId;
        fetch(endpoints.getReservationStatusById(reservationId))
            .then((response: Response) => {
                response.json().then((reservationStatus: ReservationStatusResponseDTO) => {
                    setReservationStatus(reservationStatus);
                });
            })
            .finally(() => setReservationStatus(reservationStatusMock)); // TODO: Remove
    }, [match.params.reservationId]);

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

export default withRouter(ReservationStatus);
