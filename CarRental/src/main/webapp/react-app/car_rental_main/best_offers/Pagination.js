import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css'
import { Link } from 'react-router-dom'

export class Pagination extends React.Component {

	constructor() {
		super();

		this.state = {
			totalPages:null,
			activePageNumber:null,
			loaded:false
		};
	}

	componentDidMount(){
		this.setState({totalPages:this.props.totalPages});
		this.setState({activePageNumber:this.props.activePageNumber});
		this.setState({loaded:true});
	};

	updateVehicleList = (pageNumber) => {
		console.log(this.props.filterWrapper);
		this.setState({activePageNumber:pageNumber});
		this.props.filterWrapper ? this.props.setVehicles(pageNumber,	this.props.filterWrapper) : this.props.setVehicles(pageNumber);
	}

	create_items = () => {
		const objs = [];
		var totalPages = this.state.totalPages;
		var activePage = this.state.activePageNumber;
		var start = 0;
		var max = totalPages>5 ? 5 : totalPages;

		if( totalPages>5 && activePage>2){
			start=(activePage)<(totalPages-3)?(activePage-2):(totalPages-5);
			max=start+5;
		}

		for(var i = start; i < max; i++){
			objs.push(<li key={"page_"+i} name={"page_"+i} id={"page_"+i} className="page-item"><Link onClick={this.updateVehicleList.bind(this,i)} to={"/CarRental/bestoffers?page="+i}  className="page-link">{(i+1)}</Link></li>);
		}

		return objs;
	}

	renderContent = (previous,next) => {
		const activePageNumber=this.state.activePageNumber;
		const totalPages=this.state.totalPages;
		const loaded = this.state.loaded;

		return(
			<div className="text-center my-5 d-flex">
				<ul className="pagination text-center mx-auto">
					<li key={"page_first"} name={"page_first"} id={"page_first"} className="page-item"><Link onClick={()=>this.updateVehicleList(0)} className="page-link" to="/CarRental/bestoffers?page=0" >First</Link></li>
					<li key={"page_previous"} name={"page_previous"} id={"page_previous"} className="page-item"><Link onClick={()=>this.updateVehicleList(previous)} to={"/CarRental/bestoffers?page="+previous} className="page-link">Previous</Link></li>
					{this.create_items()}
					<li key={"page_next"} name={"page_next"} id={"page_next"} className="page-item"><Link onClick={()=>this.updateVehicleList(next)} to={"/CarRental/bestoffers?page="+next} className="page-link">Next</Link></li>
					<li key={"page_last"} name={"page_last"} id={"page_last"} className="page-item"><Link onClick={()=>this.updateVehicleList(totalPages-1)} to={"/CarRental/bestoffers?page="+(totalPages-1)} className="page-link">Last</Link></li>
				</ul>
			</div>
		);
	}


	render () {
		const activePageNumber=this.state.activePageNumber;
		const totalPages=this.state.totalPages;
		const loaded = this.state.loaded;
		var previous;
		var next;

		if(activePageNumber-1<0){
			previous=0;
		}else{
			previous=activePageNumber-1;
		}

		if(activePageNumber+1>=totalPages){
			next=activePageNumber;
		}else{
			next=activePageNumber+1;
		}

		return (
			<div>
				{loaded ? this.renderContent(previous,next) : <div></div>}
			</div>
		)
	}
}
