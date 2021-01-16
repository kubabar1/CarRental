import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import '../../../main/static/css/home.css';
import { Link } from 'react-router-dom'

export class RoundedImg extends React.Component {

	render () {

		return (
      <div id="car-types-round-images">
        <div className="container mt-5 mb-4">
          <div className="row">
            <div className="car-item col-sm-6 col-md-3">
							<Link to='/CarRental/listcar' className="linkstyle_black">
              	<img src='/CarRental/etc-img/sport_car_round2.jpeg' className="img-responsive" />
              	<div className="text-under-round-image">
                	<h2>Sportowe</h2>
              	</div>
							</Link>
            </div>

            <div className="car-item col-sm-6 col-md-3">
							<Link to='/CarRental/listcar' className="linkstyle_black">
              <img src='/CarRental/etc-img/sedan_car_round.jpeg' className="img-responsive"/>
              	<div className="text-under-round-image">
                	<h2>Sedan</h2>
              	</div>
							</Link>
            </div>

            <div className="car-item col-sm-6 col-md-3">
							<Link to='/CarRental/listcar' className="linkstyle_black">
              	<img src='/CarRental/etc-img/suv_car_round2.jpeg' className="img-responsive"/>
              	<div className="text-under-round-image">
                	<h2>SUV</h2>
              	</div>
							</Link>
            </div>

            <div className="car-item col-sm-6 col-md-3">
							<Link to='/CarRental/listcar' className="linkstyle_black">
              	<img src='/CarRental/etc-img/cabrio_car_round2.jpeg' className="img-responsive"/>
              	<div className="text-under-round-image">
                	<h2>Kabriolet</h2>
              	</div>
							</Link>
            </div>
          </div>
        </div>
      </div>
		)
	}

}
