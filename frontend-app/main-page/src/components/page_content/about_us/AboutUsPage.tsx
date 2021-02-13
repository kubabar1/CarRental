import React from 'react';
import { Description } from './panels/description/Description';
import { AboutCarRental } from './panels/about_car_rental/AboutCarRental';
import { BestRental } from './panels/best_rental/BestRental';

export function AboutUsPage(): JSX.Element {
    return (
        <div>
            <Description />
            <AboutCarRental />
            <BestRental />
        </div>
    );
}
