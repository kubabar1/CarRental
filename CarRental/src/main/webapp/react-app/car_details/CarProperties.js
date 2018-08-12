import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_details.css';

export class CarProperties extends React.Component {

	render () {

		const vehicleProperties=this.props.carprops;

		var frontWheelDrive;
		var metallic;

		if(vehicleProperties.vehicleParameters.frontWheelDrive==1){
			frontWheelDrive="Yes";
		}else{
			frontWheelDrive="No";
		}

		if(vehicleProperties.vehicleParameters.metallic==1){
			metallic="Yes";
		}else{
			metallic="No";
		}


		return (
      <section>
				<div className="text-left">
        	<h3 className="mt-2 ml-3 mb-4">Car details</h3>
				</div>

        <div className="row">
          <div className="col-md-6 text-left">
            <p className="mx-5 my-4">Body type:   <strong>{vehicleProperties.vehicleParameters.bodytype}</strong></p>
            <p className="mx-5 my-4">Vehicle brand:  <strong>{vehicleProperties.brand}</strong></p>
            <p className="mx-5 my-4">Vehicle model:  <strong>{vehicleProperties.model}</strong></p>
            <p className="mx-5 my-4">Production year:  <strong>{vehicleProperties.vehicleParameters.productionYear}</strong></p>
            <p className="mx-5 my-4">Fuel type:  <strong>{vehicleProperties.vehicleParameters.fuelType}</strong></p>
            <p className="mx-5 my-4">Power:            <strong>{vehicleProperties.vehicleParameters.power} KM</strong></p>
          </div>
          <div className="col-md-6 text-left">
            <p className="mx-5 my-4">Gearbox:         <strong>{vehicleProperties.vehicleParameters.gearbox}</strong></p>
            <p className="mx-5 my-4">Front-wheel drive:  <strong>{frontWheelDrive}</strong></p>
            <p className="mx-5 my-4">Doors number:            <strong>{vehicleProperties.vehicleParameters.doorsNumber}</strong></p>
            <p className="mx-5 my-4">Seats number:           <strong>{vehicleProperties.vehicleParameters.seatsNumber}</strong></p>
            <p className="mx-5 my-4">Color:                   <strong>{vehicleProperties.vehicleParameters.color}</strong></p>
            <p className="mx-5 my-4">Metallic:                 <strong>{metallic}</strong></p>
          </div>
        </div>
      </section>
		)
	}
}
