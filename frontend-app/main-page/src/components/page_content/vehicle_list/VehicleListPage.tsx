import React, { useCallback, useEffect, useState } from 'react';
import './VehicleListPage.scss';
import { VehicleSearchFilters } from './filters/VehicleSearchFilters';
import { VehicleResponseDTO } from '../../../model/VehicleResponseDTO';
import { withRouter, useLocation } from 'react-router-dom';
import { VehicleItem } from './vehicle_item/VehicleItem';
import { getVehiclesListWithFiltering, mapVehicleFiltersToQs } from '../../../service/VehicleService';
import { LoaderContainer } from './container/LoaderContainer';
import FilteringParamsEnum from '../../../model/FilteringParamsEnum';
import { getCountFromUrl, getPageFromUrl, getVehicleFilteringParamsFromUrl } from '../../../utils/UrlUtil';
import Page from '../../../model/Page';
import ReactPaginate from 'react-paginate';
import Select, { SingleValue } from 'react-select';
import qs, { ParsedQs } from 'qs';
import { mapToOptionType, OptionType } from '../../../utils/TypesUtil';

function VehicleListPage(): JSX.Element {
    const VEHICLES_PER_PAGE_COUNTS: number[] = [5, 10, 25, 50];
    const DEFAULT_PER_PAGE_COUNT = 10;
    const location = useLocation();
    const [vehiclesPage, setVehiclesPage] = useState<Page<VehicleResponseDTO> | undefined>(undefined);
    const [vehicleFilters, setVehicleFilters] = useState<Map<FilteringParamsEnum, string | undefined>>(
        getVehicleFilteringParamsFromUrl(location.search)
    );
    const [currentPage, setCurrentPage] = useState<number>(getPageFromUrl(location.search));
    const [perPageCount, setPerPageCount] = useState<number>(
        getCountFromUrl(location.search) <= 0 ? DEFAULT_PER_PAGE_COUNT : getCountFromUrl(location.search)
    );

    const getVehiclesWithFiltering = useCallback(
        (vehicleFilters: Map<FilteringParamsEnum, string | undefined>) =>
            getVehiclesListWithFiltering(vehicleFilters, currentPage, perPageCount).then(
                (vehicleResponseDTOPage: Page<VehicleResponseDTO>) => {
                    const maxPage = vehicleResponseDTOPage.totalPages - 1;
                    if (currentPage > maxPage) {
                        setCurrentPage(maxPage);
                    } else {
                        setVehiclesPage(vehicleResponseDTOPage);
                    }
                }
            ),
        [currentPage, perPageCount]
    );

    useEffect(() => {
        getVehiclesWithFiltering(vehicleFilters);
    }, [getVehiclesWithFiltering, vehicleFilters]);

    const handleFilterSubmit = (
        event: React.FormEvent<HTMLFormElement>,
        vehicleFilters: Map<FilteringParamsEnum, string | undefined>
    ): void => {
        event.preventDefault();
        setVehicleFilters(vehicleFilters);
        const vehicleFiltersParamsUrl: ParsedQs = mapVehicleFiltersToQs(vehicleFilters);
        window.history.replaceState(null, '', `?${qs.stringify(vehicleFiltersParamsUrl)}`);
        setCurrentPage(0);
    };

    return (
        <div id="car-list-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 container mb-5 mt-3">
                        <VehicleSearchFilters handleFilterSubmit={handleFilterSubmit} />
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
                                                window.history.replaceState(
                                                    null,
                                                    '',
                                                    `?${qs.stringify(currentParams)}`
                                                );
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
                                                    currentParams['size'] = newValue.value;
                                                    window.history.replaceState(
                                                        null,
                                                        '',
                                                        `?${qs.stringify(currentParams)}`
                                                    );
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
