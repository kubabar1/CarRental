import React, { useState } from 'react';
import { TableWithRef } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { getAllUserRoles, getUsersList } from '../../service/UserService';
import { Column, HeaderProps } from 'react-table';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { ButtonTableItem } from '../../components/table/tab_items/button_table_item/ButtonTableItem';
import { UserRolesTableItem } from './tab_items/UserRolesTableItem';
import Page from '../../../../main-page/src/model/Page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faFingerprint, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './UsersListSubpage.scss';
import {
    SelectColumnFilter,
    SelectColumnFilterOption,
} from '../../components/table/tab_items/select_column_filter/SelectColumnFilter';
import { UserRoleResponseDTO } from '../../model/UserRoleResponseDTO';
import { RangeColumnFilter } from '../../components/table/tab_items/slider_column_filter/RangeColumnFilter';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export function UsersListSubpage(): JSX.Element {
    const history = useHistory();
    const [usersPage, setUsersPage] = useState<Page<UserResponseDTO> | undefined>(undefined);
    const [userRoles, setUserRoles] = useState<UserRoleResponseDTO[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const ref = React.useCallback((node) => {
        if (node && node.selectedRowIds) {
            setSelectedRowIds(Object.keys(node.selectedRowIds).map((it: string) => parseInt(it)));
        }
    }, []);

    React.useEffect(() => {
        getAllUserRoles().then((roles: UserRoleResponseDTO[]) => {
            setUserRoles(roles);
        });
    }, []);

    const columns = React.useMemo<Column<UserResponseDTO>[]>(
        () => [
            {
                id: 'id',
                Header: 'ID',
                accessor: 'id',
            },
            {
                id: 'name',
                Header: 'User name',
                accessor: 'name',
            },
            {
                id: 'surname',
                Header: 'User surname',
                accessor: 'surname',
            },
            {
                id: 'email',
                Header: 'Email',
                accessor: 'email',
            },
            {
                id: 'phone',
                Header: 'Phone',
                accessor: 'phone',
            },
            {
                id: 'birthDate',
                Header: 'Birth date',
                accessor: 'birthDate',
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<UserResponseDTO>>) => {
                    return <RangeColumnFilter inputType="date" {...filterProps} />;
                },
            },
            {
                id: 'roles',
                Header: 'User roles',
                accessor: (user: UserResponseDTO) => {
                    return <UserRolesTableItem userRoles={user.userRoles} />;
                },
                disableSortBy: true,
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<UserResponseDTO>>) => {
                    return (
                        <SelectColumnFilter
                            options={userRoles.map((role: UserRoleResponseDTO) => {
                                return { value: role.id, label: role.label } as SelectColumnFilterOption;
                            })}
                            {...filterProps}
                        />
                    );
                },
            },
            {
                id: 'actions',
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
                                    userEmail: [user.email],
                                }}
                                tooltipMessage={'Send email'}
                            />
                        </div>
                    );
                },
                disableFilters: true,
                disableSortBy: true,
            },
        ],
        [userRoles]
    );

    const fetchData = React.useCallback((pageIndex, pageSize, filter, sortBy, desc): Promise<void> => {
        return getUsersList(pageIndex, pageSize, filter, sortBy, desc).then((page: Page<UserResponseDTO>) => {
            setUsersPage(page);
        });
    }, []);

    const SendEmailsPanel = (): JSX.Element => {
        return (
            <div style={{ padding: '0 10px' }}>
                <Button
                    variant={'info'}
                    disabled={!selectedRowIds.length}
                    onClick={() => {
                        history.push(`/profile/email-send`, {
                            userIds: selectedRowIds,
                        });
                    }}
                    style={{ display: 'block', marginLeft: 'auto', marginRight: '0' }}
                >
                    <FontAwesomeIcon icon={faEnvelope} /> Send email
                </Button>
            </div>
        );
    };

    return (
        <SubpageContainer className="user-list-subpage">
            <SubpageHeader title={'Users list'} />
            <SubpageContent>
                <SendEmailsPanel />
                <TableWithRef<UserResponseDTO>
                    columns={columns}
                    data={usersPage ? usersPage.content : []}
                    fetchData={fetchData}
                    pageCount={usersPage?.totalPages}
                    selectEnabled
                    reference={ref}
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
