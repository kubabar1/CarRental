import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import '../../../static/css/reservation_data.css';


export class Logo extends React.Component {

	render () {
		return (
      <div className="container col-md-8 offset-md-2 mt-5">
        <img className="mb-4 col-md-6 offset-md-3" src={require("../../../static/img/car_rental_logo_name.png")} width="100%"/>
      </div>
		)
	}

}
