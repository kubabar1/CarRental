import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

class UserTable extends React.Component {

  renderRow = (car) => {
    const url = "/CarRental/profile/editcar/"+car.id;

    return(
      <tr key={car.id}>
        <td><Link to={url} className="linkstyle btn btn-success custom-width">Edit</Link></td>
        <td>{car.id}</td>
        <td>{car.brand}</td>
        <td>{car.model}</td>
        <td>{car.dailyFee}</td>
        <td>{car.registration}</td>
        <td>{car.locationId}</td>
        <td>{car.vehicleStatus}</td>
        <td>{car.bestOffer==1 ? "YES" : "NO"}</td>
      </tr>
    );
  }

	render () {
    const carlist = this.props.carlist;

		return (
      <div className="p-3 table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Edit</th>
              <th>Id</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Daily fee</th>
              <th>Registration</th>
              <th>Location</th>
              <th>Vehicle status</th>
              <th>Best offer</th>
            </tr>
          </thead>
          <tbody>
            {carlist ? carlist.map(this.renderRow) : ""}
          </tbody>
        </table>
      </div>
		)
	}

}

export default withRouter(UserTable);
