import React from 'react';
import { AuthenticatedUserDTO } from '../../../../../model/AuthenticatedUserDTO';
import './PersonalDataCard.scss';

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
                <h2>{'Personal data'}</h2>
            </div>
            <div className="card-body">
                {renderFormGroup('Name', authenticatedUser.name)}
                {renderFormGroup('Surname', authenticatedUser.surname)}
                {renderFormGroup('Phone', authenticatedUser.phone)}
                {renderFormGroup('E-mail', authenticatedUser.email)}
            </div>
        </div>
    );
}
