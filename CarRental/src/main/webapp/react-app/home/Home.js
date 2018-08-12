import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/home.css';
import {RegisterFormContainer} from './RegisterFormContainer.js';
import {RoundedImg} from './RoundedImg.js';
import {Carousele} from './Carousele.js';


export class Home extends React.Component {

	render () {
		return (
      <div>
        <RegisterFormContainer/>
        <RoundedImg/>
      </div>
		)
	}

}
