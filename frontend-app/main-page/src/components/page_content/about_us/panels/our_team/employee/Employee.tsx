import React from 'react';
import './Employee.scss';

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
                <div className="employee-position">{employeePosition}</div>
            </div>
        </div>
    );
}
