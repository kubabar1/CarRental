import React from 'react';
import { AuthenticatedUserDTO } from '@car-rental/shared/model';
import './PersonalDataCard.scss';
import { TranslationService } from '@car-rental/shared/service';

interface PersonalDataCardProperties {
    authenticatedUser: AuthenticatedUserDTO;
}

export function PersonalDataCard({ authenticatedUser }: PersonalDataCardProperties): JSX.Element {
    const renderFormGroup = (label: string, value: string): JSX.Element => {
        return (
            <div className="form-group">
                <label>{label}:</label>
                <strong className="form-group-value">{value}</strong>
            </div>
        );
    };

    return (
        <div className="shadow card personal-data-card">
            <div className="card-header text-center">
                <h2>{TranslationService.translate('personalDataCardHeader')}</h2>
            </div>
            <div className="card-body">
                {renderFormGroup(TranslationService.translate('namePersonalDataCard'), authenticatedUser.name)}
                {renderFormGroup(TranslationService.translate('surnamePersonalDataCard'), authenticatedUser.surname)}
                {renderFormGroup(TranslationService.translate('phonePersonalDataCard'), authenticatedUser.phone)}
                {renderFormGroup(TranslationService.translate('emailPersonalDataCard'), authenticatedUser.email)}
            </div>
        </div>
    );
}
