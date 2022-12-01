import React from 'react';
import carRentalLogoName from '../../../images/car_rental_logo_name.png';

export function Logo(): JSX.Element {
    return (
        <div className="container col-md-8 offset-md-2 mt-5">
            <img className="mb-4 col-md-6 offset-md-3" src={carRentalLogoName} width="100%" alt={'Logo'} />
        </div>
    );
}
