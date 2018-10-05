import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import '../../../static/css/car_list.css';
import { Link } from 'react-router-dom'


export class CarItem extends React.Component {

	constructor(){
		super();

		this.state = {
			stars:0,
			loaded:false
		};
	}


	componentDidMount(){
		const url = "http://localhost:8080/CarRental/stars/"+this.props.id;

		fetch(url)
		.then(response => response.json())
		.then(json => {this.setState({
			stars:json,
			loaded:true
			});
		})
		.catch(error => {});
	}


	renderStars = (number) => {
		const objs = [];

		for(var i=0; i < number ; i++){
			objs.push(<span key={"star_"+i} className={"fa fa-star checked"}></span>);
		}

		for(var i=number; i < 5 ; i++){
			objs.push(<span key={"star_"+i} className={"fa fa-star"}></span>);
		}

		return objs;
	}

	render () {
    const image_url = '/CarRental/vehicles-img/'+this.props.photoName;
		const starsNumber = this.state.stars ? Math.floor(this.state.stars) : 0;

		const loaded = this.state.loaded;

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
                      {this.renderStars(starsNumber)}
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
								<Link to={"/CarRental/cardetails/"+this.props.id} className="linkstyle btn btn-info mr-auto ml-3">Properties</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
		)
	}

}
