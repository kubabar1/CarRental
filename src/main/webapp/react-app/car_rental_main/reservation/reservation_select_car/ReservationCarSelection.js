import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../../static/css/main.css';
import '../../../../static/css/reservation_data.css';
import '../../../../static/css/reservation_car_selection.css';
import {Logo} from '../Logo.js';
import {ReservationStep} from '../ReservationStep.js';
import CarSelectionForm from './CarSelectionForm.js';
import { Link } from 'react-router-dom'


export class ReservationCarSelection extends React.Component {

	constructor() {
    super();
    this.state = {
      step:2
    };
  }

	render () {
		return (
      <main>
        <Logo/>
        <ReservationStep step={2}/>
        <CarSelectionForm/>
      </main>
		)
	}

}
