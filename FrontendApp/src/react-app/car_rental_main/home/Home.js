import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import '../../../main/static/css/home.css';
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
