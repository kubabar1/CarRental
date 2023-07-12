import React from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { InputFormGroup } from '../../components/form/form-group/input/InputFormGroup';
import { FormContainer } from '../../components/form/form-group/FormContainer';
import { useForm } from 'react-hook-form';
import { LocationService, TranslationService } from '@car-rental/shared/service';
import { LocationAddDTO } from '@car-rental/shared/model';
import { locationsListPath } from '../../constants/Links';
import { useHistory } from 'react-router-dom';

interface LocationAddFormValues {
    country: string;
    city: string;
    streetAndNb: string;
    code: string;
    email: string;
    phone: string;
}

export function LocationAddSubpage(): JSX.Element {
    const { register, formState, handleSubmit } = useForm<LocationAddFormValues>({
        mode: 'onChange',
        defaultValues: {
            country: '',
            city: '',
            streetAndNb: '',
            code: '',
            email: '',
            phone: '',
        },
    });
    const history = useHistory();
    const maxLengths = {
        country: 50,
        city: 150,
        streetAndNb: 150,
        code: 20,
        email: 255,
        phone: 30,
    };

    const onSubmit = (data: LocationAddFormValues): void => {
        LocationService.addLocation(
            new LocationAddDTO(data.country, data.city, data.streetAndNb, data.code, data.email, data.phone)
        ).then(() => {
            history.push(locationsListPath.link);
        });
    };

    return (
        <SubpageContainer className="location-add-container">
            <SubpageHeader title={TranslationService.translate('addLocationSubpageTitle')} />
            <SubpageContent>
                <FormContainer
                    onSubmit={handleSubmit(onSubmit)}
                    submitButtonValue={TranslationService.translate('addLocationSubpageCreateButton')}
                >
                    <InputFormGroup<LocationAddFormValues>
                        label={TranslationService.translate('countryAddLocationSubpageLabel')}
                        name={'country'}
                        register={register}
                        registerOptions={{
                            required: TranslationService.translate('countryAddLocationSubpageRequired'),
                            maxLength: {
                                value: maxLengths.country,
                                message: TranslationService.translate('countryAddLocationSubpageMaxLength', [
                                    maxLengths.country,
                                ]),
                            },
                        }}
                        error={formState.errors.country}
                    />
                    <InputFormGroup<LocationAddFormValues>
                        label={TranslationService.translate('cityAddLocationSubpageLabel')}
                        name={'city'}
                        register={register}
                        registerOptions={{
                            required: TranslationService.translate('cityAddLocationSubpageRequired'),
                            maxLength: {
                                value: maxLengths.city,
                                message: TranslationService.translate('cityAddLocationSubpageMaxLength', [
                                    maxLengths.city,
                                ]),
                            },
                        }}
                        error={formState.errors.city}
                    />
                    <InputFormGroup<LocationAddFormValues>
                        label={TranslationService.translate('streetAndNbAddLocationSubpageLabel')}
                        name={'streetAndNb'}
                        register={register}
                        registerOptions={{
                            required: TranslationService.translate('streetAndNbAddLocationSubpageRequired'),
                            maxLength: {
                                value: maxLengths.streetAndNb,
                                message: TranslationService.translate('streetAndNbAddLocationSubpageMaxLength', [
                                    maxLengths.streetAndNb,
                                ]),
                            },
                        }}
                        error={formState.errors.streetAndNb}
                    />
                    <InputFormGroup<LocationAddFormValues>
                        label={TranslationService.translate('codeAddLocationSubpageLabel')}
                        name={'code'}
                        register={register}
                        registerOptions={{
                            required: TranslationService.translate('codeAddLocationSubpageRequired'),
                            maxLength: {
                                value: maxLengths.code,
                                message: TranslationService.translate('codeAddLocationSubpageMaxLength', [
                                    maxLengths.code,
                                ]),
                            },
                        }}
                        error={formState.errors.code}
                    />
                    <InputFormGroup<LocationAddFormValues>
                        label={TranslationService.translate('emailAddLocationSubpageLabel')}
                        name={'email'}
                        register={register}
                        registerOptions={{
                            required: TranslationService.translate('emailAddLocationSubpageRequired'),
                            maxLength: {
                                value: maxLengths.email,
                                message: TranslationService.translate('emailAddLocationSubpageMaxLength', [
                                    maxLengths.email,
                                ]),
                            },
                        }}
                        error={formState.errors.email}
                    />
                    <InputFormGroup<LocationAddFormValues>
                        label={TranslationService.translate('phoneAddLocationSubpageLabel')}
                        name={'phone'}
                        register={register}
                        registerOptions={{
                            required: TranslationService.translate('phoneAddLocationSubpageRequired'),
                            maxLength: {
                                value: maxLengths.phone,
                                message: TranslationService.translate('phoneAddLocationSubpageMaxLength', [
                                    maxLengths.phone,
                                ]),
                            },
                        }}
                        error={formState.errors.phone}
                    />
                </FormContainer>
            </SubpageContent>
        </SubpageContainer>
    );
}
