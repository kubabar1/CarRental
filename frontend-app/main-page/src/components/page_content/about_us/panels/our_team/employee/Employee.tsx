import React from 'react';
import './Employee.scss';
import { TranslationService } from '@car-rental/shared/service';

export interface EmployeeProperties {
    employeeName: string;
    employeePosition: string;
    employeeImage: string;
}

export function Employee({ employeeName, employeePosition, employeeImage }: EmployeeProperties): JSX.Element {
    return (
        <div className="col-md-4 employee-container">
            <div className="employee-image">
                <img src={employeeImage} />
            </div>
            <div className="employee-description">
                <div className="employee-name">{employeeName}</div>
                <div className="employee-position">{TranslationService.translate(employeePosition)}</div>
            </div>
        </div>
    );
}
