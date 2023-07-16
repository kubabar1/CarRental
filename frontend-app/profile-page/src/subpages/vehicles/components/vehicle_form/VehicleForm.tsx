import React, { useCallback, useEffect, useState } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { InputFormGroup } from '../../../../components/form/form-group/input/InputFormGroup';
import { TextAreaFormGroup } from '../../../../components/form/form-group/text-area/TextAreaFormGroup';
import { FormContainer } from '../../../../components/form/form-group/FormContainer';
import {
    mapToOptionType,
    mapToOptionTypeWithKeys,
    SelectFormGroup,
} from '../../../../components/form/form-group/select/SelectFormGroup';
import { SwitchFormGroup } from '../../../../components/form/form-group/switch/SwitchFormGroup';
import { UploadInputFormGroup } from '../../../../components/form/form-group/upload/UploadInputFormGroup';
import { FileWithPreview } from '../../../../components/form/form-group/upload/Dropzone';
import { AddOptionModal } from './add_option_modal/AddOptionModal';
import { TranslationService, VehicleService } from '@car-rental/shared/service';
import {
    VehicleModelDTO,
    VehicleResponseDTO,
    VehicleOptionsDTO,
    LocalisationResponseDTO,
    OptionDTO,
    VehicleDetailsDTO,
    VehiclePersistDTO,
    ResponseData,
} from '@car-rental/shared/model';

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
            headerTitle: TranslationService.translate('brandHeaderVehicleFormAddOption'),
            optionLabel: TranslationService.translate('brandLabelVehicleFormAddOption'),
            onSubmit: (value: string) => {
                VehicleService.addBrand(new OptionDTO(value)).then(() => {
                    loadVehicleOptions();
                    setIsOpen(false);
                });
            },
            registerOptions: {
                required: TranslationService.translate('brandVehicleFormAddOptionRequired'),
                maxLength: {
                    value: 50,
                    message: TranslationService.translate('brandVehicleFormAddOptionMaxLength'),
                },
            },
        },
        model: {
            headerTitle: TranslationService.translate('modelHeaderVehicleFormAddOption'),
            optionLabel: TranslationService.translate('modelLabelVehicleFormAddOption'),
            onSubmit: (value: string) => {
                VehicleService.addModel(new VehicleModelDTO(watchBrand, value)).then(() => {
                    loadVehicleOptions();
                    loadVehicleModels();
                    setIsOpen(false);
                });
            },
            registerOptions: {
                required: TranslationService.translate('modelVehicleFormAddOptionRequired'),
                maxLength: {
                    value: 50,
                    message: TranslationService.translate('modelVehicleFormAddOptionMaxLength'),
                },
            },
        },
        bodyType: {
            headerTitle: TranslationService.translate('bodyTypeHeaderVehicleFormAddOption'),
            optionLabel: TranslationService.translate('bodyTypeLabelVehicleFormAddOption'),
            onSubmit: (value: string) => {
                VehicleService.addBodyType(new OptionDTO(value)).then(() => {
                    loadVehicleOptions();
                    setIsOpen(false);
                });
            },
            registerOptions: {
                required: TranslationService.translate('bodyTypeVehicleFormAddOptionRequired'),
                maxLength: {
                    value: 50,
                    message: TranslationService.translate('bodyTypeVehicleFormAddOptionMaxLength'),
                },
            },
        },
        fuelType: {
            headerTitle: TranslationService.translate('fuelTypeHeaderVehicleFormAddOption'),
            optionLabel: TranslationService.translate('fuelTypeLabelVehicleFormAddOption'),
            onSubmit: (value: string) => {
                VehicleService.addFuelType(new OptionDTO(value)).then(() => {
                    loadVehicleOptions();
                    setIsOpen(false);
                });
            },
            registerOptions: {
                required: TranslationService.translate('fuelTypeVehicleFormAddOptionRequired'),
                maxLength: {
                    value: 50,
                    message: TranslationService.translate('fuelTypeVehicleFormAddOptionMaxLength'),
                },
            },
        },
        color: {
            headerTitle: TranslationService.translate('colorHeaderVehicleFormAddOption'),
            optionLabel: TranslationService.translate('colorLabelVehicleFormAddOption'),
            onSubmit: (value: string) => {
                VehicleService.addColor(new OptionDTO(value)).then(() => {
                    loadVehicleOptions();
                    setIsOpen(false);
                });
            },
            registerOptions: {
                required: TranslationService.translate('colorVehicleFormAddOptionRequired'),
                maxLength: {
                    value: 50,
                    message: TranslationService.translate('colorVehicleFormAddOptionMaxLength'),
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
                    label={TranslationService.translate('brandLabelVehicleForm')}
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
                        required: TranslationService.translate('brandVehicleFormRequired'),
                    }}
                />
            )}
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={TranslationService.translate('modelLabelVehicleForm')}
                    name={'model'}
                    control={control}
                    options={vehicleModels.map(mapToOptionType)}
                    error={formState.errors.model?.message}
                    rules={{ required: TranslationService.translate('modelVehicleFormRequired') }}
                    displayAddButton
                    onClickAddButton={() => {
                        setSelectedModalOption(vehicleModalOptions.model);
                        setIsOpen(true);
                    }}
                    isAddButtonDisabled={!watchBrand}
                />
            )}
            <InputFormGroup<VehicleFormValues>
                label={TranslationService.translate('dailyFeeLabelVehicleForm')}
                name={'dailyFee'}
                type={'number'}
                step={0.01}
                register={register}
                min={0}
                registerOptions={{
                    required: TranslationService.translate('dailyFeeVehicleFormRequired'),
                    valueAsNumber: true,
                    min: 0,
                }}
                error={formState.errors.dailyFee}
            />
            <InputFormGroup<VehicleFormValues>
                label={TranslationService.translate('registrationLabelVehicleForm')}
                name={'registration'}
                register={register}
                registerOptions={{
                    required: TranslationService.translate('registrationVehicleFormRequired'),
                    maxLength: {
                        value: 20,
                        message: TranslationService.translate('registrationVehicleFormMaxLength'),
                    },
                }}
                error={formState.errors.registration}
            />
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={TranslationService.translate('locationLabelVehicleForm')}
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
                        required: TranslationService.translate('registrationVehicleFormRequired'),
                    }}
                />
            )}
            <SwitchFormGroup<VehicleFormValues>
                label={TranslationService.translate('bestOfferLabelVehicleForm')}
                name={'bestOffer'}
                control={control}
                error={formState.errors.bestOffer}
            />
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={TranslationService.translate('bodyTypeLabelVehicleForm')}
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
                        required: TranslationService.translate('bodyTypeVehicleFormRequired'),
                    }}
                />
            )}
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={TranslationService.translate('fuelTypeLabelVehicleForm')}
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
                        required: TranslationService.translate('fuelTypeVehicleFormRequired'),
                    }}
                />
            )}
            <InputFormGroup<VehicleFormValues>
                label={TranslationService.translate('powerLabelVehicleForm')}
                name={'power'}
                type={'number'}
                min={0}
                register={register}
                registerOptions={{
                    required: TranslationService.translate('powerVehicleFormRequired'),
                    valueAsNumber: true,
                }}
                error={formState.errors.power}
            />
            <SelectFormGroup<VehicleFormValues>
                label={TranslationService.translate('gearboxLabelVehicleForm')}
                name={'gearbox'}
                control={control}
                options={[
                    mapToOptionTypeWithKeys('auto', TranslationService.translate('gearboxLabelVehicleFormOptionAuto')),
                    mapToOptionTypeWithKeys('man', TranslationService.translate('gearboxLabelVehicleFormOptionMan')),
                ]}
                error={formState.errors.gearbox?.message}
                rules={{ required: TranslationService.translate('gearboxVehicleFormRequired') }}
            />
            <SwitchFormGroup<VehicleFormValues>
                label={TranslationService.translate('frontWheelDriveLabelVehicleForm')}
                name={'frontWheelDrive'}
                control={control}
                error={formState.errors.frontWheelDrive}
            />
            <InputFormGroup<VehicleFormValues>
                label={TranslationService.translate('doorsCountLabelVehicleForm')}
                name={'doorsCount'}
                type={'number'}
                min={0}
                register={register}
                registerOptions={{
                    required: TranslationService.translate('doorsCountVehicleFormRequired'),
                    valueAsNumber: true,
                }}
                error={formState.errors.doorsCount}
            />
            <InputFormGroup<VehicleFormValues>
                label={TranslationService.translate('seatsCountLabelVehicleForm')}
                name={'seatsCount'}
                type={'number'}
                min={0}
                register={register}
                registerOptions={{
                    required: TranslationService.translate('seatsCountVehicleFormRequired'),
                    valueAsNumber: true,
                }}
                error={formState.errors.seatsCount}
            />
            {vehicleOptions && (
                <SelectFormGroup<VehicleFormValues>
                    label={TranslationService.translate('colorLabelVehicleForm')}
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
                        required: TranslationService.translate('colorVehicleFormRequired'),
                    }}
                />
            )}
            <SwitchFormGroup<VehicleFormValues>
                label={TranslationService.translate('metallicLabelVehicleForm')}
                name={'metallic'}
                control={control}
                error={formState.errors.metallic}
            />
            <TextAreaFormGroup<VehicleFormValues>
                label={TranslationService.translate('descriptionLabelVehicleForm')}
                name={'description'}
                register={register}
                registerOptions={{ required: TranslationService.translate('descriptionVehicleFormRequired') }}
                error={formState.errors.description}
            />
            <InputFormGroup<VehicleFormValues>
                label={TranslationService.translate('productionYearLabelVehicleForm')}
                name={'productionYear'}
                type={'number'}
                register={register}
                registerOptions={{
                    required: TranslationService.translate('productionYearVehicleFormRequired'),
                    min: {
                        value: 1900,
                        message: TranslationService.translate('productionYearVehicleFormMin'),
                    },
                    valueAsNumber: true,
                }}
                error={formState.errors.productionYear}
            />
            <UploadInputFormGroup<VehicleFormValues>
                label={TranslationService.translate('vehicleImageLabelVehicleForm')}
                name={'vehicleImage'}
                control={control}
                error={formState.errors.vehicleImage?.message}
                rules={{
                    validate: (value: string | number | boolean | unknown | FileWithPreview) => {
                        if (!value || !(value as FileWithPreview).name) {
                            return TranslationService.translate('vehicleImageVehicleFormRequired');
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
