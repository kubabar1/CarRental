import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css'
import { Link } from 'react-router-dom'

export class Pagination extends React.Component {

	constructor() {
		super();

		this.state = {
			activePage:1,
			itemsCount:null,
			itemsCountOnSinglePage:null,
			pagesCount:null,
			interval:0
		};
	}

	componentDidMount(){
		const url = "http://localhost:8080/CarRental/carlist/vehiclescount";
		fetch(url)
		.then(response=>{
			response.json().then(json=>{
				this.setState({itemsCount:json});

				const page =this.props.page;

				if(typeof(page) === 'undefined' || page==null){
					this.setState({activePage:1});
				}else{
					this.setState({activePage:page});
				}

				this.setState({itemsCountOnSinglePage:this.props.itemsCountOnSinglePage});

				const itemsPerPage = Number(this.props.itemsCountOnSinglePage);

				const pagesnb=Math.ceil((Number(json))/(itemsPerPage));

				console.log(pagesnb);

				this.setState({pagesCount:pagesnb});
			});
		});
	};

	scrollStep = () => {
		if(window.pageYOffset === 0){
			clearInterval(this.state.interval);
		}
		window.scroll(0,window.pageYOffset - 50);
	}

	scrollTop = () => {
		var interval = setInterval(this.scrollStep, 10);
		this.setState({ interval: interval });
	}

	updateVehicleList = (pageNumber) => {
		this.setState({activePage:pageNumber});


		console.log(pageNumber);

		this.scrollTop();

		const url = "http://localhost:8080/CarRental/carlist?page="+pageNumber;
		fetch(url)
		.then(response=>{
			response.json().then(json=>{
				this.props.setVehicleList(json);
			});
		});
	}



	create_items = () => {
		const objs = [];

		for(var i=1; i <= this.state.pagesCount; i++){
			objs.push(<li key={"page_"+i} name={"page_"+i} id={"page_"+i} className="page-item"><Link onClick={this.updateVehicleList.bind(this,i)} to={"/CarRental/listcar?page="+i}  className="page-link">{i}</Link></li>);
		}

		return objs;
	}




	render () {
		const activePage=this.state.activePage;
		const pagesCount=this.state.pagesCount;
		var previous;
		var next;

		if(activePage-1<1){
			previous=1;
		}else{
			previous=activePage-1;
		}

		if(activePage+1>pagesCount){
			next=pagesCount;
		}else{
			next=activePage+1;
		}

		return (
      <div className="text-center my-5">
        <ul className="pagination text-center">
          <li key={"page_first"} name={"page_first"} id={"page_first"} className="page-item"><Link onClick={()=>this.updateVehicleList(1)} className="page-link" to="/CarRental/listcar?page=1" >First</Link></li>
          <li key={"page_previous"} name={"page_previous"} id={"page_previous"} className="page-item"><Link onClick={()=>this.updateVehicleList(previous)} to={"/CarRental/listcar?page="+previous} className="page-link">Previous</Link></li>
          {this.create_items()}
          <li key={"page_next"} name={"page_next"} id={"page_next"} className="page-item"><Link onClick={()=>this.updateVehicleList(next)} to={"/CarRental/listcar?page="+next} className="page-link">Next</Link></li>
	        <li key={"page_last"} name={"page_last"} id={"page_last"} className="page-item"><Link onClick={()=>this.updateVehicleList(pagesCount)} to={"/CarRental/listcar?page="+pagesCount} className="page-link">Last</Link></li>
        </ul>
      </div>
		)
	}

}
