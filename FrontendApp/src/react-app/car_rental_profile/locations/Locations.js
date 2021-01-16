import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import {HeaderContainer} from '../tools/HeaderContainer.js';
import {ResultNumberSelection} from '../tools/ResultNumberSelection.js';
import {Pageable} from "../tools/Pageable.js"
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

export class Locations extends React.Component {


    constructor() {
      super();
      this.state = {
        locations:null,
        resultNumber:5,
        pageNumber:0,
        totalPages:null,
        totalElements:null,
        loaded:false
      };
    }

  	componentDidMount(){
  		this.setLocationsList(this.state.pageNumber, this.state.resultNumber);
    }

    setResultNumber = (number) => {
      this.setState({resultNumber:number});
      this.setLocationsList(this.state.pageNumber,number);
    }

    setPageNumber = (page) => {
      this.setState({pageNumber:page});
      this.setLocationsList(page, this.state.resultNumber);
    }

    setLocationsList = (page,number) => {
      const url = "http://localhost:8080/CarRental/locations?page="+page+"&number="+number;

      fetch(url).then(response => response.json())
  		.then(json => {this.setState({
        locations:json.content,
        totalPages:json.totalPages,
        totalElements:json.totalElements,
        loaded:true})
      })
  		.catch(error => {});
    }

    renderRow = (location) => {
      return(
        <tr key={location.id}>
          <td>{location.id}</td>
          <td>{location.country}</td>
          <td>{location.city}</td>
          <td>{location.addres}</td>
          <td>{location.email}</td>
          <td>{location.phone}</td>
        </tr>
      );
    }

    renderAllBookingsTable = (locations) => {

  		return (
        <div className="p-3 table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>countr</th>
                <th>city</th>
                <th>addres</th>
                <th>email</th>
                <th>phone</th>
              </tr>
            </thead>
            <tbody>
              {locations ? locations.map(this.renderRow) : ""}
            </tbody>
          </table>
        </div>
  		)
    }

  	render () {
      const loaded = this.state.loaded;
      const locations = this.state.locations;

  		return (
        <div className="col-md-9 pl-0 pr-3">
          <div className="card">
            <HeaderContainer title={"All locations"}/>
            <div className="card-body text-center">
              <div className="row">
                <ResultNumberSelection setResultNumber={this.setResultNumber}/>
              </div>
              <hr className="mb-3"></hr>
              {locations ? this.renderAllBookingsTable(locations) : <i className="fa fa-spinner fa-pulse fa-3x fa-fw "></i>}
              {loaded ? <Pageable setPageNumber={this.setPageNumber} activePageNumber={this.state.pageNumber} totalPages={this.state.totalPages}/> : ""}
            </div>
          </div>
        </div>
  		)
  	}

}
