import React, { useEffect, useState } from 'react';
import { UserRoleResponseDTO } from '@car-rental/shared/model';
import { FormContainer } from '../../components/form/form-group/FormContainer';
import { useHistory, useParams } from 'react-router-dom';
import { usersListPath } from '../../constants/Links';
import { TranslationService, UserService } from '@car-rental/shared/service';
import {
    mapToOptionTypeWithKeys,
    OptionType,
    SelectFormGroup,
} from '../../components/form/form-group/select/SelectFormGroup';
import { useForm } from 'react-hook-form';

type AddRoleFormValues = {
    userRoles: string[];
};

interface AddRoleFormProperties {
    currentUserRoles: string[];
}

export function AddRoleForm({ currentUserRoles }: AddRoleFormProperties): JSX.Element {
    const history = useHistory();
    const { userId } = useParams<{ userId: string }>();
    const [allPossibleUserRoles, setAllPossibleUserRoles] = useState<OptionType[]>([]);
    const { formState, control, handleSubmit } = useForm<AddRoleFormValues>({
        mode: 'onChange',
        defaultValues: {
            userRoles: currentUserRoles,
        },
    });

    useEffect(() => {
        UserService.getAllUserRoles().then((userRolesResponse: UserRoleResponseDTO[]) => {
            setAllPossibleUserRoles(
                userRolesResponse.map((userRolesResponse: UserRoleResponseDTO) =>
                    mapToOptionTypeWithKeys(userRolesResponse.id, TranslationService.translate(userRolesResponse.type))
                )
            );
        });
    }, [userId]);

    const onSubmit = (data: AddRoleFormValues): void => {
        UserService.addRolesToUser(data.userRoles, userId).then(() => {
            history.push(usersListPath.link);
        });
    };

    return (
        <FormContainer
            onSubmit={handleSubmit(onSubmit)}
            isSubmitButtonDisabled={!formState.isValid || !formState.isDirty}
            submitButtonValue={TranslationService.translate('userRolesAddUserRoleSubpageUpdateButton')}
        >
            <SelectFormGroup<AddRoleFormValues, true>
                label={TranslationService.translate('userRolesAddUserRoleSubpageLabel')}
                name={'userRoles'}
                control={control}
                options={allPossibleUserRoles}
                error={formState.errors.userRoles?.message}
                isMulti={true}
            />
        </FormContainer>
    );
}
