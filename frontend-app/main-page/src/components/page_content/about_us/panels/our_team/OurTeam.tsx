import React from 'react';
import './OurTeam.scss';
import { Employee, EmployeeProperties } from './employee/Employee';
import userImage from '../../../../../images/user_images/user_image.png';

const employees: EmployeeProperties[] = [
    {
        employeeName: 'Harding Forbes',
        employeePosition: 'Renting employee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Zeus Williamson',
        employeePosition: 'Renting employee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Madeson Logan',
        employeePosition: 'Office employee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Hanae Hoover',
        employeePosition: 'Blogger',
        employeeImage: userImage,
    },
    {
        employeeName: 'Dale Francis',
        employeePosition: 'Office employee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Gabriel Sears',
        employeePosition: 'Renting employee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Isaac Mcgee',
        employeePosition: 'Renting employee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Derek Moreno',
        employeePosition: 'Office employee',
        employeeImage: userImage,
    },
    {
        employeeName: 'Aladdin Michael',
        employeePosition: 'Renting employee',
        employeeImage: userImage,
    },
];

export function OurTeam(): JSX.Element {
    return (
        <div id="our-team-container" className="flow-container">
            <h1 className="pt-4">Our team</h1>
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
