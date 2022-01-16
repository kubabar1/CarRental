import React, { useEffect, useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { getUsersList } from '../../service/UserService';
import { Column } from 'react-table';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { ButtonTableItem } from '../../components/table/tab_items/ButtonTableItem';

export function UsersListSubpage(): JSX.Element {
    const [usersList, setUsersList] = useState<UserResponseDTO[]>([]);

    useEffect(() => {
        getUsersList().then((usersListResponse: UserResponseDTO[]) => {
            setUsersList(usersListResponse);
        });
    }, []);

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
                Header: 'User login',
                accessor: 'login',
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
                accessor: (row: UserResponseDTO) => {
                    return row.birthDate.toLocaleDateString();
                },
            },
            {
                Header: 'Pesel',
                accessor: 'pesel',
            },
            {
                Header: 'Edit',
                accessor: (user: UserResponseDTO) => ButtonTableItem('Edit', `/users/${user.id}/edit`, 'success'),
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Users list'} />
            <SubpageContent>
                <Table<UserResponseDTO> columns={columns} data={usersList} />
            </SubpageContent>
        </SubpageContainer>
    );
}
