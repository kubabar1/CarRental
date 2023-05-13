import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { SubpageContainer } from '../../components/subpage/container/SubpageContainer';
import { SubpageHeader } from '../../components/subpage/header/SubpageHeader';
import { SubpageContent } from '../../components/subpage/content/SubpageContent';
import { Column } from 'react-table';
import { VehicleResponseDTO } from '../../model/VehicleResponseDTO';
import { getVehicleOptions, getVehiclesList } from '../../service/VehicleService';
import { ButtonTableItem } from '../../components/table/tab_items/button_table_item/ButtonTableItem';
import Page from '../../../../main-page/src/model/Page';
import { vehiclesListCommonColumns } from './VehiclesListCommonColumns';
import { VehicleOptionsDTO } from '../../model/VehicleOptionsDTO';

export function VehicleListSubpage(): JSX.Element {
    const [vehiclesPage, setVehiclesPage] = useState<Page<VehicleResponseDTO> | undefined>(undefined);
    const [vehicleOptions, setVehicleOptions] = useState<VehicleOptionsDTO | undefined>(undefined);

    React.useEffect(() => {
        getVehicleOptions().then((vehicleDefaultParams: VehicleOptionsDTO) => {
            setVehicleOptions(vehicleDefaultParams);
        });
    }, []);

    const fetchData = React.useCallback((pageIndex, pageSize, filter, sortBy, desc): Promise<void> => {
        return getVehiclesList(pageIndex, pageSize, filter, sortBy, desc).then((page: Page<VehicleResponseDTO>) => {
            setVehiclesPage(page);
        });
    }, []);

    const columns = React.useMemo<Column<VehicleResponseDTO>[]>(
        () => [
            ...vehiclesListCommonColumns(vehicleOptions),
            {
                id: 'edit',
                Header: 'Edit',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => (
                    <ButtonTableItem
                        buttonText={'Edit'}
                        buttonVariant={'success'}
                        buttonRedirectPath={`/profile/vehicles/${vehicleResponseDTO.id}/edit`}
                    />
                ),
                disableFilters: true,
                disableSortBy: true,
            },
            {
                id: 'equipment',
                Header: 'Equipment',
                accessor: (vehicleResponseDTO: VehicleResponseDTO) => (
                    <ButtonTableItem
                        buttonText={'Equipment'}
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
            <SubpageHeader title={'Vehicles'} />
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
