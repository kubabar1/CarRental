import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import '../../../static/css/car_details.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class ReserveButton extends React.Component {

	constructor(){
		super();

		this.state = {
			carCity:null
		};
	}


	componentDidMount(){
		const carCityId = this.props.vehicleProperties.locationId;
		const url = "http://localhost:8080/CarRental/locations/"+carCityId;

		 fetch(url)
		 .then(response=>{
		   response.json().then(json=>{
					this.setState({carCity:json.city});
		   });
		 });
	}

	renderContent = () => {
		const selectedCar = this.props.vehicleProperties.id;
		const carCity = this.state.carCity;


		return(
			<div>
				<h3 className="mt-2 ml-3 mb-4">Actions</h3>

				<Link to={{
					pathname: "/CarRental/reservation/data",
					state: {
						selectedCar:selectedCar,
						selected_city:carCity
					}
				}}className="linkstyle btn btn-success px-5 py-2 ml-3">
					Reserve
				</Link>
			</div>
		);
	}

	render () {
		const carCity = this.state.carCity;

		return (
      <section className="text-left">
        {carCity ? this.renderContent() : ""}
      </section>
		)
	}
}

export default withRouter(ReserveButton);
