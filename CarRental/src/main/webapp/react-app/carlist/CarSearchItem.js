import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_list.css';
import { Link } from 'react-router-dom'


export class CarSearchItem extends React.Component {

	render () {
    const image_url = '/CarRental/vehicles-img/'+this.props.photoName;
		return (

      <div className="item">
        <div className="container-car-search container card card-body shadow-sm my-4">
          <div className="row">
            <div className='car-img-container col-md-3 home-card-view flex-center'
                       style={{ backgroundImage : `url(${image_url})`,  backgroundPosition: "center",  backgroundRepeat: "no-repeat", backgroundSize: "contain" }}>
            </div>
            <div className="car-info-container col-md-8">
              <div className="car-main-info-container ">
                <div className="row col">
                  <div className="first-tile ml-2">
                    <div className="car-name">
                      <h3>{this.props.brand} {this.props.model}</h3>
                    </div>
                    <div className="car-rank text-left">
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </div>
                  </div>
                  <div className="second-tile ml-auto">
                    <div className="car-price">
                      <h3 className="ml-auto">${this.props.dailyFee}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="car-description text-left">
                <p>{this.props.description}</p>
              </div>
              <div className="properties button-container col-md-3 ml-auto">
								<button type="button" className="btn btn-info"><Link to={"/CarRental/cardetails/"+this.props.id}>Properties</Link></button>
              </div>
            </div>
          </div>
        </div>
      </div>
		)
	}

}
