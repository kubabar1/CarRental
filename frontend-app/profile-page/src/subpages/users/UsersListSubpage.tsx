import React, { useEffect, useState } from 'react';
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
import { SubpagePagination } from '../../components/subpage/pagination/SubpagePagination';
import { useLocation } from 'react-router-dom';
import { getCountFromUrl, getPageFromUrl } from '../../../../main-page/src/utils/UrlUtil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faFingerprint, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './UsersListSubpage.scss';

export function UsersListSubpage(): JSX.Element {
    const location = useLocation();
    const DEFAULT_PER_PAGE_COUNT = 10;
    const page: number = getPageFromUrl(location.search);
    const count: number = getCountFromUrl(location.search);

    const [perPageCount, setPerPageCount] = useState<number>(count <= 0 ? DEFAULT_PER_PAGE_COUNT : count);
    const [currentPage, setCurrentPage] = useState<number>(page);
    const [usersPage, setUsersPage] = useState<Page<UserResponseDTO> | undefined>(undefined);
    const [totalPagesCount, setTotalPagesCount] = useState<number>(0);

    useEffect(() => {
        getUsersList(currentPage, perPageCount).then((usersPageResponse: Page<UserResponseDTO>) => {
            console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
            console.log(usersPageResponse);
            if (currentPage > usersPageResponse.totalPages) {
                setCurrentPage(usersPageResponse.totalPages - 1);
            } else {
                setUsersPage(usersPageResponse);
                setTotalPagesCount(usersPageResponse.totalPages);
            }
        });
    }, [currentPage, perPageCount]);

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
                    console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
                    console.log(user);
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
                                tooltipMessage={'Add role'}
                            />
                            <ButtonTableItem
                                buttonText={<FontAwesomeIcon icon={faEnvelope} />}
                                buttonRedirectPath={`/profile/email-send`}
                                buttonVariant={'info'}
                                buttonRedirectState={{
                                    emailAddresses: [user.email],
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

    return (
        <SubpageContainer className="user-list-subpage">
            <SubpageHeader title={'Users list'} />
            <SubpageContent>
                {usersPage && <Table<UserResponseDTO> columns={columns} data={usersPage.content} />}
            </SubpageContent>
            <SubpagePagination
                totalPagesCount={totalPagesCount}
                perPageCount={perPageCount}
                setPerPageCount={setPerPageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </SubpageContainer>
    );
}
