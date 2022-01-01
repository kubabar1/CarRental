import React, { ChangeEvent, useEffect, useState } from 'react';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { UserRoleResponseDTO } from '../../model/UserRoleResponseDTO';
import { getAllUserRoles, updateUserRoles } from '../../service/UserService';
import { FormContainer } from '../../components/form/FormContainer';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { userRolesListPath } from '../../constants/Links';

function AddRoleSubpage(): JSX.Element {
    const history = useHistory();
    const { userId } = useParams<{ userId: string }>();
    const [userRoles, setUserRoles] = useState<UserRoleResponseDTO[]>([]);
    const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>(undefined);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
    useEffect(() => {
        getAllUserRoles().then((userRolesResponse: UserRoleResponseDTO[]) => {
            setUserRoles(userRolesResponse);
        });
    }, []);

    return (
        <SubpageContainer>
            <SubpageHeader title={'Add user role'} />
            <SubpageContent>
                <FormContainer
                    onSubmit={() => {
                        if (selectedRoleId) {
                            updateUserRoles(selectedRoleId, userId);
                            history.push(userRolesListPath);
                        }
                    }}
                    isSubmitButtonDisabled={isSubmitButtonDisabled}
                    submitButtonValue={'Add role'}
                >
                    <select
                        className="form-control"
                        defaultValue={'null'}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                            setSelectedRoleId(event.target.value);
                            setIsSubmitButtonDisabled(false);
                        }}
                    >
                        <option key="disabled_role" value="null" disabled>
                            Choose role
                        </option>
                        {userRoles.map((userRole: UserRoleResponseDTO) => {
                            return <option key={userRole.id}>{userRole.type}</option>;
                        })}
                    </select>
                </FormContainer>
            </SubpageContent>
        </SubpageContainer>
    );
}

export default withRouter(AddRoleSubpage);
