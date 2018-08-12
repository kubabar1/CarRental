import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/best_offers.css';
import { Link } from 'react-router-dom'


export class PageLocation extends React.Component {
	render () {
		return (
			<div id="location-page">
    		<div className="container mt-3">
      		<p><a href="/CarRental/">Home</a> > Best offers</p>
    		</div>
  		</div>
		)
	}

}
