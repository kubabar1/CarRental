import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { getAllUserRoles } from '../../service/UserService';
import { Column } from 'react-table';
import { UserRoleResponseDTO } from '../../model/UserRoleResponseDTO';

export function UsersRolesListSubpage(): JSX.Element {
    const [allUserRoles, setAllUserRoles] = useState<UserRoleResponseDTO[]>([]);
    const columns = React.useMemo<Column<UserRoleResponseDTO>[]>(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Type',
                accessor: 'type',
            },
        ],
        []
    );

    const fetchData = React.useCallback(() => {
        getAllUserRoles().then((userRoleResponseDTOS: UserRoleResponseDTO[]) => {
            setAllUserRoles(userRoleResponseDTOS);
        });
    }, []);

    return (
        <SubpageContainer>
            <SubpageHeader title={'Users with roles list'} />
            <SubpageContent>
                <Table<UserRoleResponseDTO> columns={columns} data={allUserRoles} fetchData={fetchData} />
            </SubpageContent>
        </SubpageContainer>
    );
}
