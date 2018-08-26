import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/best_offers.css';
import {PageLocation} from './PageLocation.js';
import {ItemContainer} from './ItemContainer.js';


export class BestOffers extends React.Component {

	constructor() {
		super();

		this.state = {
			bestoffer:null
		};
	}

	componentDidMount(){
		fetch("http://localhost:8080/CarRental/bestoffer")
		.then(response=>{
			response.json().then(json=>{
				this.setState({bestoffer:json});
			});
	});
	};


	render () {

    const bestoffer=this.state.bestoffer;

		return (
      <div>
        <PageLocation/>
        <div id="best-offers-car-container" className="container text-center">
        	{bestoffer ? <ItemContainer bestoffer={bestoffer}/> : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
        </div>
      </div>
		)
	}

}
