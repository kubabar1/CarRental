import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom'

export class AsideNav extends React.Component {

	constructor() {
    super();
    this.state = {
      isAuthenticated:false
    };
  }

  componentDidMount(){
    const url="http://localhost:8080/CarRental/userdata/isauthenticated";
    fetch(url)
    .then(response=>{
      response.json().then(json=>{
        this.setState({isAuthenticated:json.isAuthenticated});
      });
    });
  };

	render () {
		const isAuthenticated = this.state.isAuthenticated;

		return (
      <nav className="navbar navbar-expand navbar-dark bg-dark" style={{height:30}}>
        <a className="navbar-brand pl-2" href="#">
          <img src={require('../../static/img/pl_lang.png')}  style={{width:20}}/>
        </a>
        <a className="navbar-brand pl-1" href="#">
          <img src={require('../../static/img/eng_lang.png')}  style={{width:20}}/>
        </a>
        <a className="navbar-brand pl-1" href="#">
          <img src={require('../../static/img/ru_lang.png')}  style={{width:20}}/>
        </a>

        <ul className="navbar-nav pr-3 ml-auto">
          <li className="nav-item p-2 ">
						{isAuthenticated ? <a href="/CarRental/profile" className="linkstyle nav-link"><small>Profile</small></a> : <a href="/CarRental/login" className="linkstyle nav-link"><small>Log in</small></a>}
          </li>
          <li className="nav-item p-2 ">
						{isAuthenticated ? <a href="/CarRental/logout" className="linkstyle nav-link"><small>Log out</small></a> : <a href="/CarRental/registration" className="linkstyle nav-link"><small>Sign up</small></a>}
          </li>
        </ul>
      </nav>
		)
	}

}
