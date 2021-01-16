import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import '../../../main/static/css/car_details.css';
import { Link } from 'react-router-dom'

export class PageLocation extends React.Component {
	render () {
		return (
			<div id="location-page">
    		<div className="container mt-3">
      		<p><Link to={"/CarRental/"}>Home</Link> > <Link to={"/CarRental/listcar"}>Vehicle list</Link> > Properties</p>
    		</div>
  		</div>
		)
	}
}
