import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column, HeaderProps } from 'react-table';
import { BookingResponseDTO, Page } from '@car-rental/shared/model';
import { BookingAdminService } from '@car-rental/shared/service';
import { bookingListCommonColumns } from './BookingListCommonColumns';
import { BookingStatesSelectColumnFilter } from '../../components/table/tab_items/booking_states_select_column_filter/BookingStatesSelectColumnFilter';

export function BookingsListSubpage(): JSX.Element {
    const [bookingsPage, setBookingsPage] = useState<Page<BookingResponseDTO> | undefined>(undefined);
    const columns = React.useMemo<Column<BookingResponseDTO>[]>(
        () => [
            ...bookingListCommonColumns(),
            {
                id: 'bookingStateCode',
                Header: 'State',
                accessor: (row: BookingResponseDTO) => {
                    return row.bookingState.description;
                },
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                    return <BookingStatesSelectColumnFilter {...filterProps} />;
                },
            },
        ],
        []
    );

    const fetchData = React.useCallback((pageIndex, pageSize, filter, sortBy, desc): Promise<void> => {
        return BookingAdminService.getAllBookingsList(pageIndex, pageSize, filter, sortBy, desc).then(
            (page: Page<BookingResponseDTO>) => {
                setBookingsPage(page);
            }
        );
    }, []);

    return (
        <SubpageContainer>
            <SubpageHeader title={'All bookings'} />
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
