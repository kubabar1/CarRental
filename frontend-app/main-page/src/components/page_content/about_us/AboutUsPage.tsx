import React from 'react';
import { Description } from './panels/description/Description';
import { AboutCarRental } from './panels/about_car_rental/AboutCarRental';
import { OurTeam } from './panels/our_team/OurTeam';

export function AboutUsPage(): JSX.Element {
    return (
        <div>
            <Description />
            <AboutCarRental />
            <OurTeam />
        </div>
    );
}
