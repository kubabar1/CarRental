import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column, HeaderProps } from 'react-table';
import { TranslationService, VehicleService } from '@car-rental/shared/service';
import { ButtonTableItem } from '../../components/table/tab_items/button_table_item/ButtonTableItem';
import { BookingResponseDTO, VehicleOptionsDTO, VehicleResponseDTO, Page } from '@car-rental/shared/model';
import { SelectColumnFilter } from '../../components/table/tab_items/select_column_filter/SelectColumnFilter';
import { RangeColumnFilter } from '../../components/table/tab_items/slider_column_filter/RangeColumnFilter';
import { LocationSelectColumnFilter } from '../../components/table/tab_items/location_select_column_filter/LocationSelectColumnFilter';

export function VehicleListSubpage(): JSX.Element {
    const [vehiclesPage, setVehiclesPage] = useState<Page<VehicleResponseDTO> | undefined>(undefined);
    const [vehicleOptions, setVehicleOptions] = useState<VehicleOptionsDTO | undefined>(undefined);

    React.useEffect(() => {
        VehicleService.getVehicleOptions().then((vehicleDefaultParams: VehicleOptionsDTO) => {
            setVehicleOptions(vehicleDefaultParams);
        });
    }, []);

    const fetchData = React.useCallback((pageIndex, pageSize, filter, sortBy, desc): Promise<void> => {
        return VehicleService.getVehiclesList(pageIndex, pageSize, filter, sortBy, desc).then(
            (page: Page<VehicleResponseDTO>) => {
                setVehiclesPage(page);
            }
        );
    }, []);

    const columns = React.useMemo<Column<VehicleResponseDTO>[]>(
        () => [
            {
                id: 'id',
                Header: TranslationService.translate('idVehicleFormColumn'),
                accessor: 'id',
            },
            {
                id: 'brand.brand',
                Header: TranslationService.translate('brandVehicleFormColumn'),
                accessor: 'brand',
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                    return (
                        <SelectColumnFilter
                            options={
                                vehicleOptions
                                    ? vehicleOptions.brands.map((brand) => {
                                          return {
                                              value: brand,
                                              label: brand,
                                          };
                                      })
                                    : []
                            }
                            {...filterProps}
                        />
                    );
                },
            },
            {
                id: 'model.model',
                Header: TranslationService.translate('modelVehicleFormColumn'),
                accessor: 'model',
            },
            {
                id: 'dailyFee',
                Header: TranslationService.translate('dailyFeeVehicleFormColumn'),
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => `${vehicleResponseDTO.dailyFee.toFixed(2)} $`,
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                    return <RangeColumnFilter inputType="number" {...filterProps} />;
                },
            },
            {
                id: 'registration',
                Header: TranslationService.translate('registrationVehicleFormColumn'),
                accessor: 'registration',
            },
            {
                id: 'locationId',
                Header: TranslationService.translate('locationIdVehicleFormColumn'),
                accessor: (vehicleResponseDTO: VehicleResponseDTO) =>
                    `${vehicleResponseDTO.location.country}, ${vehicleResponseDTO.location.city}, ${vehicleResponseDTO.location.streetAndNb}`,
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                    return <LocationSelectColumnFilter {...filterProps} />;
                },
            },
            {
                id: 'bestOffer',
                Header: TranslationService.translate('bestOfferVehicleFormColumn'),
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => (vehicleResponseDTO.bestOffer ? 'true' : 'false'),
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                    return (
                        <SelectColumnFilter
                            options={[
                                { value: 'true', label: 'true' },
                                { value: 'false', label: 'false' },
                            ]}
                            {...filterProps}
                        />
                    );
                },
                disableSortBy: true,
            },
            {
                id: 'vehicleDetails.bodyType.bodyType',
                Header: TranslationService.translate('bodyTypeVehicleFormColumn'),
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => vehicleResponseDTO.vehicleDetails.bodyType,
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                    return (
                        <SelectColumnFilter
                            options={
                                vehicleOptions
                                    ? vehicleOptions.bodyTypes.map((bodyType) => {
                                          return {
                                              value: bodyType,
                                              label: bodyType,
                                          };
                                      })
                                    : []
                            }
                            {...filterProps}
                        />
                    );
                },
            },
            {
                id: 'vehicleDetails.fuelType.fuelType',
                Header: TranslationService.translate('fuelTypeVehicleFormColumn'),
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => vehicleResponseDTO.vehicleDetails.fuelType,
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                    return (
                        <SelectColumnFilter
                            options={
                                vehicleOptions
                                    ? vehicleOptions.fuelTypes.map((fuelType) => {
                                          return {
                                              value: fuelType,
                                              label: fuelType,
                                          };
                                      })
                                    : []
                            }
                            {...filterProps}
                        />
                    );
                },
            },
            {
                id: 'vehicleDetails.power',
                Header: TranslationService.translate('powerVehicleFormColumn'),
                accessor: (vehicleResponseDTO: VehicleResponseDTO) =>
                    `${vehicleResponseDTO.vehicleDetails.power} ${TranslationService.translate(
                        'powerCodeVehicleForm'
                    )}`,
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                    return <RangeColumnFilter inputType="number" {...filterProps} />;
                },
            },
            {
                id: 'vehicleDetails.productionYear',
                Header: TranslationService.translate('productionYearVehicleFormColumn'),
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => vehicleResponseDTO.vehicleDetails.productionYear,
                Filter: (filterProps: React.PropsWithChildren<HeaderProps<BookingResponseDTO>>) => {
                    return <RangeColumnFilter inputType="number" {...filterProps} />;
                },
            },
            {
                id: 'edit',
                Header: TranslationService.translate('editVehicleFormColumn'),
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => (
                    <ButtonTableItem
                        buttonText={TranslationService.translate('editVehicleFormButton')}
                        buttonVariant={'success'}
                        buttonRedirectPath={`/profile/vehicles/${vehicleResponseDTO.id}/edit`}
                    />
                ),
                disableFilters: true,
                disableSortBy: true,
            },
            {
                id: 'equipment',
                Header: TranslationService.translate('equipmentVehicleFormColumn'),
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => (
                    <ButtonTableItem
                        buttonText={TranslationService.translate('equipmentVehicleFormButton')}
                        buttonVariant={'info'}
                        buttonRedirectPath={`/profile/vehicles/${vehicleResponseDTO.id}/equipment`}
                    />
                ),
                disableFilters: true,
                disableSortBy: true,
            },
        ],
        [vehicleOptions]
    );

    return (
        <SubpageContainer>
            <SubpageHeader title={TranslationService.translate('vehicleListSubpageTitle')} />
            <SubpageContent>
                <Table<VehicleResponseDTO>
                    columns={columns}
                    data={vehiclesPage ? vehiclesPage.content : []}
                    fetchData={fetchData}
                    pageCount={vehiclesPage?.totalPages}
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
