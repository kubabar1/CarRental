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
import ReactPaginate from 'react-paginate';
import qs, { ParsedQs } from 'qs';
import { useHistory } from 'react-router-dom';

export function UsersListSubpage(): JSX.Element {
    const history = useHistory();
    const DEFAULT_START_PAGE = 0;
    // const DEFAULT_USERS_COUNT = 5;
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_START_PAGE);
    const [usersPage, setUsersPage] = useState<Page<UserResponseDTO> | undefined>(undefined);
    const [totalPagesCount, setTotalPagesCount] = useState<number>(0);

    useEffect(() => {
        getUsersList().then((usersPageResponse: Page<UserResponseDTO>) => {
            setUsersPage(usersPageResponse);
            setTotalPagesCount(usersPageResponse.totalPages);
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
                accessor: 'birthDate',
            },
            {
                Header: 'Pesel',
                accessor: 'pesel',
            },
            {
                Header: 'User roles',
                accessor: UserRolesTableItem,
            },
            {
                Header: 'Edit',
                accessor: (user: UserResponseDTO) => ButtonTableItem('Edit', `/users/${user.id}/edit`, 'success'),
            },
            {
                Header: 'Add role',
                accessor: (user: UserResponseDTO) =>
                    ButtonTableItem('+ Add role', `/user-roles/add/${user.id}`, 'success'),
            },
        ],
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Users list'} />
            <SubpageContent>
                {usersPage && <Table<UserResponseDTO> columns={columns} data={usersPage.content} />}
                <div className="pagination-and-counter-container">
                    <ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={totalPagesCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={(selectedItem: { selected: number }) => {
                            setCurrentPage(selectedItem.selected);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            const currentParams: ParsedQs = qs.parse(location.search, {
                                ignoreQueryPrefix: true,
                            });
                            currentParams['page'] = `${selectedItem.selected}`;
                            history.push({
                                search: `?${qs.stringify(currentParams)}`,
                            });
                        }}
                        containerClassName="pagination"
                        activeClassName="active"
                        forcePage={currentPage}
                    />
                    {/*<Select*/}
                    {/*    className="count-per-page-select"*/}
                    {/*    value={mapToOptionType(perPageCount)}*/}
                    {/*    options={VEHICLES_PER_PAGE_COUNTS.map(mapToOptionType)}*/}
                    {/*    onChange={(newValue: SingleValue<OptionType>) => {*/}
                    {/*        if (newValue && newValue.value) {*/}
                    {/*            setPerPageCount(parseInt(newValue.value));*/}
                    {/*            const currentParams: ParsedQs = qs.parse(location.search, {*/}
                    {/*                ignoreQueryPrefix: true,*/}
                    {/*            });*/}
                    {/*            currentParams['count'] = newValue.value;*/}
                    {/*            history.push({*/}
                    {/*                search: `?${qs.stringify(currentParams)}`,*/}
                    {/*            });*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*/>*/}
                </div>
            </SubpageContent>
        </SubpageContainer>
    );
}
