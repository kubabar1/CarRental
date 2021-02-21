import React from 'react';
import UserDataResponseDTO from '../../../../../model/UserDataResponseDTO';

interface PersonalDataCardProperties {
    userData: UserDataResponseDTO;
}

export function PersonalDataCard(props: PersonalDataCardProperties): JSX.Element {
    const renderFormGroup = (label: string, value: string): JSX.Element => {
        return (
            <div className="form-group">
                <label>{label}:</label>
                <strong>{value}</strong>
            </div>
        );
    };

    return (
        <div className="shadow card">
            <div className="card-header">
                <h1>Personal data:</h1>
            </div>
            <div className="card-body">
                {renderFormGroup('Name', props.userData.userName)}
                {renderFormGroup('Surname', props.userData.userSurname)}
                {renderFormGroup('Phone', props.userData.phone)}
                {renderFormGroup('E-mail', props.userData.email)}
            </div>
        </div>
    );
}
