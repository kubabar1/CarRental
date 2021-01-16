import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import '../../../main/static/css/best_offers.css';
import {Item} from './Item.js';
import {Pagination} from './Pagination.js';


export class ItemContainer extends React.Component {


  constructor() {
		super();

		this.state = {
			vehicles:null,
			vehiclesCountOnSinglePage:18,
			activePageNumber:0,
			totalPages:null,
			loaded:false,
			totalElements:0
		};
	}

	componentDidMount(){
		this.setState({activePageNumber:this.props.activePageNumber});
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
		this.setState({loaded:false});

		this.scrollTop();
		this.setState({activePageNumber:pageNumber});

		const url = "http://localhost:8080/CarRental/bestoffer?page="+pageNumber+"&number="+this.state.vehiclesCountOnSinglePage;
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

  bestOfferToTableRow = vehicle=>{
      const id = vehicle.id;
      const brand = vehicle.brand;
      const model = vehicle.model;
      const dailyFee = vehicle.dailyFee;
      const description = vehicle.vehicleParameters.description;
      const photoName = vehicle.vehicleParameters.photoName;

      return <Item key={id} id={id} name={name} brand={brand} model={model} dailyFee={dailyFee} description={description} photoName={photoName}/>;
  }

	render () {
    const vehicles = this.state.vehicles;
    const loaded = this.state.loaded;


		return (
      <div className="text-center" >
        <div className="row text-center">
  				{loaded ? vehicles.map(this.bestOfferToTableRow) : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
        </div>
        <div className="text-center ">
          {loaded ? <Pagination  setVehicles={this.setVehicles} activePageNumber={this.state.activePageNumber} totalPages={this.state.totalPages}/> : <div></div>}
        </div>
      </div>
		)
	}
}
