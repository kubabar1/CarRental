import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../static/css/main.css';
import {Link } from 'react-router-dom';

export class MainNav extends React.Component {
	render () {
		return (
				<nav id="main-nav" className="navbar navbar-expand-lg navbar-light  sticky-top">
			    <a className="navbar-brand pl-5" href="index.html">
			      <img src={require("../static/img/car_logo.png")} alt="Logo" style={{width:200}}/>
			    </a>

			    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
			        <span className="navbar-toggler-icon"></span>
			    </button>
			    <div className="collapse navbar-collapse" id="collapsibleNavbar">

							<ul className="navbar-nav pr-3 ml-auto">
								<li className="nav-item p-2 ">
									<Link to='/CarRental/'><h4>Home</h4></Link>
								</li>
								<li className="nav-item p-2">
									<Link to='/CarRental/carlist'><h4>Car list</h4></Link>
								</li>
								<li className="nav-item p-2">
									<Link to='/CarRental/bestoffers'><h4>Best offers</h4></Link>
								</li>
								<li className="nav-item p-2">
									<Link to='/CarRental/blog'><h4>Blog</h4></Link>
								</li>
								<li className="nav-item p-2">
									<Link to='/CarRental/aboutus'><h4>About us</h4></Link>
								</li>
								<li className="nav-item p-2">
									<Link to='/CarRental/contact'><h4>Contact</h4></Link>
								</li>
							</ul>



			    </div>
			  </nav>
		)
	}

}
