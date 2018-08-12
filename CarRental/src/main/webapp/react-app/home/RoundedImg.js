import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/home.css';

export class RoundedImg extends React.Component {

	render () {

		return (
      <div id="car-types-round-images">
        <div className="container mt-5 mb-4">
          <div className="row">
            <div className="car-item col-sm-6 col-md-3">
              <img src='/CarRental/etc-img/sport_car_round2.jpeg' className="img-responsive" />
              <div className="text-under-round-image">
                <h2>Sportowe</h2>
              </div>
            </div>

            <div className="car-item col-sm-6 col-md-3">
              <img src='/CarRental/etc-img/sedan_car_round.jpeg' className="img-responsive"/>
              <div className="text-under-round-image">
                <h2>Sedan</h2>
              </div>
            </div>

            <div className="car-item col-sm-6 col-md-3">
              <img src='/CarRental/etc-img/suv_car_round2.jpeg' className="img-responsive"/>
              <div className="text-under-round-image">
                <h2>SUV</h2>
              </div>
            </div>

            <div className="car-item col-sm-6 col-md-3">
              <img src='/CarRental/etc-img/cabrio_car_round2.jpeg' className="img-responsive"/>
              <div className="text-under-round-image">
                <h2>Kabriolet</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
		)
	}

}
