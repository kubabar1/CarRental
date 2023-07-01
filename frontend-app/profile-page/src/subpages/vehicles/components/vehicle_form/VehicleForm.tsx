import React, { useCallback, useEffect, useState } from 'react';
import { InputFormGroup } from '../../../../components/form/form-group/input/InputFormGroup';
import { VehicleStatCodeEnum, VehicleDetailsDTO, VehiclePersistDTO, ResponseData } from '@car-rental/shared/model';
import { TextAreaFormGroup } from '../../../../components/form/form-group/text-area/TextAreaFormGroup';
import { FormContainer } from '../../../../components/form/form-group/FormContainer';
import { RegisterOptions, useForm } from 'react-hook-form';
import {
    mapToOptionType,
    mapToOptionTypeWithKeys,
    SelectFormGroup,
} from '../../../../components/form/form-group/select/SelectFormGroup';
import { VehicleService } from '@car-rental/shared/service';
import { SwitchFormGroup } from '../../../../components/form/form-group/switch/SwitchFormGroup';
import { UploadInputFormGroup } from '../../../../components/form/form-group/upload/UploadInputFormGroup';
import { FileWithPreview } from '../../../../components/form/form-group/upload/Dropzone';
import { AddOptionModal } from './add_option_modal/AddOptionModal';
import {
    VehicleModelDTO,
    VehicleResponseDTO,
    VehicleOptionsDTO,
    LocalisationResponseDTO,
    OptionDTO,
} from '@car-rental/shared/model';
import { useHistory } from 'react-router-dom';

export interface VehicleFormProperties {
    onSubmitAction: (
        vehiclePersistDTO: VehiclePersistDTO,
        vehicleImage: File
    ) => Promise<ResponseData<VehicleResponseDTO>>;
    vehicleDefaultValues: VehicleFormValues;
    submitButtonValue: string;
    redirectToEquipmentList?: boolean;
    isDirtyCheckEnabled?: boolean;
}

export type VehicleFormValues = {
    brand: string;
    model: string;
    dailyFee: number;
    registration: string;
    location: string;
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
    registerOptions?: RegisterOptions;
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
    redirectToEquipmentList = false,
    isDirtyCheckEnabled = false,
}: VehicleFormProperties): JSX.Element => {
    const history = useHistory();
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
                VehicleService.addBrand(new OptionDTO(value)).then(() => {
                    loadVehicleOptions();
                    setIsOpen(false);
                });
            },
            registerOptions: {
                required: 'Brand cannot be empty',
                maxLength: {
                    value: 50,
                    message: 'Brand name cannot be longer than 50',
                },
            },
        },
        model: {
            headerTitle: 'Add model',
            optionLabel: 'Model:',
            onSubmit: (value: string) => {
                VehicleService.addModel(new VehicleModelDTO(watchBrand, value)).then(() => {
                    loadVehicleOptions();
                    loadVehicleModels();
                    setIsOpen(false);
                });
            },
            registerOptions: {
                required: 'Model cannot be empty',
                maxLength: {
                    value: 50,
                    message: 'Model name cannot be longer than 50',
                },
            },
        },
        bodyType: {
            headerTitle: 'Add body type',
            optionLabel: 'Body type:',
            onSubmit: (value: string) => {
                VehicleService.addBodyType(new OptionDTO(value)).then(() => {
                    loadVehicleOptions();
                    setIsOpen(false);
                });
            },
            registerOptions: {
                required: 'Body type cannot be empty',
                maxLength: {
                    value: 50,
                    message: 'Body type cannot be longer than 50',
                },
            },
        },
        fuelType: {
            headerTitle: 'Add fuel type',
            optionLabel: 'Fuel type:',
            onSubmit: (value: string) => {
                VehicleService.addFuelType(new OptionDTO(value)).then(() => {
                    loadVehicleOptions();
                    setIsOpen(false);
                });
            },
            registerOptions: {
                required: 'Fuel type cannot be empty',
                maxLength: {
                    value: 50,
                    message: 'Fuel type cannot be longer than 50',
                },
            },
        },
        color: {
            headerTitle: 'Add color',
            optionLabel: 'Color:',
            onSubmit: (value: string) => {
                VehicleService.addColor(new OptionDTO(value)).then(() => {
                    loadVehicleOptions();
                    setIsOpen(false);
                });
            },
            registerOptions: {
                required: 'Color cannot be empty',
                maxLength: {
                    value: 50,
                    message: 'Color name cannot be longer than 50',
                },
            },
        },
    };
    const watchBrand: string = watch('brand');

    const loadVehicleModels = useCallback(() => {
        if (watchBrand) {
            VehicleService.getVehicleModelsByBrand(watchBrand).then((models: string[]) => {
                setVehicleModels(models);
            });
        } else {
            setVehicleModels([]);
        }
    }, [watchBrand]);

    useEffect(() => {
        loadVehicleOptions();
    }, []);

    useEffect(() => {
        loadVehicleModels();
    }, [watchBrand, loadVehicleModels]);

    const loadVehicleOptions = (): void => {
        VehicleService.getVehicleOptions().then((vehicleDefaultParams: VehicleOptionsDTO) => {
            setVehicleOptions(vehicleDefaultParams);
        });
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
        ).then((response: ResponseData<VehicleResponseDTO>) => {
            if (redirectToEquipmentList && response.responseBody && response.responseBody.id) {
                history.push(`/profile/vehicles/${response.responseBody.id}/equipment`);
            }
        });
    };

    return (
        <FormContainer
            submitButtonValue={submitButtonValue}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitButtonDisabled={isDirtyCheckEnabled ? !formState.isValid || !formState.isDirty : !formState.isValid}
        >
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={'Brand:'}
                    name={'brand'}
                    control={control}
                    options={vehicleOptions.brands.map(mapToOptionType)}
                    error={formState.errors.brand?.message}
                    displayAddButton
                    onClickAddButton={() => {
                        setSelectedModalOption(vehicleModalOptions.brand);
                        setIsOpen(true);
                    }}
                    rules={{
                        required: 'Brand is required',
                    }}
                />
            )}
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={'Model:'}
                    name={'model'}
                    control={control}
                    options={vehicleModels.map(mapToOptionType)}
                    error={formState.errors.model?.message}
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
                label={'Daily fee (USD):'}
                name={'dailyFee'}
                type={'number'}
                step={0.01}
                register={register}
                min={0}
                registerOptions={{
                    required: 'Daily fee is required',
                    valueAsNumber: true,
                    min: 0,
                }}
                error={formState.errors.dailyFee}
            />
            <InputFormGroup<VehicleFormValues>
                label={'Registration:'}
                name={'registration'}
                register={register}
                registerOptions={{
                    required: 'Registration is required',
                    maxLength: {
                        value: 20,
                        message: 'Registration cannot be longer than 50',
                    },
                }}
                error={formState.errors.registration}
            />
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={'Location:'}
                    name={'location'}
                    control={control}
                    options={vehicleOptions.locations.map((location: LocalisationResponseDTO) =>
                        mapToOptionTypeWithKeys(
                            location.id,
                            `${location.country}, ${location.city}, ${location.streetAndNb}`
                        )
                    )}
                    error={formState.errors.location?.message}
                    rules={{
                        required: 'Registration is required',
                    }}
                />
            )}
            <SelectFormGroup<VehicleFormValues>
                label={'Status:'}
                name={'vehicleStatus'}
                control={control}
                options={[
                    mapToOptionTypeWithKeys(VehicleStatCodeEnum.UAV, 'Unavailable'),
                    mapToOptionTypeWithKeys(VehicleStatCodeEnum.AVI, 'Available'),
                    mapToOptionTypeWithKeys(VehicleStatCodeEnum.RMV, 'Removed'),
                ]}
                error={formState.errors.vehicleStatus?.message}
                rules={{
                    required: 'Vehicle status is required',
                }}
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
                    error={formState.errors.bodyType?.message}
                    displayAddButton
                    onClickAddButton={() => {
                        setSelectedModalOption(vehicleModalOptions.bodyType);
                        setIsOpen(true);
                    }}
                    rules={{
                        required: 'Body type is required',
                    }}
                />
            )}
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={'Fuel type:'}
                    name={'fuelType'}
                    control={control}
                    options={vehicleOptions.fuelTypes.map(mapToOptionType)}
                    error={formState.errors.fuelType?.message}
                    displayAddButton
                    onClickAddButton={() => {
                        setSelectedModalOption(vehicleModalOptions.fuelType);
                        setIsOpen(true);
                    }}
                    rules={{
                        required: 'Fuel type is required',
                    }}
                />
            )}
            <InputFormGroup<VehicleFormValues>
                label={'Power (HP):'}
                name={'power'}
                type={'number'}
                min={0}
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
                error={formState.errors.gearbox?.message}
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
                min={0}
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
                min={0}
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
                    error={formState.errors.color?.message}
                    displayAddButton
                    onClickAddButton={() => {
                        setSelectedModalOption(vehicleModalOptions.color);
                        setIsOpen(true);
                    }}
                    rules={{
                        required: 'Color is required',
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
                register={register}
                registerOptions={{
                    required: 'Production year is required',
                    min: {
                        value: 1900,
                        message: 'Production year cannot be below 1900',
                    },
                    valueAsNumber: true,
                }}
                error={formState.errors.productionYear}
            />
            <UploadInputFormGroup<VehicleFormValues>
                label={'Vehicle image:'}
                name={'vehicleImage'}
                control={control}
                error={formState.errors.vehicleImage?.message}
                rules={{
                    validate: (value: string | number | boolean | unknown | FileWithPreview) => {
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
                    registerOptions={selectedModalOption.registerOptions}
                    loadVehicleOptions={loadVehicleOptions}
                    isOpen={modalIsOpen}
                    setIsOpen={setIsOpen}
                />
            )}
        </FormContainer>
    );
};
