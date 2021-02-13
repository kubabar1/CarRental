import React from 'react';
import VehicleResponseDTO from '../../../../../model/VehicleResponseDTO';

interface CarPropertiesProps {
    vehicle: VehicleResponseDTO;
}

function renderProps(name: string, value: string) {
    return (
        <p className="mx-5 my-4">
            {name}: <strong>{value}</strong>
        </p>
    );
}

export function CarProperties(props: CarPropertiesProps) {
    const vehicle = props.vehicle;
    const frontWheelDrive = vehicle.vehicleParameters.frontWheelDrive ? 'Yes' : 'No';
    const metallic = vehicle.vehicleParameters.metallic ? 'Yes' : 'No';

    return (
        <section>
            <div className="text-left">
                <h3 className="mt-2 ml-3 mb-4">Car details</h3>
            </div>

            <div className="row">
                <div className="col-md-6 text-left">
                    {renderProps('Body type', vehicle.vehicleParameters.bodyType)}
                    {renderProps('Vehicle brand', vehicle.brand)}
                    {renderProps('Vehicle model', vehicle.model)}
                    {renderProps('Production year', vehicle.vehicleParameters.productionYear.toString())}
                    {renderProps('Fuel type', vehicle.vehicleParameters.fuelType)}
                    {renderProps('Power', vehicle.vehicleParameters.power.toString() + ' KM')}
                </div>
                <div className="col-md-6 text-left">
                    {renderProps('Gearbox', vehicle.vehicleParameters.gearbox)}
                    {renderProps('Doors number', vehicle.vehicleParameters.doorsNumber.toString())}
                    {renderProps('Seats number', vehicle.vehicleParameters.seatsNumber.toString())}
                    {renderProps('Color', vehicle.vehicleParameters.color)}
                    {renderProps('Front-wheel drive', frontWheelDrive)}
                    {renderProps('Metallic', metallic)}
                </div>
            </div>
        </section>
    );
}
