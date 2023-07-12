import React from 'react';
import { VehicleResponseDTO } from '@car-rental/shared/model';
import { TranslationService } from '@car-rental/shared/service';

interface CarPropertiesProps {
    vehicle: VehicleResponseDTO;
}

function renderProps(name: string, value: string): JSX.Element {
    return (
        <p className="mx-5 my-4">
            {name}: <strong>{value}</strong>
        </p>
    );
}

export function VehicleProperties(props: CarPropertiesProps): JSX.Element {
    const vehicle = props.vehicle;
    const frontWheelDrive = vehicle.vehicleDetails.frontWheelDrive ? 'Yes' : 'No';
    const metallic = vehicle.vehicleDetails.metallic ? 'Yes' : 'No';

    return (
        <section>
            <div className="text-left">
                <h3 className="mt-2 ml-3 mb-4">{TranslationService.translate('carDetails')}</h3>
            </div>

            <div className="row">
                <div className="col-md-6 text-left">
                    {renderProps('Body type', vehicle.vehicleDetails.bodyType)}
                    {renderProps('Vehicle brand', vehicle.brand)}
                    {renderProps('Vehicle model', vehicle.model)}
                    {renderProps('Production year', vehicle.vehicleDetails.productionYear.toString())}
                    {renderProps('Fuel type', vehicle.vehicleDetails.fuelType)}
                    {renderProps('Power', vehicle.vehicleDetails.power.toString() + ' KM')}
                </div>
                <div className="col-md-6 text-left">
                    {renderProps('Gearbox', vehicle.vehicleDetails.gearbox)}
                    {renderProps('Doors number', vehicle.vehicleDetails.doorsNumber.toString())}
                    {renderProps('Seats number', vehicle.vehicleDetails.seatsNumber.toString())}
                    {renderProps('Color', vehicle.vehicleDetails.color)}
                    {renderProps('Front-wheel drive', frontWheelDrive)}
                    {renderProps('Metallic', metallic)}
                </div>
            </div>
        </section>
    );
}
