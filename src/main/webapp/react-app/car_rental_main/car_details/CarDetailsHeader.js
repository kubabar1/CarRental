import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import '../../../static/css/car_details.css';

export class CarDetailsHeader extends React.Component {

	render () {

		const vehicleProperties=this.props.vehicleProperties;


    const image_url = '/CarRental/vehicles-img/'+vehicleProperties.vehicleParameters.photoName;

		return (
      <section>
        <div className="row">
          <h1 className="mt-2 ml-5">{vehicleProperties.brand} {vehicleProperties.model}</h1>
          <div className="card bg-success text-white ml-auto mr-5">
            <div className="card-body"><h5>${vehicleProperties.dailyFee}</h5></div>
          </div>
        </div>

        <div id="car-details-image" className="car-img-container shadow my-3 col-md-10 offset-md-1" style={{ backgroundImage : `url(${image_url})`,  backgroundPosition: "center",  backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        </div>
      </section>
		)
	}
}
