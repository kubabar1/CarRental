import React, { useCallback, useEffect, useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingResponseDTO } from '../../model/BookingResponseDTO';
import { ButtonTableItem } from '../../components/table/tab_items/ButtonTableItem';
import {
    cancelAuthorizedUserBooking,
    getAuthenticatedUserRentedBookingsList,
    getAuthenticatedUserReservedBookingsList,
} from '../../service/BookingUserService';
import { SubpagePagination } from '../../components/subpage/pagination/SubpagePagination';
import { useLocation } from 'react-router-dom';
import { getCountFromUrl, getPageFromUrl } from '../../../../main-page/src/utils/UrlUtil';
import Page from '../../../../main-page/src/model/Page';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../../constants/PathsAPI';

export function MyReservedBookingsListSubpage(): JSX.Element {
    const [bookingsPage, setBookingsPage] = useState<Page<BookingResponseDTO> | undefined>(undefined);

    const fetchData = React.useCallback((pageIndex, pageSize) => {
        getAuthenticatedUserReservedBookingsList(pageIndex, pageSize).then((page: Page<BookingResponseDTO>) => {
            setBookingsPage(page);
        });
    }, []);

    const columns = React.useMemo<Column<BookingResponseDTO>[]>(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'User ID',
                accessor: 'userId',
            },
            {
                Header: 'Vehicle ID',
                accessor: 'vehicleId',
            },
            {
                Header: 'Receipt date',
                accessor: (row: BookingResponseDTO) => {
                    return row.receiptDate;
                },
            },
            {
                Header: 'Return date',
                accessor: (row: BookingResponseDTO) => {
                    return row.returnDate;
                },
            },
            {
                Header: 'Location',
                accessor: (row: BookingResponseDTO) => {
                    return `${row.location.country}, ${row.location.city}, ${row.location.streetAndNb}`;
                },
            },
            {
                Header: 'State',
                accessor: (row: BookingResponseDTO) => {
                    return row.bookingState.description;
                },
            },
            {
                Header: 'Total cost',
                accessor: 'totalCost',
            },
            {
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
            },
        ],
        [fetchData]
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'My reserved bookings list'} />
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
