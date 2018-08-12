import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_details.css';
import {PageLocation} from './PageLocation.js';
import {CarDetailsHeader} from './CarDetailsHeader.js';
import {ReserveButton} from './ReserveButton.js';
import {CarProperties} from './CarProperties.js';
import {CarFeatures} from './CarFeatures.js';
import {CarState} from './CarState.js';
import {AddComment} from './AddComment.js';
import {CommentList} from './CommentList.js';


export class CarDetails extends React.Component {

	constructor() {
		super();

		this.state = {
			vehicleProperties:null
		};
	}

	componentDidMount(){
		fetch("http://localhost:8080/CarRental/carlist/"+this.props.match.params.car_id)
		.then(response=>{
			response.json().then(json=>{
				this.setState({vehicleProperties:json});
			});
	});
	};

 	renderContent = (vehicleProperties) => {
		return(
		<div>
	 		<CarDetailsHeader vehicleProperties={vehicleProperties}/>

	 		<hr className="mt-5"></hr>

	 		<ReserveButton/>

	 		<hr className="mt-5"></hr>

	 		<CarProperties carprops={vehicleProperties}/>

	 		<hr className="my-3"></hr>

	 		<CarFeatures carprops={vehicleProperties}/>

	 		<hr className="my-3"></hr>

	 		<CarState carprops={vehicleProperties}/>

	 		<hr className="my-3"></hr>

			<div className="text-left">
	 			<h3 className="mt-2 ml-3 mb-4">Comments</h3>
			</div>

	 		<AddComment/>

	 		<CommentList/>
 		</div>);
	}


	render () {

		const vehicleProperties = this.state.vehicleProperties;

		return (
			<div>
				<PageLocation/>

				<div className="container col-md-8 offset-md-2 mt-4">

					<div className="text-center">

						{vehicleProperties ? this.renderContent(vehicleProperties) : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}

					</div>

				</div>

			</div>
		)
	}

}
