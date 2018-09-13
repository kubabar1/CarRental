import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import '../../../static/css/car_list.css';
import {CarItem} from './CarItem.js';
import {Pageable} from './Pageable.js';
import CarSearchFilters from './CarSearchFilters.js';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';


class ContentContainer extends React.Component {

	constructor() {
		super();

		this.state = {
			vehicles:null,
			vehiclesCountOnSinglePage:20,
			activePageNumber:0,
			totalPages:null,
			loaded:false,
			filterWrapper:null,
			totalElements:0,
			redirect:false
		};
	}

	componentDidMount(){
		this.setVehicles(0);
	}

	scrollTop = () => {
		var interval = setInterval(this.scrollStep, 10);
		this.setState({ interval: interval });
	}

	scrollStep = () => {
		if(window.pageYOffset === 0){
			clearInterval(this.state.interval);
		}
		window.scroll(0,window.pageYOffset - 50);
	}

	setVehicles = (pageNumber) => {
		this.scrollTop();
	  this.setState({activePageNumber:pageNumber});

		const url = "http://localhost:8080/CarRental/carlist?page="+pageNumber+"&number="+this.state.vehiclesCountOnSinglePage;
		fetch(url)
		.then(response=>{
			response.json().then(json=>{
					this.setState({vehicles:json.content});
					this.setState({totalPages:json.totalPages});
					this.setState({totalElements:json.totalElements});
					this.setState({loaded:true});
			});
		});
	}



	setPageNumber = (page) => {
    this.setState({activePageNumber:page});
    this.setVehicles(page);
  }

	renderCarList = () => {
		const vehicles=this.state.vehicles;
		const totalPages=this.state.totalPages;
		const activePageNumber=this.state.activePageNumber;

		return(
			<div>
				{vehicles.map(this.vehiclesToTableRow)}
				{totalPages > 0 ? <Pageable setPageNumber={this.setPageNumber} activePageNumber={this.state.pageNumber} totalPages={this.state.totalPages}/> : <div></div>}
			</div>
		);
	}

	vehiclesToTableRow = vehicles=>{
			const id = vehicles.id;
			const brand = vehicles.brand;
			const model = vehicles.model;
			const dailyFee = vehicles.dailyFee;
			const description = vehicles.vehicleParameters.description;
			const photoName = vehicles.vehicleParameters.photoName;
			const starsNumber = vehicles.stars ? vehicles.stars.starsAvgCount : null;

			return <CarItem key={id} id={id} name={name} brand={brand} model={model} dailyFee={dailyFee} description={description} photoName={photoName} starsNumber={starsNumber}/>;
	}

	render () {
		const vehicles=this.state.vehicles;
		const totalPages=this.state.totalPages;
		const loaded=this.state.loaded;

		return (
			<div className="row">
				<div className="col-md-3 container  mb-5 mt-3 ">
					<CarSearchFilters/>
				</div>
				<div id="serach-results-container" className="col-md-9 text-center">
					{loaded ? this.renderCarList() : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
				</div>
			</div>
		);

	}

}


export default withRouter(ContentContainer);
