import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingResponseDTO } from '../../model/BookingResponseDTO';
import { ButtonTableItem } from '../../components/table/tab_items/button_table_item/ButtonTableItem';
import {
    cancelAuthorizedUserBooking,
    getAuthenticatedUserReservedBookingsList,
} from '../../service/BookingUserService';
import Page from '../../../../main-page/src/model/Page';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../../constants/PathsAPI';
import { bookingListCommonColumns } from './BookingListCommonColumns';

export function MyReservedBookingsListSubpage(): JSX.Element {
    const [bookingsPage, setBookingsPage] = useState<Page<BookingResponseDTO> | undefined>(undefined);

    const fetchData = React.useCallback(
        (pageIndex: number, pageSize: number, filter?: string, sortBy?: string, desc?: boolean): Promise<void> => {
            return getAuthenticatedUserReservedBookingsList(pageIndex, pageSize, filter, sortBy, desc).then(
                (page: Page<BookingResponseDTO>) => {
                    setBookingsPage(page);
                }
            );
        },
        []
    );

    const columns = React.useMemo<Column<BookingResponseDTO>[]>(
        () => [
            ...bookingListCommonColumns(),
            {
                id: 'cancel',
                Header: 'Cancel',
                accessor: (row: BookingResponseDTO) => (
                    <ButtonTableItem
                        buttonText={'Cancel'}
                        buttonVariant={'danger'}
                        onClickAction={() =>
                            cancelAuthorizedUserBooking(row.id).then(() => {
                                fetchData(DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE);
                            })
                        }
                    />
                ),
                disableSortBy: true,
                disableFilters: true,
            },
        ],
        [fetchData]
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'My reservations'} />
            <SubpageContent>
                <Table<BookingResponseDTO>
                    columns={columns}
                    data={bookingsPage ? bookingsPage.content : []}
                    fetchData={fetchData}
                    pageCount={bookingsPage?.totalPages}
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
