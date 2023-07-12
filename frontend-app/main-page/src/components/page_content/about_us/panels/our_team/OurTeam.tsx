import React from 'react';
import './OurTeam.scss';
import { Employee, EmployeeProperties } from './employee/Employee';
import userImage from '../../../../../images/user_images/user_image.png';
import { TranslationService } from '@car-rental/shared/service';

const employees: EmployeeProperties[] = [
    {
        employeeName: 'Harding Forbes',
        employeePosition: 'rentingEmployee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Zeus Williamson',
        employeePosition: 'rentingEmployee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Madeson Logan',
        employeePosition: 'officeEmployee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Hanae Hoover',
        employeePosition: 'blogger',
        employeeImage: userImage,
    },
    {
        employeeName: 'Dale Francis',
        employeePosition: 'officeEmployee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Gabriel Sears',
        employeePosition: 'rentingEmployee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Isaac Mcgee',
        employeePosition: 'rentingEmployee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Derek Moreno',
        employeePosition: 'officeEmployee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Aladdin Michael',
        employeePosition: 'rentingEmployee',
        employeeImage: userImage,
    },
];

export function OurTeam(): JSX.Element {
    return (
        <div id="our-team-container" className="flow-container">
            <h1 className="pt-4">{TranslationService.translate('ourTeam')}</h1>
            <div className="container">
                <div className="row">
                    {employees.map((employee: EmployeeProperties, index: number) => (
                        <Employee
                            employeeName={employee.employeeName}
                            employeePosition={employee.employeePosition}
                            employeeImage={employee.employeeImage}
                            key={`${index}_${employee.employeeName}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
