import React, { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getCountFromUrl, getPageFromUrl } from '../../../utils/UrlUtil';
import { VehicleItem } from '../vehicle_list/vehicle_item/VehicleItem';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { LoaderContainer } from '../vehicle_list/container/LoaderContainer';
import qs, { ParsedQs } from 'qs';
import Select, { SingleValue } from 'react-select';
import { TranslationService, VehicleService } from '@car-rental/shared/service';
import './BestOffersPage.scss';
import { VehicleResponseDTO, Page } from '@car-rental/shared/model';

type OptionType = { value: string | null; label: string | null };

function BestOffersPage(): JSX.Element {
    const VEHICLES_PER_PAGE_COUNTS: number[] = [5, 10, 25, 50];
    const DEFAULT_PER_PAGE_COUNT = 10;
    const history = useHistory();
    const location = useLocation();
    const page: number = getPageFromUrl(location.search);
    const count: number = getCountFromUrl(location.search);
    const [vehiclesPage, setVehiclesPage] = useState<Page<VehicleResponseDTO> | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number>(page);
    const [perPageCount, setPerPageCount] = useState<number>(count <= 0 ? DEFAULT_PER_PAGE_COUNT : count);

    const changeUrlPageParam = useCallback(
        (pageNb: number) => {
            const currentParams: ParsedQs = qs.parse(location.search, {
                ignoreQueryPrefix: true,
            });
            currentParams['page'] = `${pageNb}`;
            history.push({
                search: `?${qs.stringify(currentParams)}`,
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        [location.search, history]
    );

    useEffect(() => {
        VehicleService.getBestOffersVehiclesList(currentPage, perPageCount).then(
            (vehicleResponseDTOS: Page<VehicleResponseDTO>) => {
                const maxPage = vehicleResponseDTOS.totalPages - 1;
                if (currentPage > maxPage) {
                    setCurrentPage(maxPage);
                    changeUrlPageParam(maxPage);
                } else {
                    setVehiclesPage(vehicleResponseDTOS);
                }
            }
        );
    }, [currentPage, perPageCount, changeUrlPageParam]);

    const mapToOptionType = (val: number): OptionType => {
        return {
            value: `${val}`,
            label: `${val}`,
        };
    };

    return (
        <div id="best-offers-container" className="container mt-4 col-md-9 text-center">
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
                                previousLabel={TranslationService.translate('previous')}
                                nextLabel={TranslationService.translate('next')}
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
    );
}

export default withRouter(BestOffersPage);
