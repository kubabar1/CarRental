import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../main/static/css/main.css';
import {Link} from 'react-router-dom';

export class MainNav extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	        active: false,
	    };
	}

	toggleClass = () => {
	    const currentState = this.state.active;
	    this.setState({ active: !currentState });
	};

	setTrue = () => {
	    this.setState({ active: true });
	};


	render () {
		return (
				<nav id="main-nav" className="navbar navbar-expand-lg navbar-light  sticky-top">
			    <Link to={"/CarRental/"} className="navbar-brand pl-5 linkstyle">
			      <img src={require("../../main/static/img/car_logo.png")} alt="Logo" style={{width:200}}/>
			    </Link>
			    <button className="navbar-toggler" type="button"  onClick={this.toggleClass}>
			        <span className="navbar-toggler-icon"></span>
			    </button>
			    <div className={this.state.active ? 'collapse navbar-collapse show' : "collapse navbar-collapse"} id="collapsibleNavbar">
							<ul className="navbar-nav pr-3 ml-auto">
								<li data-toggle="collapse" data-target="#collapsibleNavbar" className="nav-item p-2 ">
									<Link onClick={this.setTrue} to='/CarRental/' className="navlinkstyle"><h4>Home</h4></Link>
								</li>
								<li data-toggle="collapse" data-target="#collapsibleNavbar" className="nav-item p-2">
									<Link onClick={this.setTrue} to='/CarRental/listcar' className="navlinkstyle"><h4>Car list</h4></Link>
								</li>
								<li data-toggle="collapse" data-target="#collapsibleNavbar" className="nav-item p-2">
									<Link onClick={this.setTrue} to='/CarRental/bestoffers' className="navlinkstyle"><h4>Best offers</h4></Link>
								</li>
								<li data-toggle="collapse" data-target="#collapsibleNavbar" className="nav-item p-2">
									<Link onClick={this.setTrue} to='/CarRental/aboutus' className="navlinkstyle"><h4>About us</h4></Link>
								</li>
								<li data-toggle="collapse" data-target="#collapsibleNavbar" className="nav-item p-2">
									<Link onClick={this.setTrue} to='/CarRental/contact' className="navlinkstyle"><h4>Contact</h4></Link>
								</li>
							</ul>
			    </div>
			  </nav>
		)
	}

}
