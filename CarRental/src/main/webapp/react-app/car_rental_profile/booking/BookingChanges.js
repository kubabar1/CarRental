import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import {HeaderContainer} from '../tools/HeaderContainer.js';
import {ResultNumberSelection} from '../tools/ResultNumberSelection.js';
import {Pageable} from "../tools/Pageable.js"
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

export class BookingChanges extends React.Component {


    constructor() {
      super();
      this.state = {
        allBookingsList:null,
        resultNumber:5,
        pageNumber:0,
        totalPages:null,
        totalElements:null,
        loaded:false
      };
    }

  	componentDidMount(){
  		this.setBookingList(this.state.pageNumber, this.state.resultNumber);
    }

    setResultNumber = (number) => {
      this.setState({resultNumber:number});
      this.setBookingList(this.state.pageNumber,number);
    }

    setPageNumber = (page) => {
      this.setState({pageNumber:page});
      this.setBookingList(page, this.state.resultNumber);
    }

    setBookingList = (page,number) => {
      const url = "http://localhost:8080/CarRental/bookingchanges?page="+page+"&number="+number;

      fetch(url).then(response => response.json())
  		.then(json => {this.setState({
        allBookingsList:json.content,
        totalPages:json.totalPages,
        totalElements:json.totalElements,
        loaded:true})
      })
  		.catch(error => {});
    }

    renderRow = (booking) => {
      return(
        <tr key={booking.id}>
          <td>{booking.id}</td>
          <td>{booking.bookingId}</td>
          <td>{booking.changesDate}</td>
          <td>{booking.who}</td>
          <td>{booking.pc}</td>
        </tr>
      );
    }

    renderAllBookingsTable = (allBookingsList) => {
      console.log(allBookingsList);

  		return (
        <div className="p-3 table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>booking ID</th>
                <th>changes date</th>
                <th>who</th>
                <th>PC</th>
              </tr>
            </thead>
            <tbody>
              {allBookingsList ? allBookingsList.map(this.renderRow) : ""}
            </tbody>
          </table>
        </div>
  		)
    }

  	render () {
      const loaded = this.state.loaded;
      const allBookingsList = this.state.allBookingsList;

  		return (
        <div className="col-md-9 pl-0 pr-3">
          <div className="card">
            <HeaderContainer title={"Booking changes"}/>
            <div className="card-body text-center">
              <div className="row">
                <ResultNumberSelection setResultNumber={this.setResultNumber}/>
              </div>
              <hr className="mb-3"></hr>
              {allBookingsList ? this.renderAllBookingsTable(allBookingsList) : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
              {loaded ? <Pageable setPageNumber={this.setPageNumber} activePageNumber={this.state.pageNumber} totalPages={this.state.totalPages}/> : ""}
            </div>
          </div>
        </div>
  		)
  	}

}
