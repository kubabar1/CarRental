import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/best_offers.css';

export class Item extends React.Component {

	render () {

    const image_url = '/CarRental/vehicles-img/'+this.props.photoName;

		return (
      <div className="car-single-item container col-lg-3 col-md-5 col-sm-7 card card-body shadow mx-4 my-3">
        <div className="text-center">
          <h4>{this.props.brand} {this.props.model}</h4><span className="badge badge-success">Best offer</span>
        </div>
        <div className="car-img-container mb-3" style={{ backgroundImage : `url(${image_url})`,  backgroundPosition: "center",  backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        </div>
        <div className="row mt-2">
          <h2 className="ml-3">${this.props.dailyFee}</h2>
          <a href={"car_properties/"+this.props.id} className="btn btn-info mr-auto ml-3">Properties</a>
        </div>
      </div>
		)
	}
}
