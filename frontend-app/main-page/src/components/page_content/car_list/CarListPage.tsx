import React from 'react';
import './CarListPage.scss';
import { CarSearchFilters } from './filters/CarSearchFilters';
import LocalisationResponseDTO from '../../../model/LocalisationResponseDTO';
import VehicleResponseDTO from '../../../model/VehicleResponseDTO';
import ReactPaginate from 'react-paginate';
// import { scrollTop } from '../../../utils/ScrollUtil';
//extends RouteComponentProps
import ClipLoader from 'react-spinners/ClipLoader';
import { endpoints } from '../../../constants/PathsAPI';
import Page from '../../../model/Page';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CarItem } from './car_item/CarItem';
import { getPageFromUrl } from '../../../utils/UrlUtil';
import { vehicleResponseDTOMock, vehicleResponseDTOMock2 } from '../../../constants/MockData';

interface CarListProperties extends RouteComponentProps {
    localisations: LocalisationResponseDTO[] | null;
}

interface CarListState {
    activePage: number;
    totalPages: number;
    totalElements: number;
    vehiclesCountOnSinglePage: number;
    vehicles: VehicleResponseDTO[] | null;
    loaded: boolean;
}

class CarListPage extends React.Component<CarListProperties, CarListState> {
    constructor(props: CarListProperties) {
        super(props);
        this.state = {
            activePage: 0,
            totalPages: 0,
            totalElements: 0,
            vehiclesCountOnSinglePage: 20,
            vehicles: null,
            loaded: false,
        };
    }

    componentDidMount() {
        const activePage: number = getPageFromUrl(this.props.location.search);
        this.setState({ activePage: activePage });
        this.loadVehicles(activePage);
    }

    loadVehicles = (activePage: number): void => {
        const url = endpoints.carsPageableEndpoint(activePage, this.state.vehiclesCountOnSinglePage);
        fetch(url)
            .then((response: Response) => {
                response.json().then((vehiclesPage: Page<VehicleResponseDTO>) => {
                    this.setState({
                        vehicles: vehiclesPage.content,
                        totalPages: vehiclesPage.totalPages,
                        totalElements: vehiclesPage.totalElements,
                        loaded: true,
                    });
                });
            })
            .finally(() => {
                this.setState({
                    vehicles: [vehicleResponseDTOMock, vehicleResponseDTOMock2], // TODO: REMOVE
                    loaded: true,
                });
            });
    };

    handlePageClick = (data: { selected: number }) => {
        this.setState({ loaded: false }, () => {
            this.loadVehicles(data.selected);
        });
    };

    vehiclesToTableRow = (vehicle: VehicleResponseDTO) => {
        return <CarItem vehicle={vehicle} />;
    };

    render() {
        const { vehicles, totalPages, loaded } = this.state;

        return (
            <div id="car-list-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 container  mb-5 mt-3 ">
                            <CarSearchFilters />
                        </div>
                        <div id="search-results-container" className="col-md-9 text-center">
                            {loaded ? (
                                vehicles ? (
                                    <div id="vehicles-paginate-container">
                                        {vehicles.map((vehicle: VehicleResponseDTO) =>
                                            this.vehiclesToTableRow(vehicle)
                                        )}
                                        {totalPages > 1 && (
                                            <ReactPaginate
                                                pageCount={totalPages}
                                                pageRangeDisplayed={5}
                                                marginPagesDisplayed={3}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={'pagination'}
                                                pageClassName={'page-item'}
                                                pageLinkClassName={'page-link'}
                                                activeClassName={'active'}
                                                previousClassName={'page-item'}
                                                previousLinkClassName={'page-link'}
                                                nextClassName={'page-item'}
                                                nextLinkClassName={'page-link'}
                                                breakClassName={'page-item'}
                                                breakLinkClassName={'page-link'}
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <div className="search-result-none alert alert-info">
                                        Nie znaleziono aut o podanych parametrach
                                    </div>
                                )
                            ) : (
                                <ClipLoader size={50} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CarListPage);
