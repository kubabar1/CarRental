import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_list.css';
import {PageLocation} from './PageLocation.js';
import {CarSearchFilters} from './CarSearchFilters.js';
import {SearchResultContainer} from './SearchResultContainer.js';
import {Pagination} from './Pagination.js';


export class CarList extends React.Component {

	constructor() {
		super();

		this.state = {
			vehicles:null,
			vehiclesCountOnSinglePage:20,
			filterWrapper:null
		};
	}

	componentDidMount(){

		const url = "http://localhost:8080/CarRental/carlist?page=1&number=20";
		fetch(url)
		.then(response=>{
			response.json().then(json=>{
				console.log(json);
				this.setState({vehicles:json.content});
			});
		});

	};

	setFilterWrapper = (filterWrapper) => {
		this.setState({filterWrapper:filterWrapper});

		console.log(filterWrapper);

		this.setVehicleList();
	}

	setVehicleList = () => {
		var page;
		if(typeof(this.props.match.params.page) === 'undefined' || this.props.match.params.page==null){
			page=1;
		}else{
			page=this.props.match.params.page;
		}

		console.log(page);

		const filterWrapper = this.state.filterWrapper;

		console.log(filterWrapper);

		if(filterWrapper==null){
			const url = "http://localhost:8080/CarRental/carlist?page="+page;
			fetch(url)
			.then(response=>{
				response.json().then(json=>{
					this.setState({vehicles:json});
				});
			});
		}else{
			fetch("http://localhost:8080/CarRental/carlist?page="+page, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: filterWrapper
			}).then(response=>{
				response.json().then(json=>{
					this.setState({vehicles:json});
				});
			});
		}
	}

	render () {

		const vehicles = this.state.vehicles;

		return (
      <div>
        <PageLocation/>
        <div id="car-list-content">
          <div className="container">
            <div className="row">

							<div className="col-md-3 container  mb-5 mt-3 ">
              	<CarSearchFilters setFilterWrapper={this.setFilterWrapper}/>
							</div>
							<div id="serach-results-container" className="col-md-9 text-center">
								{vehicles ? <SearchResultContainer vehicles={vehicles}/> : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
								<div className="text-center">
									{vehicles ? <Pagination page={this.props.match.params.page} itemsCountOnSinglePage={this.state.vehiclesCountOnSinglePage} setVehicleList={this.setVehicleList}/> : <div></div>}
								</div>
							</div>
            </div>
          </div>
        </div>
      </div>
		)
	}

}
