import React from 'react';
import carRentalLogoName from '../../../images/car_rental_logo_name.png';
import { userImagesProfilePage } from '../../../constants/PathsServer';
import { AuthenticatedUserDTO } from '../../../model/AuthenticatedUserDTO';

interface UserDataProperties {
    authenticatedUser: AuthenticatedUserDTO;
}

export function UserData({ authenticatedUser: { name, surname, email } }: UserDataProperties): JSX.Element {
    return (
        <div className="card">
            <div className="card-header text-center">
                <img src={carRentalLogoName} alt="CarRental logo" style={{ width: '80%' }} />
            </div>
            <div className="card-body">
                <div className="row text-center ml-1">
                    <div>
                        <img
                            src={userImagesProfilePage('user.png')}
                            alt="User image"
                            className="mr-3 mt-3 rounded-circle"
                            style={{ height: 80 }}
                        />
                    </div>
                    <div className="mt-4 text-left my-auto">
                        <strong>{name}</strong>
                        <br />
                        <strong>{surname}</strong>
                        <br />
                        <strong style={{ fontWeight: 'normal' }}>{email}</strong>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}
