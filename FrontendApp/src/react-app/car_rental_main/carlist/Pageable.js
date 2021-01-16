import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css'
import { Link } from 'react-router-dom'

export class Pageable extends React.Component {

	constructor() {
		super();

		this.state = {
			totalPages:null,
			activePageNumber:0,
			loaded:false
		};
	}

	componentDidMount(){
  	this.setState({activePageNumber:this.props.activePageNumber});
	  this.setState({totalPages:this.props.totalPages});
		this.setState({loaded:true});
	};

  changePage = (page) => {
  	this.setState({activePageNumber:page});
    this.props.setPageNumber(page);
  }

	create_items = () => {
		const objs = [];
		const totalPages = this.props.totalPages;
		const activePage = this.state.activePageNumber;
		var start = 0;
		var max = totalPages>5 ? 5 : totalPages;


		if( totalPages>5 && activePage>2){
			start=(activePage)<(totalPages-3)?(activePage-2):(totalPages-5);
			max=start+5;
		}

		for(var i = start; i < max; i++){
			objs.push(<li key={"page_"+i} name={"page_"+i} id={"page_"+i} className={activePage==i ? "page-item active" : "page-item"} onClick={this.changePage.bind(this,i)}><p className="page-link">{(i+1)}</p></li>);
		}

		return objs;
	}

	renderContent = () => {
		const activePageNumber=this.state.activePageNumber;
		const totalPages=this.props.totalPages;
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


		return(
			<div className="text-center my-5 d-flex">
				<ul className="pagination text-center mx-auto">
					<li key={"page_first"} name={"page_first"} id={"page_first"} className="page-item" onClick={()=>this.changePage(0)}><p className="page-link">First</p></li>
					<li key={"page_previous"} name={"page_previous"} id={"page_previous"} className="page-item" onClick={()=>this.changePage(previous)}><p className="page-link">Previous</p></li>
					{this.create_items()}
					<li key={"page_next"} name={"page_next"} id={"page_next"} className="page-item" onClick={()=>this.changePage(next)}><p className="page-link">Next</p></li>
					<li key={"page_last"} name={"page_last"} id={"page_last"} className="page-item" onClick={()=>this.changePage(totalPages-1)}><p className="page-link">Last</p></li>
				</ul>
			</div>
		);
	}


	render () {
		const loaded = this.state.loaded;
		return (
			<div>
				{loaded ? this.renderContent() : <div></div>}
			</div>
		)
	}

}
