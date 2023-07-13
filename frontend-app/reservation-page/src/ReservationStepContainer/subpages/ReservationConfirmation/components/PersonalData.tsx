import React from 'react';
import { AuthenticatedUserDTO } from '@car-rental/shared/model';
import { TranslationService } from '@car-rental/shared/service';

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
            <h3>{TranslationService.translate('personalDataHeader')}</h3>
            <hr />
            <div>
                {renderFormGroupItem(TranslationService.translate('namePersonalData'), name)}
                {renderFormGroupItem(TranslationService.translate('surnamePersonalData'), surname)}
                {renderFormGroupItem(TranslationService.translate('phonePersonalData'), phone)}
                {renderFormGroupItem(TranslationService.translate('emailPersonalData'), email)}
            </div>
        </div>
    );
}
