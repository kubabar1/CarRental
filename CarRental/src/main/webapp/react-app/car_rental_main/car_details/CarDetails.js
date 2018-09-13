import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import '../../../static/css/car_details.css';
import {PageLocation} from './PageLocation.js';
import {CarDetailsHeader} from './CarDetailsHeader.js';
import ReserveButton from './ReserveButton.js';
import {CarProperties} from './CarProperties.js';
import {CarFeatures} from './CarFeatures.js';
import {CarState} from './CarState.js';
import {AddComment} from './AddComment.js';
import {CommentList} from './CommentList.js';


export class CarDetails extends React.Component {

	constructor() {
		super();

		this.state = {
			vehicleProperties:null,
			isAuthenticated:false,
			currentuser:null,
			comments:null,
			commentsPage:0,
			commentsNumber:10,
			loaded:false,
			allPages:null
		};
	}

	loadCommentsForPage = (page) => {


		const url = "http://localhost:8080/CarRental/comments/"+this.props.match.params.car_id+"?page="+page+"&number="+this.state.commentsNumber;

		console.log(url);

		fetch(url)
		.then(response => response.json())
		.then(data => {
				this.setState({
					loaded:true,
					comments:data.content,
					allPages:data.totalPages
				});
			console.log("refresh");
			console.log(data.content);
		})
	}


	componentWillReceiveProps(){
		this.loadCommentsForPage(0);
	}

	componentDidMount(){
		const url1="http://localhost:8080/CarRental/carlist/"+this.props.match.params.car_id;
		fetch(url1)
		.then(response=>{
			response.json().then(json=>{
				this.setState({vehicleProperties:json});
			});
		});

		const url2="http://localhost:8080/CarRental/userdata/isauthenticated";
		fetch(url2)
		.then(response=>{
			response.json().then(json=>{
				this.setState({isAuthenticated:json.isAuthenticated});
			});
		});

		const url3="http://localhost:8080/CarRental/userdata/all";
		fetch(url3)
		.then(response => response.json())
		.then(json => {this.setState({
				currentuser:json
			})
			console.log(json);
		})
		.catch(error => {});

		this.loadCommentsForPage(0);
	};

 	renderContent = (vehicleProperties, comments) => {
		const isAuthenticated = this.state.isAuthenticated;
		const currentuser = this.state.currentuser;

		console.log(currentuser);

		console.log(comments);

		return(
		<div>
	 		<CarDetailsHeader vehicleProperties={vehicleProperties}/>

	 		<hr className="mt-5"></hr>

			<CarState carprops={vehicleProperties}/>

	 		<hr className="mt-5"></hr>

	 		<CarProperties carprops={vehicleProperties}/>

	 		<hr className="my-3"></hr>

	 		<CarFeatures carprops={vehicleProperties}/>

	 		<hr className="my-3"></hr>

			<ReserveButton vehicleProperties={vehicleProperties}/>

	 		<hr className="my-3"></hr>

			<div className="text-left">
	 			<h3 className="mt-2 ml-3 mb-4">Comments</h3>
			</div>

	 		{isAuthenticated && currentuser ? <AddComment loadCommentsForPage={this.loadCommentsForPage} login={currentuser.login} carid={this.props.match.params.car_id}/> : ""}

	 		{comments ? <CommentList comments={comments} carid={this.props.match.params.car_id} currentuser={this.state.currentuser}/> : ""}
 		</div>);
	}

	changePage = () => {
		const page = this.state.commentsPage;
		const newPage = page+1;
		const allPages = this.state.allPages;

		console.log(newPage);
		if(newPage<allPages){
			this.loadCommentsForPage(newPage);
			this.setState({commentsPage:newPage});
		}
	}



	render () {

		const vehicleProperties = this.state.vehicleProperties;
		const comments = this.state.comments;

		return (
			<div>
				<PageLocation/>

				<div className="container col-md-8 offset-md-2 mt-4">

					<div className="text-center">

						{vehicleProperties ? this.renderContent(vehicleProperties, comments) : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}

						<button type="button" className="btn btn-primary my-5" onClick={this.changePage}>Older comments</button>
					</div>

				</div>

			</div>
		)
	}

}
