import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import '../../../static/css/car_list.css';
import {CarSearchItem} from './CarSearchItem.js';
import {PaginationCarList} from './PaginationCarList.js';
import {CarSearchFilters} from './CarSearchFilters.js';


export class ContentContainer extends React.Component {

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
		this.setState({activePageNumber:this.props.activePage});

		console.log("contentcontainer mounted");

		const url = "http://localhost:8080/CarRental/carlist?page="+this.state.activePageNumber+"&number="+this.state.vehiclesCountOnSinglePage;
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

	vehiclesToTableRow = vehicles=>{
			const id = vehicles.id;
			const brand = vehicles.brand;
			const model = vehicles.model;
			const dailyFee = vehicles.dailyFee;
			const description = vehicles.vehicleParameters.description;
			const photoName = vehicles.vehicleParameters.photoName;
			const starsNumber = vehicles.stars ? vehicles.stars.starsAvgCount : null;

			return <CarSearchItem key={id} id={id} name={name} brand={brand} model={model} dailyFee={dailyFee} description={description} photoName={photoName} starsNumber={starsNumber}/>;
	}

	setVehicles = (pageNumber) => {
		console.log("call 'setVehicles'");
		this.setState({loaded:false});

		this.scrollTop();

		this.setState({activePageNumber:pageNumber});
		const url = "http://localhost:8080/CarRental/carlist?page="+pageNumber+"&number="+this.state.vehiclesCountOnSinglePage;
		fetch(url)
		.then(response=>{
			response.json().then(json=>{
					this.setState({vehicles:json.content});
					this.setState({totalPages:json.totalPages});
					this.setState({totalElements:json.totalElements});
					console.log(json.totalElements);
					this.setState({loaded:true});
			});
		});
	}

	setFilteredVehicles = (pageNumber,filterWrapper) => {
		console.log("call 'setFilteredVehicles'");
		this.setState({loaded:false});

		this.scrollTop();

		this.setState({activePageNumber:pageNumber});

		console.log(filterWrapper);

		const url = "http://localhost:8080/CarRental/carlistsearch?page="+pageNumber+"&number="+this.state.vehiclesCountOnSinglePage;

		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: filterWrapper
		}).then(response=>{
			response.json().then(json=>{
					this.setState({vehicles:json.content});
					this.setState({totalPages:json.totalPages});
					this.setState({totalElements:json.totalElements});
					console.log(json.totalElements);
					this.setState({loaded:true});
			});
		});
	}

	renderCarList = () => {
		const vehicles=this.state.vehicles;
		const filterWrapper=this.state.filterWrapper;
		const totalElements=this.state.totalElements;


		console.log(totalElements);

		const pagination = filterWrapper ?
			<PaginationCarList setVehicles={this.setFilteredVehicles} activePageNumber={this.state.activePageNumber} totalPages={this.state.totalPages} filterWrapper={filterWrapper}/> :
			<PaginationCarList setVehicles={this.setVehicles} activePageNumber={this.state.activePageNumber} totalPages={this.state.totalPages}/>;

		return(
			<div>
				{vehicles.map(this.vehiclesToTableRow)}
				{totalElements > 0 ? pagination : <div></div>}
			</div>
		);
	}

	setFilterWrapper = (filter) => {
		this.setState({filterWrapper:filter});
		this.setFilteredVehicles(0,filter);
	}

	render () {
		const vehicles=this.state.vehicles;
		const totalPages=this.state.totalPages;
		const loaded=this.state.loaded;

		return (
			<div className="row">
				<div className="col-md-3 container  mb-5 mt-3 ">
					<CarSearchFilters setFilterWrapper={this.setFilterWrapper}/>
				</div>
				<div id="serach-results-container" className="col-md-9 text-center">
					{loaded ? this.renderCarList() : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
				</div>
			</div>
		);

	}

}
