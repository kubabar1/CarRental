import React from 'react';
import LocalisationResponseDTO from '../../../../../model/LocalisationResponseDTO';
import './ReservationPanel.scss';
import { ReservationWidget } from './reservation_widget/ReservationWidget';
import { AuthenticatedUserDTO } from '../../../../../model/AuthenticatedUserDTO';

interface ReservationPanelProperties {
    authenticatedUser: AuthenticatedUserDTO | undefined;
    localisations: LocalisationResponseDTO[] | null;
}

export function ReservationPanel({ authenticatedUser, localisations }: ReservationPanelProperties): JSX.Element {
    return (
        <div id="register-panel-image-container" className="container-fluid">
            <ReservationWidget authenticatedUser={authenticatedUser} localisations={localisations} />
        </div>
    );
}
