import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column, HeaderProps } from 'react-table';
import { BookingResponseDTO } from '../../model/BookingResponseDTO';
import {
    cancelBooking,
    getAllBookingStates,
    getAllReservedBookingsList,
    rentBooking,
} from '../../service/BookingAdminService';
import { ButtonTableItem } from '../../components/table/tab_items/button_table_item/ButtonTableItem';
import Page from '../../../../main-page/src/model/Page';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../../constants/PathsAPI';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { RangeColumnFilter } from '../../components/table/tab_items/slider_column_filter/RangeColumnFilter';
import { SelectColumnFilter } from '../../components/table/tab_items/select_column_filter/SelectColumnFilter';
import { BookingStateDTO } from '../../model/BookingStateDTO';
import { getAllLocationsList } from '../../../../main-page/src/service/LocationService';
import { LocalisationsResponseDTO } from '../../../../main-page/src/model/LocalisationsResponseDTO';
import LocalisationResponseDTO from '../../../../main-page/src/model/LocalisationResponseDTO';
import { LocationSelectColumnFilter } from '../../components/table/tab_items/location_select_column_filter/LocationSelectColumnFilter';
import { bookingListCommonColumns } from './BookingListCommonColumns';

export function ReservedBookingsListSubpage(): JSX.Element {
    const [bookingsPage, setBookingsPage] = useState<Page<BookingResponseDTO> | undefined>(undefined);

    const fetchData = React.useCallback(
        (pageIndex: number, pageSize: number, filter?: string, sortBy?: string, desc?: boolean): Promise<void> => {
            return getAllReservedBookingsList(pageIndex, pageSize, filter, sortBy, desc).then(
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
                id: 'rent',
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
                disableFilters: true,
                disableSortBy: true,
            },
            {
                id: 'cancel',
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
                disableFilters: true,
                disableSortBy: true,
            },
        ],
        [fetchData]
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={'All reservations'} />
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
