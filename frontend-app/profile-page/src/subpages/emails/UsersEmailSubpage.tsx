import React, { useEffect, useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { getUsersList } from '../../service/UserService';
import { Column } from 'react-table';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { ButtonTableItem } from '../../components/table/tab_items/ButtonTableItem';
import Page from '../../../../main-page/src/model/Page';

export function UsersEmailSubpage(): JSX.Element {
    const [usersPage, setUsersPage] = useState<Page<UserResponseDTO> | undefined>(undefined);

    useEffect(() => {
        getUsersList().then((usersListResponse: Page<UserResponseDTO>) => {
            setUsersPage(usersListResponse);
        });
    }, []);

    const columns = React.useMemo<Column<UserResponseDTO>[]>(
        () => [
            {
                Header: 'User ID',
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
                Header: 'User login',
                accessor: 'login',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Action',
                accessor: (user: UserResponseDTO) => ButtonTableItem('Send email', `/email-send/${user.id}`, 'success'),
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Send email - user list'} />
            <SubpageContent>
                {usersPage && <Table<UserResponseDTO> columns={columns} data={usersPage.content} />}
            </SubpageContent>
        </SubpageContainer>
    );
}
