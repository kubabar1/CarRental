import React from 'react';
import LocalisationResponseDTO from '../../../../../model/LocalisationResponseDTO';
import './ReservationPanel.scss';
import {ReservationWidget} from "./reservation_widget/ReservationWidget";

interface ReservationPanelProperties {
    isAuthenticated: boolean;
    localisations: LocalisationResponseDTO[] | null;
}

export class ReservationPanel extends React.Component<ReservationPanelProperties> {
    constructor(props: ReservationPanelProperties) {
        super(props);
    }

    render() {
        const { isAuthenticated, localisations } = this.props;
        return (
            <div id="register-panel-image-container" className="container-fluid">
                <ReservationWidget isAuthenticated={isAuthenticated} localisations={localisations} />
            </div>
        );
    }
}
