import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom'

export class AsideNav extends React.Component {
	render () {
		return (
      <nav className="navbar navbar-expand navbar-dark bg-dark" style={{height:30}}>
        <a className="navbar-brand pl-2" href="#">
          <img src={require('../static/img/pl_lang.png')}  style={{width:20}}/>
        </a>
        <a className="navbar-brand pl-1" href="#">
          <img src={require('../static/img/eng_lang.png')}  style={{width:20}}/>
        </a>
        <a className="navbar-brand pl-1" href="#">
          <img src={require('../static/img/ru_lang.png')}  style={{width:20}}/>
        </a>

        <ul className="navbar-nav pr-3 ml-auto">
          <li className="nav-item p-2 ">
						<Link to={"/CarRental/login"} className="linkstyle nav-link"><small>Log in</small></Link>
          </li>
          <li className="nav-item p-2 ">
						<Link to={"/CarRental/register"} className="linkstyle nav-link"><small>Sign up</small></Link>
          </li>
        </ul>
      </nav>
		)
	}

}
