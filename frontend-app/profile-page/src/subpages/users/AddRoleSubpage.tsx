import React, { useEffect, useState } from 'react';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { UserRoleResponseDTO } from '../../model/UserRoleResponseDTO';
import { FormContainer } from '../../components/form/form-group/FormContainer';
import { useHistory, useParams } from 'react-router-dom';
import { usersListPath } from '../../constants/Links';
import Select, { MultiValue } from 'react-select';
import { addRolesToUser, getAllUserRolesNotAssignedToUser } from '../../service/UserService';

type RoleAddEquipmentSelectOption = { value: string; label: string };

export function AddRoleSubpage(): JSX.Element {
    const history = useHistory();
    const { userId } = useParams<{ userId: string }>();
    const [allPossibleUserRoles, setAllPossibleUserRoles] = useState<RoleAddEquipmentSelectOption[]>([]);
    const [userRolesToAddList, setUserRolesToAddList] = useState<RoleAddEquipmentSelectOption[]>([]);

    useEffect(() => {
        getAllUserRolesNotAssignedToUser(userId).then((userRolesResponse: UserRoleResponseDTO[]) => {
            setAllPossibleUserRoles(
                userRolesResponse.map((userRolesResponse: UserRoleResponseDTO) =>
                    mapResponseToSelectOptions(userRolesResponse)
                )
            );
        });
    }, [userId]);

    const mapResponseToSelectOptions = (userRoleResponseDTO: UserRoleResponseDTO): RoleAddEquipmentSelectOption => {
        return { value: userRoleResponseDTO.id, label: userRoleResponseDTO.type };
    };

    return (
        <SubpageContainer>
            <SubpageHeader title={'Add user role'} />
            <SubpageContent>
                <FormContainer
                    onSubmit={() => {
                        if (userRolesToAddList.length) {
                            addRolesToUser(
                                userRolesToAddList.map((userRole: RoleAddEquipmentSelectOption) => userRole.value),
                                userId
                            );
                            history.push(usersListPath.link);
                        }
                    }}
                    isSubmitButtonDisabled={!userRolesToAddList.length}
                    submitButtonValue={'Add role'}
                >
                    <Select
                        value={userRolesToAddList}
                        options={allPossibleUserRoles}
                        isMulti
                        onChange={(roles: MultiValue<RoleAddEquipmentSelectOption>) => {
                            setUserRolesToAddList(roles as RoleAddEquipmentSelectOption[]);
                        }}
                    />
                </FormContainer>
            </SubpageContent>
        </SubpageContainer>
    );
}
