import React from 'react';
import LocalisationResponseDTO from '../../../model/LocalisationResponseDTO';
import { ReservationPanel } from './panels/reservation_panel/ReservationPanel';
import { RoundedImagesPanel } from './panels/rounded_images_panel/RoundedImagesPanel';

interface HomeProperties {
    isAuthenticated: boolean;
    localisations: LocalisationResponseDTO[] | null;
}

export class HomePage extends React.Component<HomeProperties> {
    constructor(props: HomeProperties) {
        super(props);
    }

    render(): JSX.Element {
        const { isAuthenticated, localisations } = this.props;
        return (
            <div>
                <ReservationPanel isAuthenticated={isAuthenticated} localisations={localisations} />
                <RoundedImagesPanel />
            </div>
        );
    }
}
