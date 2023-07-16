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
        ? TranslationService.translate('frontWheelDriveCarDetailsLabelYes')
        : TranslationService.translate('frontWheelDriveCarDetailsLabelNo');
    const metallic = vehicle.vehicleDetails.metallic
        ? TranslationService.translate('metallicCarDetailsLabelYes')
        : TranslationService.translate('metallicCarDetailsLabelNo');

    return (
        <section>
            <div className="text-left">
                <h3 className="mt-2 ml-3 mb-4">{TranslationService.translate('carDetails')}</h3>
            </div>

            <div className="row">
                <div className="col-md-6 text-left">
                    {renderProps(
                        TranslationService.translate('bodyTypeCarDetailsLabel'),
                        vehicle.vehicleDetails.bodyType
                    )}
                    {renderProps(TranslationService.translate('vehicleBrandCarDetailsLabel'), vehicle.brand)}
                    {renderProps(TranslationService.translate('vehicleModelCarDetailsLabel'), vehicle.model)}
                    {renderProps(
                        TranslationService.translate('productionYearCarDetailsLabel'),
                        vehicle.vehicleDetails.productionYear.toString()
                    )}
                    {renderProps(
                        TranslationService.translate('fuelTypeCarDetailsLabel'),
                        vehicle.vehicleDetails.fuelType
                    )}
                    {renderProps(
                        TranslationService.translate('powerCarDetailsLabel'),
                        vehicle.vehicleDetails.power.toString() +
                            ` ${TranslationService.translate('powerSymbolCarDetailsLabel')}`
                    )}
                </div>
                <div className="col-md-6 text-left">
                    {renderProps(
                        TranslationService.translate('gearboxCarDetailsLabel'),
                        vehicle.vehicleDetails.gearbox
                    )}
                    {renderProps(
                        TranslationService.translate('doorsNumberCarDetailsLabel'),
                        vehicle.vehicleDetails.doorsNumber.toString()
                    )}
                    {renderProps(
                        TranslationService.translate('seatsNumberCarDetailsLabel'),
                        vehicle.vehicleDetails.seatsNumber.toString()
                    )}
                    {renderProps(TranslationService.translate('colorCarDetailsLabel'), vehicle.vehicleDetails.color)}
                    {renderProps(TranslationService.translate('frontWheelDriveCarDetailsLabel'), frontWheelDrive)}
                    {renderProps(TranslationService.translate('metallicCarDetailsLabel'), metallic)}
                </div>
            </div>
        </section>
    );
}
