import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';

export class UserData extends React.Component {

	constructor(){
		super();

		this.state = {
			userRoles:null,
			username:null
		}
	}

	componentDidMount(){
		fetch("http://localhost:8080/CarRental/userdata/userroles")
		.then(response => response.json())
		.then(data => {this.setState({
				userRoles:data.userroles
			})
		})
		.catch(error => {});


		fetch("http://localhost:8080/CarRental/userdata/username")
		.then(response => response.json())
		.then(data => {this.setState({
				username:data.username
			})
		})
		.catch(error => {});
	}

	render () {
		const username = this.state.username;

		return (
      <div className="card">
        <div className="card-header text-center">
          <img className="" src={require("../../../main/static/img/car_rental_logo_name.png")} alt="" style={{"width" : "80%"}}/>
        </div>
        <div className="card-body">
          <div className="row text-center">
            <div className="col-md-3">
              <img src={require("../../../main/static/img/user.png")} alt="" className="mr-3 mt-3 rounded-circle" style={{"height" : 80}}/>
            </div>
            <div className="mx-auto mt-4 text-center my-auto">
              <strong>{username ? username : ""}</strong>
            </div>
          </div>
        </div>
      </div>
		)
	}

}
