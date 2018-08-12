import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_list.css';
import {PageLocation} from './PageLocation.js';
import {CarSearchFilters} from './CarSearchFilters.js';
import {SearchResultContainer} from './SearchResultContainer.js';


export class CarList extends React.Component {

	constructor() {
		super();

		this.state = {
			vehicles:null
		};
	}

	componentDidMount(){
		fetch("http://localhost:8080/CarRental/carlist")
		.then(response=>{
			response.json().then(json=>{
				this.setState({vehicles:json});
			});
	});
	};


	render () {

		const vehicles = this.state.vehicles;

		return (
      <div>
        <PageLocation/>
        <div id="car-list-content">
          <div className="container">
            <div className="row">

							<div className="col-md-3 container  mb-5 mt-3 ">
              	<CarSearchFilters/>
							</div>
							<div id="serach-results-container" className="col-md-9 text-center">
								{vehicles ? <SearchResultContainer vehicles={vehicles}/> : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
							</div>
            </div>
          </div>
        </div>
      </div>
		)
	}

}
