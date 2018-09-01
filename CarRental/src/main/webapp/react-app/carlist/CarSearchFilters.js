import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_list.css';
import {Redirect} from 'react-router';
import {Brand} from './search_item/Brand.js';
import {Model} from './search_item/Model.js';
import {City} from './search_item/City.js';
import {Bodytype} from './search_item/Bodytype.js';
import {Color} from './search_item/Color.js';
import {Price} from './search_item/Price.js';
import {Seatsnumber} from './search_item/Seatsnumber.js';
import {Doorsnumber} from './search_item/Doorsnumber.js';
import {Productionyear} from './search_item/Productionyear.js';
import { Link } from 'react-router-dom'


export class CarSearchFilters extends React.Component {

	constructor() {
     	super();
			this.state = {
				brand:null,
				model:null,
				city:null,
				bodytype:null,
				priceFrom:null,
				priceTo:null,
				placesNumberFrom:null,
				placesNumberTo:null,
				doorsNumberFrom:null,
				doorsNumberTo:null,
				productionYearFrom:null,
				productionYearTo:null,
				color:null,
				filterWrapperObject:null,
				redirect:false
			};
	}

	createFilterWrapperObject = () => {
		var item = {};
		item["brand"] = this.state.brand=="" ? null : this.state.brand;
		item["model"] = this.state.model=="" ? null : this.state.model;
		item["city"] = this.state.city=="" ? null : this.state.city;
		item["bodytype"] = this.state.bodytype=="" ? null : this.state.bodytype;
		item["priceFrom"] = this.state.priceFrom=="" ? null : this.state.priceFrom;
		item["priceTo"] = this.state.priceTo=="" ? null : this.state.priceTo;
		item["placesNumberFrom"] = this.state.placesNumberFrom=="" ? null : this.state.placesNumberFrom;
		item["placesNumberTo"] = this.state.placesNumberTo=="" ? null : this.state.placesNumberTo;
		item["doorsNumberFrom"] = this.state.doorsNumberFrom=="" ? null : this.state.doorsNumberFrom;
		item["doorsNumberTo"] = this.state.doorsNumberTo=="" ? null : this.state.doorsNumberTo;
		item["productionYearFrom"] = this.state.productionYearFrom=="" ? null : this.state.productionYearFrom;
		item["productionYearTo"] = this.state.productionYearTo=="" ? null : this.state.productionYearTo;
		item["color"] = this.state.color=="" ? null : this.state.color;

		return item;
	}

	handleSubmit = (event) => {
			event.preventDefault();
			const item = this.createFilterWrapperObject();
			const data = JSON.stringify(item);
			this.setState({filterWrapperObject:data});
			this.props.setFilterWrapper(data);
	}

	handleBrandInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		const brand = value;

		fetch('http://localhost:8080/CarRental/carlistsearch/modelsforbrand', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(brand),
		}).then(response=>{
			response.json().then(json=>{
				this.setState({modelList:json});
			});
		});

		this.setState({
			[name]: value
		});
	}

	handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		});
	}

	render () {
		return (
			<div className="card shadow">
				<div id="search-filter-container" className="card-body">
					<form onSubmit={this.handleSubmit}>
						<Brand brand={this.state.brand} handleInputChange={this.handleBrandInputChange}/>
						<Model model={this.state.model} handleInputChange={this.handleInputChange} modellist={this.state.modelList}/>
						<City city={this.state.city} handleInputChange={this.handleInputChange}/>
						<Bodytype bodytype={this.state.bodytype} handleInputChange={this.handleInputChange}/>
						<Price priceFrom={this.state.priceFrom} priceTo={this.state.priceTo} handleInputChange={this.handleInputChange}/>
						<Seatsnumber placesNumberFrom={this.state.placesNumberFrom} placesNumberTo={this.state.placesNumberTo} handleInputChange={this.handleInputChange}/>
						<Doorsnumber doorsNumberFrom={this.state.doorsNumberFrom} doorsNumberTo={this.state.doorsNumberTo} handleInputChange={this.handleInputChange}/>
						<Productionyear productionYearFrom={this.state.productionYearFrom} productionYearTo={this.state.productionYearTo} handleInputChange={this.handleInputChange}/>
						<Color color={this.state.color} handleInputChange={this.handleInputChange}/>
						<input type="submit" value="Szukaj" className="btn btn-primary"/>
					</form>
				</div>
			</div>
		)
	}

}
