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
import { getCountFromUrl, getPageFromUrl, getVehicleFilteringParamsUrl } from '../../../utils/UrlUtil';
import Page from '../../../model/Page';
import ReactPaginate from 'react-paginate';
import Select, { SingleValue } from 'react-select';
import qs, { ParsedQs } from 'qs';

type OptionType = { value: string | null; label: string | null };

interface CarListProperties extends RouteComponentProps {
    localisations: LocalisationResponseDTO[] | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function VehicleListPage(props: CarListProperties): JSX.Element {
    const VEHICLES_PER_PAGE_COUNTS: number[] = [5, 10, 25, 50];
    const DEFAULT_PER_PAGE_COUNT = 10;
    const DEFAULT_START_PAGE = 0;
    const history = useHistory();
    const location = useLocation();
    const [vehiclesPage, setVehiclesPage] = useState<Page<VehicleResponseDTO> | undefined>(undefined);
    const [vehicleFiltersParams, setVehicleFiltersParams] = useState<VehicleFiltersParamsDTO | undefined>(undefined);
    const [vehicleFilterModelsParam, setVehicleFilterModelsParam] = useState<string[]>([]);
    const [vehicleFilters, setVehicleFilters] = useState<Map<FilteringParamsEnum, string | undefined>>(
        new Map<FilteringParamsEnum, string | undefined>()
    );
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_START_PAGE);
    const [perPageCount, setPerPageCount] = useState<number>(DEFAULT_PER_PAGE_COUNT);

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

    const mapToOptionType = (val: number): OptionType => {
        return {
            value: `${val}`,
            label: `${val}`,
        };
    };

    useEffect(() => {
        const vehicleFilteringParamsUrl: Map<FilteringParamsEnum, string | undefined> = getVehicleFilteringParamsUrl(
            location.search
        );
        const page: number = getPageFromUrl(location.search);
        let count: number = getCountFromUrl(location.search);
        setVehicleFilters(vehicleFilteringParamsUrl);
        setCurrentPage(page);
        if (count <= 0) {
            count = DEFAULT_PER_PAGE_COUNT;
        }
        setPerPageCount(count);
        if (vehicleFilteringParamsUrl.size == 0) {
            getVehiclesList(page, count).then((vehicleResponseDTOS: Page<VehicleResponseDTO>) => {
                setVehiclesPage(vehicleResponseDTOS);
            });
        } else {
            getVehiclesListWithFiltering(getVehicleFiltersParamsUrl(vehicleFilteringParamsUrl), page, count).then(
                (vehicleResponseDTOPage: Page<VehicleResponseDTO>) => {
                    setVehiclesPage(vehicleResponseDTOPage);
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
        event.preventDefault();
        const vehicleFiltersParamsUrl: string = getVehicleFiltersParamsUrl(vehicleFilters);
        if (vehicleFiltersParamsUrl != '') {
            history.push({
                search: `?${vehicleFiltersParamsUrl}`,
            });
            setCurrentPage(DEFAULT_START_PAGE);
            setPerPageCount(DEFAULT_PER_PAGE_COUNT);
            getVehiclesListWithFiltering(vehicleFiltersParamsUrl, currentPage, perPageCount).then(
                (vehicleResponseDTOPage: Page<VehicleResponseDTO>) => {
                    setVehiclesPage(vehicleResponseDTOPage);
                }
            );
        } else {
            history.push({
                search: ``,
            });
            getVehiclesList(currentPage, perPageCount).then((vehicleResponseDTOS: Page<VehicleResponseDTO>) => {
                setVehiclesPage(vehicleResponseDTOS);
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
                            dataArrayLength={vehiclesPage ? vehiclesPage.content.length : 0}
                            isLoaded={!!vehiclesPage}
                            containerClass={'vehicles-paginate-container'}
                        >
                            <div>
                                {vehiclesPage &&
                                    vehiclesPage.content.map((vehicle: VehicleResponseDTO) => (
                                        <VehicleItem vehicle={vehicle} key={vehicle.id} />
                                    ))}
                                {vehiclesPage && (
                                    <div className="pagination-and-counter-container">
                                        <ReactPaginate
                                            previousLabel="Previous"
                                            nextLabel="Next"
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            breakLabel="..."
                                            breakClassName="page-item"
                                            breakLinkClassName="page-link"
                                            pageCount={vehiclesPage.totalPages}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={(selectedItem: { selected: number }) => {
                                                setCurrentPage(selectedItem.selected);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                const currentParams: ParsedQs = qs.parse(location.search, {
                                                    ignoreQueryPrefix: true,
                                                });
                                                currentParams['page'] = `${selectedItem.selected}`;
                                                history.push({
                                                    search: `?${qs.stringify(currentParams)}`,
                                                });
                                            }}
                                            containerClassName="pagination"
                                            activeClassName="active"
                                            forcePage={currentPage}
                                        />
                                        <Select
                                            className="count-per-page-select"
                                            value={mapToOptionType(perPageCount)}
                                            options={VEHICLES_PER_PAGE_COUNTS.map(mapToOptionType)}
                                            onChange={(newValue: SingleValue<OptionType>) => {
                                                if (newValue && newValue.value) {
                                                    setPerPageCount(parseInt(newValue.value));
                                                    const currentParams: ParsedQs = qs.parse(location.search, {
                                                        ignoreQueryPrefix: true,
                                                    });
                                                    currentParams['count'] = newValue.value;
                                                    history.push({
                                                        search: `?${qs.stringify(currentParams)}`,
                                                    });
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </LoaderContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(VehicleListPage);
