import React from 'react';
import { ReservationPanel } from './panels/reservation_panel/ReservationPanel';
import { RoundedImagesPanel } from './panels/rounded_images_panel/RoundedImagesPanel';
import { MobilePagePanel } from './panels/mobile_page_panel/MobilePagePanel';
import { AuthenticatedUserDTO } from '@car-rental/shared/model';

interface HomeProperties {
    authenticatedUser: AuthenticatedUserDTO | undefined;
}

export function HomePage({ authenticatedUser }: HomeProperties): JSX.Element {
    return (
        <div>
            <ReservationPanel authenticatedUser={authenticatedUser} />
            <RoundedImagesPanel />
            <MobilePagePanel />
        </div>
    );
}
