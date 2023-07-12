import React from 'react';
import { Column, HeaderProps } from 'react-table';
import { BookingResponseDTO, UserResponseDTO } from '@car-rental/shared/model';
import { RangeColumnFilter } from '../../components/table/tab_items/slider_column_filter/RangeColumnFilter';
import { LocationSelectColumnFilter } from '../../components/table/tab_items/location_select_column_filter/LocationSelectColumnFilter';
import { TranslationService } from '@car-rental/shared/service';
import { BookingStatesSelectColumnFilter } from '../../components/table/tab_items/booking_states_select_column_filter/BookingStatesSelectColumnFilter';
import { translateBookingCode } from '../../utils/TranslationUtils';

export const bookingStateCode = (header: string) => {
    return {
        id: 'bookingStateCode',
        Header: header,
        accessor: (row: BookingResponseDTO) => {
            return translateBookingCode(row.bookingState.bookingCode);
        },
        Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
            return <BookingStatesSelectColumnFilter {...filterProps} />;
        },
    };
};

export function bookingListCommonColumns(): Column<BookingResponseDTO>[] {
    return [
        {
            id: 'id',
            Header: TranslationService.translate('idBookingListColumn'),
            accessor: 'id',
        },
        {
            id: 'userId',
            Header: TranslationService.translate('userIdBookingListColumn'),
            accessor: 'userId',
        },
        {
            id: 'vehicleId',
            Header: TranslationService.translate('vehicleIdBookingListColumn'),
            accessor: 'vehicleId',
        },
        {
            id: 'receiptDate',
            Header: TranslationService.translate('receiptDateBookingListColumn'),
            accessor: (row: BookingResponseDTO) => {
                return row.receiptDate;
            },
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<UserResponseDTO>>) => {
                return <RangeColumnFilter inputType="date" {...filterProps} />;
            },
        },
        {
            id: 'returnDate',
            Header: TranslationService.translate('returnDateBookingListColumn'),
            accessor: (row: BookingResponseDTO) => {
                return row.returnDate;
            },
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<UserResponseDTO>>) => {
                return <RangeColumnFilter inputType="date" {...filterProps} />;
            },
        },
        {
            id: 'location',
            Header: TranslationService.translate('locationBookingListColumn'),
            accessor: (row: BookingResponseDTO) => {
                return `${row.location.country}, ${row.location.city}, ${row.location.streetAndNb}`;
            },
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                return <LocationSelectColumnFilter {...filterProps} />;
            },
        },
        {
            id: 'totalCost',
            Header: TranslationService.translate('totalCostBookingListColumn'),
            accessor: (row: BookingResponseDTO) => {
                return `${row.totalCost} $`;
            },
            Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                return <RangeColumnFilter inputType="number" {...filterProps} />;
            },
        },
    ];
}
