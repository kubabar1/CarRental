import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import {HeaderContainer} from '../tools/HeaderContainer.js';
import {ResultNumberSelection} from '../tools/ResultNumberSelection.js';
import {Pageable} from "../tools/Pageable.js"
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

export class AllBookings extends React.Component {


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
      const url = "http://localhost:8080/CarRental/booking?page="+page+"&number="+number;

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
          <td>{booking.userId}</td>
          <td>{booking.vehicleId}</td>
          <td>{booking.receiptDate}</td>
          <td>{booking.returnDate}</td>
          <td>{booking.locationId}</td>
          <td>{booking.bookingStateCode}</td>
          <td>{booking.totalCost}</td>
        </tr>
      );
    }

    renderAllBookingsTable = (allBookingsList) => {

  		return (
        <div className="p-3 table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
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
            <tbody>
              {allBookingsList ? allBookingsList.map(this.renderRow) : ""}
            </tbody>
          </table>
        </div>
  		)
    }

    timestamp = () => {
      var today = new Date();
		  var mm = today.getMonth() + 1;
		  var dd = today.getDate();


		  var HH = today.getHours();
		  var mm = today.getMinutes();
		  var ss = today.getSeconds();


		  return [today.getFullYear(),
						  (mm>9 ? '' : '0') + mm,
						  (dd>9 ? '' : '0') + dd
				 	  ].join('-')+" "+[
						  (HH>9 ? '' : '0') + HH,
						  (mm>9 ? '' : '0') + mm ,
						  (ss>9 ? '' : '0') + ss
				 	  ].join(':');
    }

    timestampFIleName = () => {
      var today = new Date();
		  var mm = today.getMonth() + 1;
		  var dd = today.getDate();


		  var HH = today.getHours();
		  var mm = today.getMinutes();
		  var ss = today.getSeconds();


		  return [today.getFullYear(),
						  (mm>9 ? '' : '0') + mm,
						  (dd>9 ? '' : '0') + dd,
						  (HH>9 ? '' : '0') + HH,
						  (mm>9 ? '' : '0') + mm ,
						  (ss>9 ? '' : '0') + ss
				 	  ].join('');
    }


    download = () => {
      const url = "http://localhost:8080/CarRental/booking/excelfile";

      fetch(url).then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "bookings_"+this.timestampFIleName()+".xlsx";
            a.click();
        })
        .catch(error => {"Cannot download excel file."});


    }

  	render () {
      const loaded = this.state.loaded;
      const allBookingsList = this.state.allBookingsList;

  		return (
        <div className="col-md-9 pl-0 pr-3">
          <div className="card">
            <HeaderContainer title={"All bookings"}/>
            <div className="card-body text-center">
              <div className="row">
                <ResultNumberSelection setResultNumber={this.setResultNumber}/>
                {loaded ? <button className="my-3 ml-auto btn btn-primary" onClick={this.download}>Download file</button> : ""}
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
