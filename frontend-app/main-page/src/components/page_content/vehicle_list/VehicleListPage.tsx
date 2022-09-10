import React, { useEffect, useState } from 'react';
import './VehicleListPage.scss';
import { VehicleSearchFilters } from './filters/VehicleSearchFilters';
import LocalisationResponseDTO from '../../../model/LocalisationResponseDTO';
import { VehicleResponseDTO } from '../../../model/VehicleResponseDTO';
import { RouteComponentProps, useHistory, withRouter, useLocation } from 'react-router-dom';
import { VehicleItem } from './vehicle_item/VehicleItem';
import {
    getVehicleModelsByBrand,
    getVehiclesFilterParams,
    getVehiclesList,
    getVehiclesListWithFiltering,
} from '../../../service/VehicleService';
import { LoaderContainer } from './container/LoaderContainer';
import { VehicleFiltersParamsDTO } from '../../../model/VehicleFiltersParamsDTO';
import FilteringParamsEnum from '../../../model/FilteringParamsEnum';
import { getVehicleFilteringParamsUrl } from '../../../utils/UrlUtil';

interface CarListProperties extends RouteComponentProps {
    localisations: LocalisationResponseDTO[] | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function VehicleListPage(props: CarListProperties): JSX.Element {
    const history = useHistory();
    const location = useLocation();
    const [vehiclesList, setVehiclesList] = useState<VehicleResponseDTO[]>([]);
    const [vehicleFiltersParams, setVehicleFiltersParams] = useState<VehicleFiltersParamsDTO | undefined>(undefined);
    const [vehicleFilterModelsParam, setVehicleFilterModelsParam] = useState<string[]>([]);
    const [vehicleFilters, setVehicleFilters] = useState<Map<FilteringParamsEnum, string | undefined>>(
        new Map<FilteringParamsEnum, string | undefined>()
    );
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const getVehicleFiltersParamsUrl = (vehicleFiltersMap: Map<FilteringParamsEnum, string | undefined>): string => {
        return Array.from(vehicleFiltersMap)
            .reduce((o: string[], [key, value]: [string, string | undefined]) => {
                if (value) {
                    o.push(`${key}=${value}`);
                }
                return o;
            }, [])
            .join('&');
    };

    useEffect(() => {
        const vehicleFilteringParamsUrl: Map<FilteringParamsEnum, string | undefined> = getVehicleFilteringParamsUrl(
            location.search
        );
        setVehicleFilters(vehicleFilteringParamsUrl);
        if (vehicleFilteringParamsUrl.size == 0) {
            getVehiclesList().then((vehicleResponseDTOS: VehicleResponseDTO[]) => {
                setVehiclesList(vehicleResponseDTOS);
                setIsLoaded(true);
            });
        } else {
            getVehiclesListWithFiltering(getVehicleFiltersParamsUrl(vehicleFilteringParamsUrl)).then(
                (vehicleResponseDTOS: VehicleResponseDTO[]) => {
                    setVehiclesList(vehicleResponseDTOS);
                    setIsLoaded(true);
                }
            );
        }
        getVehiclesFilterParams().then((vehicleFilterParams: VehicleFiltersParamsDTO) => {
            setVehicleFiltersParams(vehicleFilterParams);
        });
    }, [location.search]);

    useEffect(() => {
        const brand = vehicleFilters.get(FilteringParamsEnum.BRAND_FIELD_FILTER);
        if (brand) {
            getVehicleModelsByBrand(brand).then((models: string[]) => {
                setVehicleFilterModelsParam(models);
            });
        } else {
            setVehicleFilterModelsParam([]);
        }
    }, [vehicleFilters]);

    const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        setIsLoaded(false);
        event.preventDefault();
        const vehicleFiltersParamsUrl: string = getVehicleFiltersParamsUrl(vehicleFilters);
        if (vehicleFiltersParamsUrl != '') {
            history.push({
                search: `?${vehicleFiltersParamsUrl}`,
            });
            getVehiclesListWithFiltering(vehicleFiltersParamsUrl).then((vehicleResponseDTOS: VehicleResponseDTO[]) => {
                setVehiclesList(vehicleResponseDTOS);
                setIsLoaded(true);
            });
        } else {
            history.push({
                search: ``,
            });
            getVehiclesList().then((vehicleResponseDTOS: VehicleResponseDTO[]) => {
                setVehiclesList(vehicleResponseDTOS);
                setIsLoaded(true);
            });
        }
    };

    return (
        <div id="car-list-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 container mb-5 mt-3">
                        {vehicleFiltersParams && vehicleFilters && (
                            <VehicleSearchFilters
                                vehicleFiltersParams={vehicleFiltersParams}
                                setVehicleFilters={setVehicleFilters}
                                vehicleFilters={vehicleFilters}
                                handleFilterSubmit={handleFilterSubmit}
                                vehicleFilterModelsParam={vehicleFilterModelsParam}
                            />
                        )}
                    </div>
                    <div id="search-results-container" className="col-md-9 text-center">
                        <LoaderContainer
                            dataArrayLength={vehiclesList.length}
                            isLoaded={isLoaded}
                            containerClass={'vehicles-paginate-container'}
                        >
                            {vehiclesList.map((vehicle: VehicleResponseDTO) => (
                                <VehicleItem vehicle={vehicle} key={vehicle.id} />
                            ))}
                        </LoaderContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(VehicleListPage);
