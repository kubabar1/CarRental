import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import '../../../main/static/css/register.css';
import { Link } from 'react-router-dom'

export class Register extends React.Component{

  handleSubmit = (e) => {
		e.preventDefault()
		this.props.history.push({
  		pathname: '/CarRental/login',
  		state: {
			}
		});
	}

  render(){
    return(
      <div id="register-page-container" className="container my-5 full_body_register">
        <div className="col-md-6 offset-md-3 card-body shadow-lg">
          <form onSubmit={this.handleSubmit}>
            <img className="mb-4" src={require("../../../main/static/img/car_rental_logo_name.png")} alt="" width="100%"/>
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>

            <div className="form-group">
              <label>Name:</label>
              <input type="text" className="form-control" id="inputName" name="inputName" placeholder="Name" required autoFocus/>
            </div>

            <div className="form-group">
              <label>Last Name:</label>
              <input type="text" className="form-control" id="inputLastName" name="inputLastName" placeholder="Last Name" required/>
            </div>

            <div className="form-group">
              <label>Username:</label>
              <input type="text" className="form-control" id="inputUsername" name="inputUsername" placeholder="Username" required/>
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input type="email" className="form-control" id="inputEmail" name="inputEmail" placeholder="Email" required/>
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input type="password" className="form-control" id="inputPassword" name="inputPassword" placeholder="Password" required autocomplete="off"/>
            </div>

            <div className="form-group">
              <label>Password again:</label>
              <input type="password" className="form-control" id="inputPasswordAgain" name="inputPasswordAgain" placeholder="Password" required autocomplete="off"/>
            </div>

            <button className="btn btn-lg btn-primary btn-block mt-5" type="submit">Register</button>
          </form>
          <p className="mt-3 login_link pl-3"><Link to={"/CarRental/"} className="linkstyle">Home</Link></p>
        </div>
      </div>
    );
  }

}
