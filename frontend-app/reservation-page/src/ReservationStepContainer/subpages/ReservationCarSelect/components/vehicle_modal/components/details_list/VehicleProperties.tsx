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
    const frontWheelDrive = vehicle.vehicleDetails.frontWheelDrive
        ? TranslationService.translate('vehiclePropertiesFrontWheelDriveYes')
        : TranslationService.translate('vehiclePropertiesFrontWheelDriveNo');
    const metallic = vehicle.vehicleDetails.metallic
        ? TranslationService.translate('vehiclePropertiesMetallicYes')
        : TranslationService.translate('vehiclePropertiesMetallicNo');

    return (
        <section>
            <div className="text-left">
                <h3 className="mt-2 ml-3 mb-4">{TranslationService.translate('carDetailsHeaderVehicleProperties')}</h3>
            </div>

            <div className="row">
                <div className="col-md-6 text-left">
                    {renderProps(
                        TranslationService.translate('bodyTypeVehiclePropertiesLabel'),
                        vehicle.vehicleDetails.bodyType
                    )}
                    {renderProps(TranslationService.translate('vehicleBrandVehiclePropertiesLabel'), vehicle.brand)}
                    {renderProps(TranslationService.translate('vehicleModelVehiclePropertiesLabel'), vehicle.model)}
                    {renderProps(
                        TranslationService.translate('productionYearVehiclePropertiesLabel'),
                        vehicle.vehicleDetails.productionYear.toString()
                    )}
                    {renderProps(
                        TranslationService.translate('fuelTypeVehiclePropertiesLabel'),
                        vehicle.vehicleDetails.fuelType
                    )}
                    {renderProps(
                        TranslationService.translate('powerVehiclePropertiesLabel'),
                        vehicle.vehicleDetails.power.toString() + ' KM'
                    )}
                </div>
                <div className="col-md-6 text-left">
                    {renderProps(
                        TranslationService.translate('gearboxVehiclePropertiesLabel'),
                        vehicle.vehicleDetails.gearbox
                    )}
                    {renderProps(
                        TranslationService.translate('doorsVehiclePropertiesLabel'),
                        vehicle.vehicleDetails.doorsNumber.toString()
                    )}
                    {renderProps(
                        TranslationService.translate('seatsVehiclePropertiesLabel'),
                        vehicle.vehicleDetails.seatsNumber.toString()
                    )}
                    {renderProps(
                        TranslationService.translate('colorVehiclePropertiesLabel'),
                        vehicle.vehicleDetails.color
                    )}
                    {renderProps(TranslationService.translate('frontWheelVehiclePropertiesLabel'), frontWheelDrive)}
                    {renderProps(TranslationService.translate('metallicVehiclePropertiesLabel'), metallic)}
                </div>
            </div>
        </section>
    );
}
