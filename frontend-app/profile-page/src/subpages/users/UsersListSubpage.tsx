import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { getUsersList } from '../../service/UserService';
import { Column } from 'react-table';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { ButtonTableItem } from '../../components/table/tab_items/ButtonTableItem';
import { UserRolesTableItem } from './tab_items/UserRolesTableItem';
import Page from '../../../../main-page/src/model/Page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faFingerprint, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './UsersListSubpage.scss';

export function UsersListSubpage(): JSX.Element {
    const [usersPage, setUsersPage] = useState<Page<UserResponseDTO> | undefined>(undefined);
    const columns = React.useMemo<Column<UserResponseDTO>[]>(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'User name',
                accessor: 'name',
            },
            {
                Header: 'User surname',
                accessor: 'surname',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Phone',
                accessor: 'phone',
            },
            {
                Header: 'Birth date',
                accessor: 'birthDate',
            },
            {
                Header: 'User roles',
                accessor: (user: UserResponseDTO) => {
                    return <UserRolesTableItem userRoles={user.userRoles} />;
                },
            },
            {
                Header: 'Actions',
                accessor: (user: UserResponseDTO) => {
                    return (
                        <div className="actions-column-item-container">
                            <ButtonTableItem
                                buttonText={<FontAwesomeIcon icon={faCog} />}
                                buttonRedirectPath={`/profile/users/${user.id}/edit`}
                                buttonVariant={'warning'}
                                tooltipMessage={'Settings'}
                            />
                            <ButtonTableItem
                                buttonText={<FontAwesomeIcon icon={faFingerprint} />}
                                buttonRedirectPath={`/profile/user-roles/add/${user.id}`}
                                buttonVariant={'success'}
                                tooltipMessage={'Update roles'}
                            />
                            <ButtonTableItem
                                buttonText={<FontAwesomeIcon icon={faEnvelope} />}
                                buttonRedirectPath={`/profile/email-send`}
                                buttonVariant={'info'}
                                buttonRedirectState={{
                                    emailAddress: user.email,
                                }}
                                tooltipMessage={'Send email'}
                            />
                        </div>
                    );
                },
            },
        ],
        []
    );

    const fetchData = React.useCallback((pageIndex, pageSize) => {
        getUsersList(pageIndex, pageSize).then((page: Page<UserResponseDTO>) => {
            setUsersPage(page);
        });
    }, []);

    return (
        <SubpageContainer className="user-list-subpage">
            <SubpageHeader title={'Users list'} />
            <SubpageContent>
                <Table<UserResponseDTO>
                    columns={columns}
                    data={usersPage ? usersPage.content : []}
                    fetchData={fetchData}
                    pageCount={usersPage?.totalPages}
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
