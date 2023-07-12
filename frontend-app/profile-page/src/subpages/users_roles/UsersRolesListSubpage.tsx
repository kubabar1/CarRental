import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { TranslationService, UserService } from '@car-rental/shared/service';
import { Column } from 'react-table';
import { UserRoleResponseDTO } from '@car-rental/shared/model';

export function UsersRolesListSubpage(): JSX.Element {
    const [allUserRoles, setAllUserRoles] = useState<UserRoleResponseDTO[]>([]);
    const columns = React.useMemo<Column<UserRoleResponseDTO>[]>(
        () => [
            {
                id: 'id',
                Header: TranslationService.translate('idUsersWithRolesListSubpageLabel'),
                accessor: 'id',
                disableFilters: true,
                disableSortBy: true,
            },
            {
                id: 'type',
                Header: TranslationService.translate('typeUsersWithRolesListSubpageLabel'),
                accessor: 'type',
                disableFilters: true,
                disableSortBy: true,
            },
            {
                id: 'label',
                Header: TranslationService.translate('labelUsersWithRolesListSubpageLabel'),
                accessor: 'label',
                disableFilters: true,
                disableSortBy: true,
            },
        ],
        []
    );

    const fetchData = React.useCallback((): Promise<void> => {
        return UserService.getAllUserRoles().then((userRoleResponseDTOS: UserRoleResponseDTO[]) => {
            setAllUserRoles(userRoleResponseDTOS);
        });
    }, []);

    return (
        <SubpageContainer>
            <SubpageHeader title={TranslationService.translate('usersWithRolesListSubpageTitle')} />
            <SubpageContent>
                <Table<UserRoleResponseDTO> columns={columns} data={allUserRoles} fetchData={fetchData} />
            </SubpageContent>
        </SubpageContainer>
    );
}
