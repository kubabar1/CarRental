import React, { useCallback, useEffect, useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingResponseDTO } from '../../model/BookingResponseDTO';
import { getAllRentedBookingsList, returnBooking } from '../../service/BookingAdminService';
import { ButtonTableItem } from '../../components/table/tab_items/ButtonTableItem';
import { SubpagePagination } from '../../components/subpage/pagination/SubpagePagination';
import { useLocation } from 'react-router-dom';
import { getCountFromUrl, getPageFromUrl } from '../../../../main-page/src/utils/UrlUtil';
import Page from '../../../../main-page/src/model/Page';

export function RentedBookingsListSubpage(): JSX.Element {
    const location = useLocation();
    const DEFAULT_PER_PAGE_COUNT = 10;
    const page: number = getPageFromUrl(location.search);
    const count: number = getCountFromUrl(location.search);

    const [perPageCount, setPerPageCount] = useState<number>(count <= 0 ? DEFAULT_PER_PAGE_COUNT : count);
    const [currentPage, setCurrentPage] = useState<number>(page);
    const [bookingsList, setBookingList] = useState<Page<BookingResponseDTO> | undefined>(undefined);
    const [totalPagesCount, setTotalPagesCount] = useState<number>(0);

    const getAllRentedBookings = useCallback(() => {
        getAllRentedBookingsList(currentPage, perPageCount).then((bookingsListResponse: Page<BookingResponseDTO>) => {
            if (currentPage > bookingsListResponse.totalPages - 1) {
                setCurrentPage(bookingsListResponse.totalPages - 1);
            } else {
                setBookingList(bookingsListResponse);
                setTotalPagesCount(bookingsListResponse.totalPages);
            }
        });
    }, [currentPage, perPageCount]);

    useEffect(() => {
        getAllRentedBookings();
    }, [getAllRentedBookings]);

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
                Header: 'Return',
                accessor: (row: BookingResponseDTO) =>
                    ButtonTableItem('Return', undefined, 'success', () => {
                        returnBooking(row.id).then(getAllRentedBookings);
                    }),
            },
        ],
        [getAllRentedBookings]
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'Rented bookings list'} />
            <SubpageContent>
                {bookingsList && <Table<BookingResponseDTO> columns={columns} data={bookingsList.content} />}
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
