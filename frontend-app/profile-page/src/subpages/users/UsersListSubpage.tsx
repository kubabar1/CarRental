import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { TranslationService, UserService } from '@car-rental/shared/service';
import { Column, HeaderProps, UseRowSelectState } from 'react-table';
import { ButtonTableItem } from '../../components/table/tab_items/button_table_item/ButtonTableItem';
import { UserRolesTableItem } from './tab_items/UserRolesTableItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faFingerprint, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './UsersListSubpage.scss';
import {
    SelectColumnFilter,
    SelectColumnFilterOption,
} from '../../components/table/tab_items/select_column_filter/SelectColumnFilter';
import { UserRoleResponseDTO, Page, UserResponseDTO } from '@car-rental/shared/model';
import { RangeColumnFilter } from '../../components/table/tab_items/slider_column_filter/RangeColumnFilter';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export function UsersListSubpage(): JSX.Element {
    const history = useHistory();
    const [usersPage, setUsersPage] = useState<Page<UserResponseDTO> | undefined>(undefined);
    const [userRoles, setUserRoles] = useState<UserRoleResponseDTO[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const ref: (node: UseRowSelectState<UserResponseDTO>) => void = React.useCallback(
        (node: UseRowSelectState<UserResponseDTO>) => {
            if (node && node.selectedRowIds) {
                setSelectedRowIds(Object.keys(node.selectedRowIds).map((it: string) => parseInt(it)));
            }
        },
        []
    );

    React.useEffect(() => {
        UserService.getAllUserRoles().then((roles: UserRoleResponseDTO[]) => {
            setUserRoles(roles);
        });
    }, []);

    const columns = React.useMemo<Column<UserResponseDTO>[]>(
        () => [
            {
                id: 'id',
                Header: TranslationService.translate('idUserListSubpageLabel'),
                accessor: 'id',
            },
            {
                id: 'name',
                Header: TranslationService.translate('nameUserListSubpageLabel'),
                accessor: 'name',
            },
            {
                id: 'surname',
                Header: TranslationService.translate('surnameUserListSubpageLabel'),
                accessor: 'surname',
            },
            {
                id: 'email',
                Header: TranslationService.translate('emailUserListSubpageLabel'),
                accessor: 'email',
            },
            {
                id: 'phone',
                Header: TranslationService.translate('phoneUserListSubpageLabel'),
                accessor: 'phone',
            },
            {
                id: 'birthDate',
                Header: TranslationService.translate('birthDateUserListSubpageLabel'),
                accessor: 'birthDate',
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<UserResponseDTO>>) => {
                    return <RangeColumnFilter inputType="date" {...filterProps} />;
                },
            },
            {
                id: 'roles',
                Header: TranslationService.translate('userRolesUserListSubpageLabel'),
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
                Header: TranslationService.translate('actionsUserListSubpageLabel'),
                accessor: (user: UserResponseDTO) => {
                    return (
                        <div className="actions-column-item-container">
                            <ButtonTableItem
                                buttonText={<FontAwesomeIcon icon={faCog} />}
                                buttonRedirectPath={`/profile/users/${user.id}/edit`}
                                buttonVariant={'warning'}
                                tooltipMessage={TranslationService.translate('userListSubpageSettingsTooltipMessage')}
                            />
                            <ButtonTableItem
                                buttonText={<FontAwesomeIcon icon={faFingerprint} />}
                                buttonRedirectPath={`/profile/user-roles/add/${user.id}`}
                                buttonVariant={'success'}
                                tooltipMessage={TranslationService.translate(
                                    'userListSubpageUpdateRolesTooltipMessage'
                                )}
                            />
                            <ButtonTableItem
                                buttonText={<FontAwesomeIcon icon={faEnvelope} />}
                                buttonRedirectPath={`/profile/email-send`}
                                buttonVariant={'info'}
                                buttonRedirectState={{
                                    userIds: [user.id],
                                }}
                                tooltipMessage={TranslationService.translate('userListSubpageSendEmailTooltipMessage')}
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
        return UserService.getUsersList(pageIndex, pageSize, filter, sortBy, desc).then(
            (page: Page<UserResponseDTO>) => {
                setUsersPage(page);
            }
        );
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
                    <FontAwesomeIcon icon={faEnvelope} />{' '}
                    {TranslationService.translate('userListSubpageSendEmailButton')}
                </Button>
            </div>
        );
    };

    return (
        <SubpageContainer className="user-list-subpage">
            <SubpageHeader title={TranslationService.translate('userListSubpageTitle')} />
            <SubpageContent>
                <SendEmailsPanel />
                <Table<UserResponseDTO>
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
