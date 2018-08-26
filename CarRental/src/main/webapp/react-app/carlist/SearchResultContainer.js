import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_list.css';
import {CarSearchItem} from './CarSearchItem.js';


export class SearchResultContainer extends React.Component {

	vehiclesToTableRow = vehicles=>{
			const id = vehicles.id;
			const brand = vehicles.brand;
			const model = vehicles.model;
			const dailyFee = vehicles.dailyFee;
			const description = vehicles.vehicleParameters.description;
			const photoName = vehicles.vehicleParameters.photoName;

			return <CarSearchItem key={id} id={id} name={name} brand={brand} model={model} dailyFee={dailyFee} description={description} photoName={photoName}/>;
		}

	render () {
		return (
      <div>
				{this.props.vehicles.map(this.vehiclesToTableRow)}
      </div>
		)
	}

}
