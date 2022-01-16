import React, { ChangeEvent, useEffect, useState } from 'react';
import { InputFormGroup } from '../../../../components/form/InputFormGroup';
import { VehicleStatCodeEnum } from '../../../../model/VehicleStatCodeEnum';
import { TextAreaFormGroup } from '../../../../components/form/TextAreaFormGroup';
import { FormContainer } from '../../../../components/form/FormContainer';
import { VehicleResponseDTO } from '../../../../model/VehicleResponseDTO';
import { VehiclePersistDTO } from '../../../../model/VehiclePersistDTO';

export interface VehicleFormProperties {
    onSubmitAction: (vehiclePersistDTO: VehiclePersistDTO) => void;
    vehicleResponseDTO?: VehicleResponseDTO;
}

export const VehicleForm = ({ vehicleResponseDTO, onSubmitAction }: VehicleFormProperties): JSX.Element => {
    const [brand, setBrand] = useState<string | undefined>(undefined);
    const [model, setModel] = useState<string | undefined>(undefined);
    const [dailyFee, setDailyFee] = useState<number | undefined>(undefined);
    const [registration, setRegistration] = useState<string | undefined>(undefined);
    const [location, setLocation] = useState<string | undefined>(undefined);
    const [vehicleStatus, setVehicleStatus] = useState<VehicleStatCodeEnum | undefined>(undefined);
    const [bestOffer, setBestOffer] = useState<boolean>(false);
    const [bodyType, setBodyType] = useState<string | undefined>(undefined);
    const [fuelType, setFuelType] = useState<string | undefined>(undefined);
    const [power, setPower] = useState<number | undefined>(undefined);
    const [gearbox, setGearbox] = useState<string | undefined>(undefined);
    const [frontWheelDrive, setFrontWheelDrive] = useState<boolean>(false);
    const [doorsNumber, setDoorsNumber] = useState<number | undefined>(undefined);
    const [seatsNumber, setSeatsNumber] = useState<number | undefined>(undefined);
    const [color, setColor] = useState<string | undefined>(undefined);
    const [metallic, setMetallic] = useState<boolean>(false);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [productionYear, setProductionYear] = useState<number | undefined>(undefined);
    const [photoName, setPhotoName] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (vehicleResponseDTO) {
            setBrand(vehicleResponseDTO.brand);
            setModel(vehicleResponseDTO.model);
            setDailyFee(vehicleResponseDTO.dailyFee);
            setRegistration(vehicleResponseDTO.registration);
            setLocation(vehicleResponseDTO.location);
            setVehicleStatus(vehicleResponseDTO.vehicleStatus.vehicleStatCode);
            setBestOffer(vehicleResponseDTO.bestOffer);
            setBodyType(vehicleResponseDTO.bodyType);
            setFuelType(vehicleResponseDTO.fuelType);
            setPower(vehicleResponseDTO.power);
            setGearbox(vehicleResponseDTO.gearbox);
            setFrontWheelDrive(vehicleResponseDTO.frontWheelDrive);
            setDoorsNumber(vehicleResponseDTO.doorsNumber);
            setSeatsNumber(vehicleResponseDTO.seatsNumber);
            setColor(vehicleResponseDTO.color);
            setMetallic(vehicleResponseDTO.metallic);
            setDescription(vehicleResponseDTO.description);
            setProductionYear(vehicleResponseDTO.productionYear);
            setPhotoName(vehicleResponseDTO.photoName);
        }
    }, [vehicleResponseDTO]);

    return (
        <FormContainer
            onSubmit={() => {
                if (
                    !!brand &&
                    !!model &&
                    !!dailyFee &&
                    !!registration &&
                    !!location &&
                    !!vehicleStatus &&
                    !!bodyType &&
                    !!fuelType &&
                    !!power &&
                    !!gearbox &&
                    !!doorsNumber &&
                    !!seatsNumber &&
                    !!color &&
                    !!description &&
                    !!productionYear &&
                    !!photoName
                ) {
                    onSubmitAction(
                        new VehiclePersistDTO(
                            brand,
                            model,
                            dailyFee,
                            registration,
                            location,
                            vehicleStatus,
                            bestOffer,
                            bodyType,
                            fuelType,
                            power,
                            gearbox,
                            frontWheelDrive,
                            doorsNumber,
                            seatsNumber,
                            color,
                            metallic,
                            description,
                            productionYear,
                            photoName
                        )
                    );
                }
            }}
        >
            <InputFormGroup
                label={'Brand:'}
                name={'vehicle_brand'}
                value={brand}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBrand(e.target.value)}
            />
            <InputFormGroup
                label={'Model:'}
                name={'vehicle_model'}
                value={model}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setModel(e.target.value)}
            />
            <InputFormGroup
                label={'Daily fee:'}
                name={'vehicle_daily_fee'}
                value={dailyFee}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDailyFee(parseFloat(e.target.value))}
                type={'number'}
            />
            <InputFormGroup
                label={'Registration:'}
                name={'vehicle_registration'}
                value={registration}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRegistration(e.target.value)}
            />
            <InputFormGroup
                label={'Location:'}
                name={'vehicle_location'}
                value={location}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
            />
            <InputFormGroup
                label={'Status:'}
                name={'vehicle_status'}
                value={vehicleStatus}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setVehicleStatus(e.target.value as VehicleStatCodeEnum)}
            />
            <InputFormGroup
                label={'Best offer:'}
                name={'vehicle_best_offer'}
                value={bestOffer}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBestOffer(e.target.checked)}
                type={'checkbox'}
            />
            <InputFormGroup
                label={'Body type:'}
                name={'vehicle_body_type'}
                value={bodyType}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBodyType(e.target.value)}
            />
            <InputFormGroup
                label={'Fuel type:'}
                name={'vehicle_fuel_type'}
                value={fuelType}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFuelType(e.target.value)}
            />
            <InputFormGroup
                label={'Power:'}
                name={'vehicle_power'}
                value={power}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPower(parseFloat(e.target.value))}
                type={'number'}
            />
            <InputFormGroup
                label={'Gearbox:'}
                name={'vehicle_gearbox'}
                value={gearbox}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setGearbox(e.target.value)}
            />
            <InputFormGroup
                label={'Front wheel drive:'}
                name={'vehicle_front_wheel_drive'}
                value={frontWheelDrive}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFrontWheelDrive(e.target.checked)}
                type={'checkbox'}
            />
            <InputFormGroup
                label={'Doors number:'}
                name={'vehicle_doors_number'}
                value={doorsNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDoorsNumber(parseFloat(e.target.value))}
                type={'number'}
            />
            <InputFormGroup
                label={'Seats number:'}
                name={'vehicle_seats_number'}
                value={seatsNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSeatsNumber(parseFloat(e.target.value))}
                type={'number'}
            />
            <InputFormGroup
                label={'Color:'}
                name={'vehicle_color'}
                value={color}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setColor(e.target.value)}
            />
            <InputFormGroup
                label={'Metallic:'}
                name={'vehicle_metallic'}
                value={metallic}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMetallic(e.target.checked)}
                type={'checkbox'}
            />
            <TextAreaFormGroup
                label={'Description:'}
                name={'vehicle_description'}
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            />
            <InputFormGroup
                label={'Production year:'}
                name={'vehicle_production_year'}
                value={productionYear}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setProductionYear(parseInt(e.target.value))}
                type={'number'}
            />
            <InputFormGroup
                label={'Photo name:'}
                name={'vehicle_photo_name'}
                value={photoName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPhotoName(e.target.value)}
            />
        </FormContainer>
    );
};
