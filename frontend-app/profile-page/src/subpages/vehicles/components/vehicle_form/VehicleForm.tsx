import React, { useEffect, useState } from 'react';
import { InputFormGroup } from '../../../../components/form/form-group/input/InputFormGroup';
import { VehicleStatCodeEnum } from '../../../../model/VehicleStatCodeEnum';
import { TextAreaFormGroup } from '../../../../components/form/form-group/text-area/TextAreaFormGroup';
import { FormContainer } from '../../../../components/form/form-group/FormContainer';
import { VehiclePersistDTO } from '../../../../model/VehiclePersistDTO';
import { VehicleDetailsDTO } from '../../../../model/VehicleDetailsDTO';
import { useForm } from 'react-hook-form';
import {
    mapToOptionType,
    mapToOptionTypeWithKeys,
    SelectFormGroup,
} from '../../../../components/form/form-group/select/SelectFormGroup';
import {
    addBodyType,
    addBrand,
    addColor,
    addFuelType,
    addModel,
    getVehicleOptions,
} from '../../../../service/VehicleService';
import { VehicleOptionsDTO } from '../../../../model/VehicleOptionsDTO';
import { SwitchFormGroup } from '../../../../components/form/form-group/switch/SwitchFormGroup';
import { UploadInputFormGroup } from '../../../../components/form/form-group/upload/UploadInputFormGroup';
import { FileWithPreview } from '../../../../components/form/form-group/upload/Dropzone';
import { AddOptionModal } from './add_option_modal/AddOptionModal';
import { OptionDTO } from '../../../../model/OptionDTO';
import { getVehicleModelsByBrand } from '../../../../../../main-page/src/service/VehicleService';
import { VehicleModelDTO } from '../../../../model/VehicleModelDTO';

export interface VehicleFormProperties {
    onSubmitAction: (vehiclePersistDTO: VehiclePersistDTO, vehicleImage: File) => void;
    vehicleDefaultValues: VehicleFormValues;
    submitButtonValue: string;
}

export type VehicleFormValues = {
    brand: string;
    model: string;
    dailyFee: number;
    registration: string;
    location: number;
    vehicleStatus: VehicleStatCodeEnum;
    bestOffer: boolean;
    bodyType: string;
    fuelType: string;
    power: number;
    gearbox: string;
    frontWheelDrive: boolean;
    doorsCount: number;
    seatsCount: number;
    color: string;
    metallic: boolean;
    description: string;
    productionYear: number;
    vehicleImage: FileWithPreview;
};

type ModalVehicleOptions = {
    headerTitle: string;
    optionLabel: string;
    onSubmit: (value: string) => void;
};

type VehicleOption = {
    brand: string;
    model: string;
    bodyType: string;
    fuelType: string;
    color: string;
};

export const VehicleForm = ({
    vehicleDefaultValues,
    onSubmitAction,
    submitButtonValue,
}: VehicleFormProperties): JSX.Element => {
    const [vehicleOptions, setVehicleOptions] = useState<VehicleOptionsDTO | undefined>(undefined);
    const [vehicleModels, setVehicleModels] = useState<string[]>([]);
    const { register, formState, watch, control, handleSubmit } = useForm<VehicleFormValues>({
        mode: 'onChange',
        defaultValues: vehicleDefaultValues,
    });
    const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
    const [selectedModalOption, setSelectedModalOption] = React.useState<ModalVehicleOptions | undefined>(undefined);
    const vehicleModalOptions: Record<keyof VehicleOption, ModalVehicleOptions> = {
        brand: {
            headerTitle: 'Add brand',
            optionLabel: 'Brand:',
            onSubmit: (value: string) => {
                addBrand(new OptionDTO(value)).then(() => {
                    loadVehicleOptions();
                    setIsOpen(false);
                });
            },
        },
        model: {
            headerTitle: 'Add model',
            optionLabel: 'Model:',
            onSubmit: (value: string) => {
                addModel(new VehicleModelDTO(watchBrand, value)).then(() => {
                    loadVehicleOptions();
                    loadVehicleModels();
                    setIsOpen(false);
                });
            },
        },
        bodyType: {
            headerTitle: 'Add body type',
            optionLabel: 'Body type:',
            onSubmit: (value: string) => {
                addBodyType(new OptionDTO(value)).then(() => {
                    loadVehicleOptions();
                    setIsOpen(false);
                });
            },
        },
        fuelType: {
            headerTitle: 'Add fuel type',
            optionLabel: 'Fuel type:',
            onSubmit: (value: string) => {
                addFuelType(new OptionDTO(value)).then(() => {
                    loadVehicleOptions();
                    setIsOpen(false);
                });
            },
        },
        color: {
            headerTitle: 'Add color',
            optionLabel: 'Color:',
            onSubmit: (value: string) => {
                addColor(new OptionDTO(value)).then(() => {
                    loadVehicleOptions();
                    setIsOpen(false);
                });
            },
        },
    };
    const watchBrand: string = watch('brand');

    useEffect(() => {
        loadVehicleOptions();
    }, []);

    useEffect(() => {
        loadVehicleModels();
    }, [watchBrand]);

    const loadVehicleOptions = (): void => {
        getVehicleOptions().then((vehicleDefaultParams: VehicleOptionsDTO) => {
            setVehicleOptions(vehicleDefaultParams);
        });
    };

    const loadVehicleModels = () => {
        if (watchBrand) {
            getVehicleModelsByBrand(watchBrand).then((models: string[]) => {
                setVehicleModels(models);
            });
        } else {
            setVehicleModels([]);
        }
    };

    const onSubmit = (data: VehicleFormValues): void => {
        onSubmitAction(
            new VehiclePersistDTO(
                data.registration,
                data.brand,
                data.model,
                data.dailyFee,
                data.location,
                data.bestOffer,
                data.vehicleStatus,
                new VehicleDetailsDTO(
                    data.bodyType,
                    data.productionYear,
                    data.fuelType,
                    data.power,
                    data.gearbox,
                    data.frontWheelDrive,
                    data.doorsCount,
                    data.seatsCount,
                    data.color,
                    data.metallic,
                    data.vehicleImage.name,
                    data.description
                )
            ),
            data.vehicleImage
        );
    };

    return (
        <FormContainer submitButtonValue={submitButtonValue} onSubmit={handleSubmit(onSubmit)}>
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={'Brand:'}
                    name={'brand'}
                    control={control}
                    options={vehicleOptions.brands.map(mapToOptionType)}
                    error={formState.errors.brand}
                    displayAddButton
                    onClickAddButton={() => {
                        setSelectedModalOption(vehicleModalOptions.brand);
                        setIsOpen(true);
                    }}
                />
            )}
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={'Model:'}
                    name={'model'}
                    control={control}
                    options={vehicleModels.map(mapToOptionType)}
                    error={formState.errors.model}
                    rules={{ required: 'Model is required' }}
                    displayAddButton
                    onClickAddButton={() => {
                        setSelectedModalOption(vehicleModalOptions.model);
                        setIsOpen(true);
                    }}
                    isAddButtonDisabled={!watchBrand}
                />
            )}
            <InputFormGroup<VehicleFormValues>
                label={'Daily fee:'}
                name={'dailyFee'}
                type={'number'}
                step={0.01}
                register={register}
                registerOptions={{
                    required: 'Daily fee is required',
                    valueAsNumber: true,
                }}
                error={formState.errors.dailyFee}
            />
            <InputFormGroup<VehicleFormValues>
                label={'Registration:'}
                name={'registration'}
                register={register}
                registerOptions={{ required: 'Registration is required' }}
                error={formState.errors.registration}
            />
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={'Location:'}
                    name={'location'}
                    control={control}
                    options={vehicleOptions.locations.map((location) =>
                        mapToOptionTypeWithKeys(
                            `${location.id}`,
                            `${location.country}, ${location.city}, ${location.streetAndNb}`
                        )
                    )}
                    error={formState.errors.location}
                />
            )}
            <SelectFormGroup<VehicleFormValues>
                label={'Status:'}
                name={'vehicleStatus'}
                control={control}
                options={[
                    mapToOptionTypeWithKeys(VehicleStatCodeEnum.UAV, 'Unavailable'),
                    mapToOptionTypeWithKeys(VehicleStatCodeEnum.AVI, 'Available'),
                ]}
                error={formState.errors.vehicleStatus}
            />
            <SwitchFormGroup<VehicleFormValues>
                label={'Best offer:'}
                name={'bestOffer'}
                control={control}
                error={formState.errors.bestOffer}
            />
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={'Body type:'}
                    name={'bodyType'}
                    control={control}
                    options={vehicleOptions.bodyTypes.map(mapToOptionType)}
                    error={formState.errors.bodyType}
                    displayAddButton
                    onClickAddButton={() => {
                        setSelectedModalOption(vehicleModalOptions.bodyType);
                        setIsOpen(true);
                    }}
                />
            )}
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={'Fuel type:'}
                    name={'fuelType'}
                    control={control}
                    options={vehicleOptions.fuelTypes.map(mapToOptionType)}
                    error={formState.errors.fuelType}
                    displayAddButton
                    onClickAddButton={() => {
                        setSelectedModalOption(vehicleModalOptions.fuelType);
                        setIsOpen(true);
                    }}
                />
            )}
            <InputFormGroup<VehicleFormValues>
                label={'Power:'}
                name={'power'}
                type={'number'}
                step={0.01}
                register={register}
                registerOptions={{
                    required: 'Power is required',
                    valueAsNumber: true,
                }}
                error={formState.errors.power}
            />
            <SelectFormGroup<VehicleFormValues>
                label={'Gearbox:'}
                name={'gearbox'}
                control={control}
                options={[mapToOptionTypeWithKeys('auto', 'Automatic'), mapToOptionTypeWithKeys('man', 'Manual')]}
                error={formState.errors.gearbox}
                rules={{ required: 'Gearbox type is required' }}
            />
            <SwitchFormGroup<VehicleFormValues>
                label={'Front wheel drive:'}
                name={'frontWheelDrive'}
                control={control}
                error={formState.errors.frontWheelDrive}
            />
            <InputFormGroup<VehicleFormValues>
                label={'Doors count:'}
                name={'doorsCount'}
                type={'number'}
                step={0.01}
                register={register}
                registerOptions={{
                    required: 'Doors count is required',
                    valueAsNumber: true,
                }}
                error={formState.errors.doorsCount}
            />
            <InputFormGroup<VehicleFormValues>
                label={'Seats count:'}
                name={'seatsCount'}
                type={'number'}
                step={0.01}
                register={register}
                registerOptions={{
                    required: 'Seats count is required',
                    valueAsNumber: true,
                }}
                error={formState.errors.seatsCount}
            />
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={'Color:'}
                    name={'color'}
                    control={control}
                    options={vehicleOptions.colors.map(mapToOptionType)}
                    error={formState.errors.color}
                    displayAddButton
                    onClickAddButton={() => {
                        setSelectedModalOption(vehicleModalOptions.color);
                        setIsOpen(true);
                    }}
                />
            )}
            <SwitchFormGroup<VehicleFormValues>
                label={'Metallic:'}
                name={'metallic'}
                control={control}
                error={formState.errors.metallic}
            />
            <TextAreaFormGroup<VehicleFormValues>
                label={'Description:'}
                name={'description'}
                register={register}
                registerOptions={{ required: 'Description is required' }}
                error={formState.errors.description}
            />
            <InputFormGroup<VehicleFormValues>
                label={'Production year:'}
                name={'productionYear'}
                type={'number'}
                step={0.01}
                register={register}
                registerOptions={{
                    required: 'Production year is required',
                    valueAsNumber: true,
                }}
                error={formState.errors.productionYear}
            />
            <UploadInputFormGroup<VehicleFormValues>
                label={'Vehicle image:'}
                name={'vehicleImage'}
                control={control}
                error={formState.errors.vehicleImage}
                rules={{
                    validate: (value: string | number | boolean | FileWithPreview) => {
                        if (!value || !(value as FileWithPreview).name) {
                            return 'File is required';
                        }
                        return true;
                    },
                }}
            />
            {selectedModalOption && (
                <AddOptionModal
                    headerTitle={selectedModalOption.headerTitle}
                    optionLabel={selectedModalOption.optionLabel}
                    onSubmit={selectedModalOption.onSubmit}
                    loadVehicleOptions={loadVehicleOptions}
                    isOpen={modalIsOpen}
                    setIsOpen={setIsOpen}
                />
            )}
        </FormContainer>
    );
};
