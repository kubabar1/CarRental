import React from 'react';
import './Home.scss';
import { ReservationPanel } from './panels/ReservationPanel';
import { RoundedImagesPanel } from './panels/RoundedImagesPanel';
import LocalisationResponseDTO from '../../../model/LocalisationResponseDTO';

interface HomeProperties {
    isAuthenticated: boolean;
    localisations: LocalisationResponseDTO[] | null;
}

export class Home extends React.Component<HomeProperties> {
    constructor(props: HomeProperties) {
        super(props);
    }

    render() {
        const { isAuthenticated, localisations } = this.props;
        return (
            <div>
                <ReservationPanel isAuthenticated={isAuthenticated} localisations={localisations} />
                <RoundedImagesPanel />
            </div>
        );
    }
}
