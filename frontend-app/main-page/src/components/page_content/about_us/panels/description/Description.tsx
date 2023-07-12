import React from 'react';
import './Description.scss';
import carRentalLogoName from '../../../../../images/car_rental_logo_name.png';
import { TranslationService } from '@car-rental/shared/service';

export function Description(): JSX.Element {
    return (
        <div id="car-rental-description-container" className="flow-container">
            <div id="car-rental-description">
                <div className="container">
                    <img src={carRentalLogoName} alt="Logo" id="car-rental-logo-desc" className="mt-5" />
                    <p className="mt-5 ">{TranslationService.translate('aboutUsDescription')}</p>
                </div>
            </div>
        </div>
    );
}
