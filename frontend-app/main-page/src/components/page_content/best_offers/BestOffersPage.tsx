import React from 'react';
import LocalisationResponseDTO from '../../../model/LocalisationResponseDTO';
import { VehicleResponseDTO } from '../../../model/VehicleResponseDTO';
import ReactPaginate from 'react-paginate';
import ClipLoader from 'react-spinners/ClipLoader';
import { getPageFromUrl } from '../../../utils/UrlUtil';
import { endpoints } from '../../../constants/PathsAPI';
import Page from '../../../model/Page';
import { VehicleItem } from '../vehicle_list/vehicle_item/VehicleItem';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface BestOffersPageProperties extends RouteComponentProps {
    localisations: LocalisationResponseDTO[] | null;
}

interface BestOffersPageState {
    activePage: number;
    totalPages: number;
    totalElements: number;
    vehiclesCountOnSinglePage: number;
    vehicles: VehicleResponseDTO[] | null;
    loaded: boolean;
}

class BestOffersPage extends React.Component<BestOffersPageProperties, BestOffersPageState> {
    constructor(props: BestOffersPageProperties) {
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

    componentDidMount(): void {
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
                    vehicles: [], // TODO: REMOVE
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
        return <VehicleItem vehicle={vehicle} key={vehicle.id} />;
    };

    render(): JSX.Element {
        const { loaded, vehicles, totalPages } = this.state;

        return (
            <div id="car-best-offers-list-content">
                <div className="container-fluid">
                    <div id="best-offers-car-container" className="container text-center">
                        {loaded ? (
                            vehicles ? (
                                <div id="vehicles-paginate-container">
                                    {vehicles.map((vehicle: VehicleResponseDTO) => this.vehiclesToTableRow(vehicle))}
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
                                <div className="search-result-none alert alert-info">Brak ofert specjalnych</div>
                            )
                        ) : (
                            <ClipLoader size={50} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(BestOffersPage);
