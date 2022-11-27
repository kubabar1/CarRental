import React, { useState } from 'react';
import { CitySelection } from './components/CitySelection';
import { ReceptionDateHour } from './components/ReceptionDateHour';
import { ReturnDateHour } from './components/ReturnDateHour';
import LocalisationResponseDTO from '../../../../../../model/LocalisationResponseDTO';
import './ReservationWidget.scss';
import { AuthenticatedUserDTO } from '../../../../../../model/AuthenticatedUserDTO';

interface ReservationWidgetProperties {
    authenticatedUser: AuthenticatedUserDTO | undefined;
    localisations: LocalisationResponseDTO[] | null;
}

export function ReservationWidget({ authenticatedUser, localisations }: ReservationWidgetProperties): JSX.Element {
    const [, setSelectedCityId] = useState<number | null>(null);
    const [receptionDate, setReceptionDate] = useState<Date | null>(null);
    const [, setReceptionHour] = useState<number | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const [, setReturnHour] = useState<number | null>(null);
    const [authError, setAuthError] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const isAuthenticated: boolean = !!authenticatedUser && authenticatedUser.authenticated;
        if (!isAuthenticated) {
            setAuthError(true);
        } else {
            setAuthError(false);
        }
    };

    const renderAuthError = (): JSX.Element => {
        return authError ? (
            <div className="alert alert-danger" key="auth_error">
                You must be authenticated to make a reservation.
            </div>
        ) : (
            <div />
        );
    };

    return (
        <div>
            <div
                id="car-rent-form-container"
                className="container col-xl-3 col-lg-4 col-md-5 col-sm-7 card card-body shadow mr-3"
            >
                <form onSubmit={handleSubmit}>
                    <h3>Reserve car</h3>
                    <CitySelection localisations={localisations} setLocalisation={setSelectedCityId} />
                    <ReceptionDateHour
                        setReceptionDate={setReceptionDate}
                        setReceptionHour={setReceptionHour}
                        returnDate={returnDate}
                    />
                    <ReturnDateHour
                        setReturnDate={setReturnDate}
                        setReturnHour={setReturnHour}
                        receptionDate={receptionDate}
                    />
                    {renderAuthError()}
                    <input type="submit" value="Reserve" className="btn btn-primary reserve-widget-submit-button" />
                </form>
            </div>
        </div>
    );
}
