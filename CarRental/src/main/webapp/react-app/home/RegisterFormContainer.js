import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/home.css';
import RegisterForm from './RegisterForm.js';

export class RegisterFormContainer extends React.Component {

	render () {
		return (
      <div id="register-panel-image-container" className="container-fluid">
        <RegisterForm/>
      </div>
		)
	}

}
