import React from 'react';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { InputFormGroup } from '../../components/form/form-group/input/InputFormGroup';
import { FormContainer } from '../../components/form/form-group/FormContainer';
import { useForm } from 'react-hook-form';
import { addLocation } from '../../service/LocationService';
import { LocationAddDTO } from '../../model/LocationAddDTO';
import { locationsListPath, usersListPath } from '../../constants/Links';
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
        addLocation(
            new LocationAddDTO(data.country, data.city, data.streetAndNb, data.code, data.email, data.phone)
        ).then(() => {
            history.push(locationsListPath.link);
        });
    };

    return (
        <SubpageContainer className="location-add-container">
            <SubpageHeader title={'Add location'} />
            <SubpageContent>
                <FormContainer onSubmit={handleSubmit(onSubmit)} submitButtonValue={'Create'}>
                    <InputFormGroup<LocationAddFormValues>
                        label={'Country:'}
                        name={'country'}
                        register={register}
                        registerOptions={{
                            required: 'Country is required',
                            maxLength: {
                                value: maxLengths.country,
                                message: `Code cannot be longer than ${maxLengths.country}`,
                            },
                        }}
                        error={formState.errors.country}
                    />
                    <InputFormGroup<LocationAddFormValues>
                        label={'City:'}
                        name={'city'}
                        register={register}
                        registerOptions={{
                            required: 'City is required',
                            maxLength: {
                                value: maxLengths.city,
                                message: `City cannot be longer than ${maxLengths.city}`,
                            },
                        }}
                        error={formState.errors.city}
                    />
                    <InputFormGroup<LocationAddFormValues>
                        label={'Street and number:'}
                        name={'streetAndNb'}
                        register={register}
                        registerOptions={{
                            required: 'Street and number is required',
                            maxLength: {
                                value: maxLengths.streetAndNb,
                                message: `Street and number cannot be longer than ${maxLengths.streetAndNb}`,
                            },
                        }}
                        error={formState.errors.streetAndNb}
                    />
                    <InputFormGroup<LocationAddFormValues>
                        label={'Code:'}
                        name={'code'}
                        register={register}
                        registerOptions={{
                            required: 'Code is required',
                            maxLength: {
                                value: maxLengths.code,
                                message: `Code cannot be longer than ${maxLengths.code}`,
                            },
                        }}
                        error={formState.errors.code}
                    />
                    <InputFormGroup<LocationAddFormValues>
                        label={'Email:'}
                        name={'email'}
                        register={register}
                        registerOptions={{
                            required: 'Email is required',
                            maxLength: {
                                value: maxLengths.email,
                                message: `Email cannot be longer than ${maxLengths.email}`,
                            },
                        }}
                        error={formState.errors.email}
                    />
                    <InputFormGroup<LocationAddFormValues>
                        label={'Phone:'}
                        name={'phone'}
                        register={register}
                        registerOptions={{
                            required: 'Phone is required',
                            maxLength: {
                                value: maxLengths.phone,
                                message: `Phone cannot be longer than ${maxLengths.phone}`,
                            },
                        }}
                        error={formState.errors.phone}
                    />
                </FormContainer>
            </SubpageContent>
        </SubpageContainer>
    );
}
