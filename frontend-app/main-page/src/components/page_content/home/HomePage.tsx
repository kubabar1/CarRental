import React from 'react';
import LocalisationResponseDTO from '../../../model/LocalisationResponseDTO';
import { ReservationPanel } from './panels/reservation_panel/ReservationPanel';
import { RoundedImagesPanel } from './panels/rounded_images_panel/RoundedImagesPanel';
import { MobilePagePanel } from './panels/mobile_page_panel/MobilePagePanel';
import { AuthenticatedUserDTO } from '../../../model/AuthenticatedUserDTO';

interface HomeProperties {
    authenticatedUser: AuthenticatedUserDTO | undefined;
    localisations: LocalisationResponseDTO[] | null;
}

export function HomePage({ authenticatedUser, localisations }: HomeProperties): JSX.Element {
    return (
        <div>
            <ReservationPanel authenticatedUser={authenticatedUser} localisations={localisations} />
            <RoundedImagesPanel />
            <MobilePagePanel />
        </div>
    );
}
