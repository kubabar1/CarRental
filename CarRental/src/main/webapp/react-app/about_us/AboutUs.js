import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/about_us.css';
import {Description} from './Description.js';
import {AboutCarRental} from './AboutCarRental.js';
import {BestRental} from './BestRental.js';

export class AboutUs extends React.Component {

	render () {
		return (
      <div>
        <Description/>
        <AboutCarRental/>
        <BestRental/>
      </div>
		)
	}

}
