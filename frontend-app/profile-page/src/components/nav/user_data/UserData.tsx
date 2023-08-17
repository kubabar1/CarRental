import React from 'react';
import carRentalLogoName from '../../../images/car_rental_logo_name.png';
import userImage from '../../../images/user_images/user.png';
import { AuthenticatedUserDTO } from '@car-rental/shared/model';
import './UserData.scss';

interface UserDataProperties {
    authenticatedUser: AuthenticatedUserDTO;
}

export function UserData({ authenticatedUser: { name, surname, email } }: UserDataProperties): JSX.Element {
    return (
        <div className="card user-data-card-container" style={{ borderRadius: 0 }}>
            <div className="card-header text-center">
                <img src={carRentalLogoName} alt="CarRental logo" style={{ width: '80%' }} />
            </div>
            <div className="card-body user-data-card-body">
                <div className="row text-center user-data-card-body-row">
                    <div>
                        <img src={userImage} alt="User image" className="mr-2 rounded-circle" style={{ height: 50 }} />
                    </div>
                    <div className="mt-4 text-left my-auto">
                        <strong>
                            {name} {surname}
                        </strong>
                        <br />
                        <strong style={{ fontWeight: 'normal' }}>{email}</strong>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}
