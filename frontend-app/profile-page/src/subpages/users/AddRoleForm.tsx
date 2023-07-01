import React, { useEffect, useState } from 'react';
import { UserRoleResponseDTO } from '@car-rental/shared/model';
import { FormContainer } from '../../components/form/form-group/FormContainer';
import { useHistory, useParams } from 'react-router-dom';
import { usersListPath } from '../../constants/Links';
import { UserService } from '@car-rental/shared/service';
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
                    mapToOptionTypeWithKeys(userRolesResponse.id, userRolesResponse.label)
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
            submitButtonValue={'Update roles'}
        >
            <SelectFormGroup<AddRoleFormValues, true>
                label={'User roles:'}
                name={'userRoles'}
                control={control}
                options={allPossibleUserRoles}
                error={formState.errors.userRoles}
                isMulti={true}
            />
        </FormContainer>
    );
}
