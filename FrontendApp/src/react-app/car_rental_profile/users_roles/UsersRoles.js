import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import {HeaderContainer} from '../tools/HeaderContainer.js';
import {ResultNumberSelection} from '../tools/ResultNumberSelection.js';
import UserTable from './UserTable.js';
import {Pageable} from "../tools/Pageable.js"
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

export class UsersRoles extends React.Component {

  constructor() {
    super();
    this.state = {
      userlist:null,
      resultNumber:5,
      pageNumber:0,
      totalPages:null,
      totalElements:null,
      loaded:false
    };
  }

	componentDidMount(){
		this.setVehicleList(this.state.pageNumber, this.state.resultNumber);
  }

  setResultNumber = (number) => {
    this.setState({resultNumber:number});
    this.setVehicleList(this.state.pageNumber,number);
  }

  setPageNumber = (page) => {
    this.setState({pageNumber:page});
    this.setVehicleList(page, this.state.resultNumber);
  }

  setVehicleList = (page,number) => {
    fetch("http://localhost:8080/CarRental/userlist?page="+page+"&number="+number)
		.then(response=>{
			response.json().then(json=>{
				this.setState({
          userlist:json.content,
				  totalPages:json.totalPages,
				  totalElements:json.totalElements,
          loaded:true
			  });
		  });
    });
  }

	render () {
    const loaded = this.state.loaded;
    const userlist = this.state.userlist;

		return (
      <div className="col-md-9 pl-0 pr-3">
        <div className="card">
          <HeaderContainer title={"Users list"}/>
          <div className="card-body text-center">
            <div className="row">
              <ResultNumberSelection setResultNumber={this.setResultNumber}/>


            </div>
            <hr className="mb-3"></hr>
            {userlist ? <UserTable userList={userlist}/> : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
            {loaded ? <Pageable setPageNumber={this.setPageNumber} activePageNumber={this.state.pageNumber} totalPages={this.state.totalPages}/> : ""}
          </div>
        </div>
      </div>
		)
	}

}
