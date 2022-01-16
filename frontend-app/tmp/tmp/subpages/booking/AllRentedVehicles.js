import * as React from 'react';
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import { HeaderContainer } from '../tools/HeaderContainer.js';
import { ResultNumberSelection } from '../tools/ResultNumberSelection.js';
import { Pageable } from '../tools/Pageable.js';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

export class AllRentedVehicles extends React.Component {
    constructor() {
        super();
        this.state = {
            allBookingsList: null,
            resultNumber: 5,
            pageNumber: 0,
            totalPages: null,
            totalElements: null,
            loaded: false,
        };
    }

    componentDidMount() {
        this.setBookingList(this.state.pageNumber, this.state.resultNumber);
    }

    setResultNumber = (number) => {
        this.setState({ resultNumber: number });
        this.setBookingList(this.state.pageNumber, number);
    };

    setPageNumber = (page) => {
        this.setState({ pageNumber: page });
        this.setBookingList(page, this.state.resultNumber);
    };

    setBookingList = (page, number) => {
        const url = 'http://localhost:8080/CarRental/booking/rented?page=' + page + '&number=' + number;

        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    allBookingsList: json.content,
                    totalPages: json.totalPages,
                    totalElements: json.totalElements,
                    loaded: true,
                });
            })
            .catch((error) => {});
    };

    returnBooking = (bookingId) => {
        const url = 'http://localhost:8080/CarRental/booking/return/' + bookingId;

        fetch(url, {
            method: 'PUT',
        })
            .then((response) => {
                this.setBookingList(this.state.pageNumber, this.state.resultNumber);
            })
            .catch((error) => {});
    };

    renderRow = (booking) => {
        const url1 = '';
        const url2 = '';

        return (
            <tr key={booking.id}>
                <td>
                    <button
                        className="btn btn-primary custom-width"
                        onClick={() => {
                            this.returnBooking(booking.id);
                        }}
                    >
                        Return
                    </button>
                </td>
                <td>{booking.id}</td>
                <td>{booking.userId}</td>
                <td>{booking.vehicleId}</td>
                <td>{booking.receiptDate}</td>
                <td>{booking.returnDate}</td>
                <td>{booking.locationId}</td>
                <td>{booking.bookingStateCode}</td>
                <td>{booking.totalCost}</td>
            </tr>
        );
    };

    renderAllBookingsTable = (allBookingsList) => {
        return (
            <div className="p-3 table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Return</th>
                            <th>booking ID</th>
                            <th>user ID</th>
                            <th>vehicle ID</th>
                            <th>receipt date</th>
                            <th>return date</th>
                            <th>location ID</th>
                            <th>booking state</th>
                            <th>total cost</th>
                        </tr>
                    </thead>
                    <tbody>{allBookingsList ? allBookingsList.map(this.renderRow) : ''}</tbody>
                </table>
            </div>
        );
    };

    render() {
        const loaded = this.state.loaded;
        const allBookingsList = this.state.allBookingsList;

        return (
            <div className="col-md-9 pl-0 pr-3">
                <div className="card">
                    <HeaderContainer title={'All rented vehicles'} />
                    <div className="card-body text-center">
                        <div className="row">
                            <ResultNumberSelection setResultNumber={this.setResultNumber} />
                        </div>
                        <hr className="mb-3"></hr>
                        {allBookingsList ? (
                            this.renderAllBookingsTable(allBookingsList)
                        ) : (
                            <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>
                        )}
                        {loaded ? (
                            <Pageable
                                setPageNumber={this.setPageNumber}
                                activePageNumber={this.state.pageNumber}
                                totalPages={this.state.totalPages}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
