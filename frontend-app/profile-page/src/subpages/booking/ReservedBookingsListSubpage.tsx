import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingResponseDTO } from '../../model/BookingResponseDTO';
import { cancelBooking, getAllReservedBookingsList, rentBooking } from '../../service/BookingAdminService';
import { ButtonTableItem } from '../../components/table/tab_items/ButtonTableItem';
import Page from '../../../../main-page/src/model/Page';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../../constants/PathsAPI';

export function ReservedBookingsListSubpage(): JSX.Element {
    const [bookingsPage, setBookingsPage] = useState<Page<BookingResponseDTO> | undefined>(undefined);

    const fetchData = React.useCallback((pageIndex, pageSize) => {
        getAllReservedBookingsList(pageIndex, pageSize).then((page: Page<BookingResponseDTO>) => {
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
                Header: 'Rent',
                accessor: (row: BookingResponseDTO) => (
                    <ButtonTableItem
                        buttonText={'Rent'}
                        onClickAction={() =>
                            rentBooking(row.id).then(() => {
                                fetchData(DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE);
                            })
                        }
                    />
                ),
            },
            {
                Header: 'Cancel',
                accessor: (row: BookingResponseDTO) => (
                    <ButtonTableItem
                        buttonText={'Cancel'}
                        buttonVariant={'danger'}
                        onClickAction={() =>
                            cancelBooking(row.id).then(() => {
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
            <SubpageHeader title={'Reserved bookings list'} />
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
