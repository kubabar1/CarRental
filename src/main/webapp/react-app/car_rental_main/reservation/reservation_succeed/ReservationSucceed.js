import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../../static/css/main.css';
import '../../../../static/css/reservation_data.css';
import {Logo} from '../Logo.js';
import { Link } from 'react-router-dom'


export class ReservationSucceed extends React.Component{

  render(){

    return(
      <div id="login-page-container" className="container my-5">
        <div className="col-md-4 offset-md-4 card-body shadow-lg text-center">
          <div className="container mt-5">
            <img className="mb-4" src={require("../../../../static/img/car_rental_logo_name.png")} width="100%"/>
          </div>

          <h3 className="mb-4">Reservation succeed!</h3>

          <Link to={"/CarRental/"} className="linkstyle btn btn-lg btn-primary btn-block">Home</Link>
        </div>
      </div>
    );
  }

}
