import React from 'react';
import { AuthenticatedUserDTO } from '@car-rental/shared/model';

interface ReservationConfirmationProperties {
    authenticatedUser: AuthenticatedUserDTO;
    renderFormGroupItem: (label: string, value: string) => JSX.Element;
}

export function PersonalData({
    authenticatedUser,
    renderFormGroupItem,
}: ReservationConfirmationProperties): JSX.Element {
    const { name, surname, phone, email } = authenticatedUser;

    return (
        <div>
            <h3>{'Personal data'}</h3>
            <hr />
            <div>
                {renderFormGroupItem('Name: ', name)}
                {renderFormGroupItem('Surname: ', surname)}
                {renderFormGroupItem('Phone: ', phone)}
                {renderFormGroupItem('E-mail: ', email)}
            </div>
        </div>
    );
}
