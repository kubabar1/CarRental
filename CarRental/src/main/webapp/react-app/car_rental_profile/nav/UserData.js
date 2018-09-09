import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';

export class UserData extends React.Component {

	render () {
		return (
      <div className="card">
        <div className="card-header text-center">
          <img className="" src={require("../../../static/img/car_rental_logo_name.png")} alt="" style={{"width" : "80%"}}/>
        </div>
        <div className="card-body">
          <div className="row text-center">
            <div className="col-md-3">
              <img src={require("../../../static/img/user.png")} alt="" className="mr-3 mt-3 rounded-circle" style={{"height" : 80}}/>
            </div>
            <div className="mx-auto mt-4 text-center">
              <strong>ADMIN</strong>
              <p>Jan Kowalski</p>
            </div>
          </div>
        </div>
      </div>
		)
	}

}
