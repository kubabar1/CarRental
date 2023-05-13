import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column, HeaderProps } from 'react-table';
import { BookingResponseDTO } from '../../model/BookingResponseDTO';
import { getAuthenticatedUserBookingsList } from '../../service/BookingUserService';
import Page from '../../../../main-page/src/model/Page';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { SelectColumnFilter } from '../../components/table/tab_items/select_column_filter/SelectColumnFilter';
import { getAllBookingStates } from '../../service/BookingAdminService';
import { BookingStateDTO } from '../../model/BookingStateDTO';
import { bookingListCommonColumns } from './BookingListCommonColumns';
import { BookingStatesSelectColumnFilter } from '../../components/table/tab_items/booking_states_select_column_filter/BookingStatesSelectColumnFilter';

export function MyBookingsListSubpage(): JSX.Element {
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
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<UserResponseDTO>>) => {
                    return <BookingStatesSelectColumnFilter {...filterProps} />;
                },
            },
        ],
        []
    );

    const fetchData = React.useCallback((pageIndex, pageSize, filter, sortBy, desc): Promise<void> => {
        return getAuthenticatedUserBookingsList(pageIndex, pageSize, filter, sortBy, desc).then(
            (page: Page<BookingResponseDTO>) => {
                setBookingsPage(page);
            }
        );
    }, []);

    return (
        <SubpageContainer>
            <SubpageHeader title={'My bookings'} />
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
