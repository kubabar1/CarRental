import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_details.css';

export class CarState extends React.Component {

	render () {

		const vehicleStatus=this.props.carprops.vehicleStatus;


		if(vehicleStatus=="AVI"){
				return (
					<section>
						<div className="text-left">
							<h3 className="mt-2 ml-3 mb-4">Car state</h3>
						</div>
						<div className="card bg-success text-white ml-3 mt-5 mb-3 text-center col-md-5 ">
						   <div className="card-body"><h5>Available</h5></div>
						  </div>
				 	</section>
		)
		}else{
				return (
					<section>
						<div className="text-left">
							<h3 className="mt-2 ml-3 mb-4">Car state</h3>
						</div>
						<div className="card bg-danger text-white ml-3 mt-5 mb-3 text-center col-md-5 ">
							<div className="card-body"><h5>Unavailable</h5></div>
						</div>
					</section>
				)

			}


	}
}
