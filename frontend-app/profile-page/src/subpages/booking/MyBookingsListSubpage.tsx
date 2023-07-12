import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { BookingResponseDTO, Page } from '@car-rental/shared/model';
import { BookingUserService, TranslationService } from '@car-rental/shared/service';
import { bookingListCommonColumns, bookingStateCode } from './BookingListCommonColumns';

export function MyBookingsListSubpage(): JSX.Element {
    const [bookingsPage, setBookingsPage] = useState<Page<BookingResponseDTO> | undefined>(undefined);
    const columns = React.useMemo<Column<BookingResponseDTO>[]>(
        () => [...bookingListCommonColumns(), bookingStateCode(TranslationService.translate('stateBookingListColumn'))],
        []
    );

    const fetchData = React.useCallback((pageIndex, pageSize, filter, sortBy, desc): Promise<void> => {
        return BookingUserService.getAuthenticatedUserBookingsList(pageIndex, pageSize, filter, sortBy, desc).then(
            (page: Page<BookingResponseDTO>) => {
                setBookingsPage(page);
            }
        );
    }, []);

    return (
        <SubpageContainer>
            <SubpageHeader title={TranslationService.translate('myBookingsSubpageTitle')} />
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
