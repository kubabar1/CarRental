import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import {HeaderContainer} from "../tools/HeaderContainer.js"

export class FeaturesList extends React.Component {

  constructor() {
    super();
    this.state = {
      featuresList:null,
      loaded:false,
      eqp_code:null,
      eqp_description:null
    };
  }

	componentDidMount(){
      this.loadEqpList();
  }

  deleteEquipment = (eqp) => {
    const url="http://localhost:8080/CarRental/equipmentlist/"+eqp;

    fetch(url, {
      method: 'DELETE'
    });
    this.props.history.push({pathname: '/CarRental/profile'});
  }

  loadEqpList = () => {
    fetch("http://localhost:8080/CarRental/equipmentlist")
		.then(response=>{
			response.json().then(json=>{
				this.setState({
				  featuresList:json,
          loaded:true
			  });
		  });
    });
  }

  renderRow = (eqp) => {
    return(
      <tr key={eqp.equipmentCode}>
        <td><button onClick={() => this.deleteEquipment(eqp.equipmentCode)} className={"btn btn-danger"} type="button">Delete</button></td>
        <td>{eqp.equipmentCode}</td>
        <td>{eqp.description}</td>
      </tr>
    );
  }

  renderContent = () => {
    const featuresList = this.state.featuresList;

    return(
      <div className="p-3 table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Delete</th>
              <th>Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {featuresList ? featuresList.map(this.renderRow) : ""}
          </tbody>
        </table>
      </div>
    );
  }

  handleSubmitAddEquipment = (event) => {
    const url="http://localhost:8080/CarRental/equipmentlist";
    const eqp_code=this.state.eqp_code;
    const eqp_description=this.state.eqp_description;

    const equipment = {};
    equipment["equipmentCode"]=eqp_code;
    equipment["description"]=eqp_description;

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(equipment)
    });
    event.preventDefault();
    this.props.history.push({pathname: '/CarRental/profile'});
  }

  handleEqCodeChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;

    this.setState({eqp_code:value});

  }

  handleEqDescChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;

    this.setState({eqp_description:value});

  }

  renderAddForm = () => {
    return(
      <form onSubmit={this.handleSubmitAddEquipment}>
        <label className="ml-5 mt-4 mx-auto">Equipment code:</label>
        <div className="mt-3 ml-3 col-md-5 mx-auto">
          <input name="eqp_code" className="form-control" required onChange={this.handleEqCodeChange} placeholder={"Max 3 chars!"} maxLength={3}/>
        </div>
        <label className="ml-5 mt-4 mx-auto">Equipment description:</label>
        <div className="mt-3 ml-3 col-md-5 mx-auto">
          <input name="eqp_description" type="text" className="form-control" required onChange={this.handleEqDescChange}/>
        </div>
        <div className="mt-3 mx-auto">
          <input type="submit" value="Add" className="btn btn-primary"/>
        </div>
      </form>
    );
  }

	render () {
    const loaded = this.state.loaded;
    const featuresList = this.state.featuresList;

		return (
      <div className="col-md-9 pl-0 pr-3">
        <div className="card">
          <HeaderContainer title={"Equipment list"}/>
          <div className="card-body text-center">
            <hr className="mb-3"></hr>
            {featuresList ? this.renderContent() : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
            {featuresList ? this.renderAddForm() : ""}
          </div>
        </div>
      </div>
		)
	}

}
