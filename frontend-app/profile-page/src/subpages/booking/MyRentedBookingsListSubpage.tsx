import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingResponseDTO, Page } from '@car-rental/shared/model';
import { getAuthenticatedUserRentedBookingsList } from '@car-rental/shared/service';
import { bookingListCommonColumns } from './BookingListCommonColumns';

export function MyRentedBookingsListSubpage(): JSX.Element {
    const [bookingsPage, setBookingsPage] = useState<Page<BookingResponseDTO> | undefined>(undefined);
    const columns = React.useMemo<Column<BookingResponseDTO>[]>(() => [...bookingListCommonColumns()], []);

    const fetchData = React.useCallback(
        (pageIndex: number, pageSize: number, filter?: string, sortBy?: string, desc?: boolean): Promise<void> => {
            return getAuthenticatedUserRentedBookingsList(pageIndex, pageSize, filter, sortBy, desc).then(
                (page: Page<BookingResponseDTO>) => {
                    setBookingsPage(page);
                }
            );
        },
        []
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'My rents'} />
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
