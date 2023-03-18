import React from 'react';
import './ReservationPanel.scss';
import { ReservationWidget } from './reservation_widget/ReservationWidget';
import { AuthenticatedUserDTO } from '../../../../../model/AuthenticatedUserDTO';

interface ReservationPanelProperties {
    authenticatedUser: AuthenticatedUserDTO | undefined;
}

export function ReservationPanel({ authenticatedUser }: ReservationPanelProperties): JSX.Element {
    return (
        <div id="register-panel-image-container" className="container-fluid">
            <ReservationWidget authenticatedUser={authenticatedUser} />
        </div>
    );
}
