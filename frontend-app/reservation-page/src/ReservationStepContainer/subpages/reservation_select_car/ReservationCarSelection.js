import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../../main/static/css/main.css';
import '../../../../main/static/css/reservation_data.css';
import '../../../../main/static/css/reservation_car_selection.css';
import {Logo} from '../StepsSubpages.ReservationStepContainer.components.Logo.tsx';
import {ReservationStepContainer} from '../StepsSubpages.ReservationStepContainer.tsx';
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
        <ReservationStepContainer step={2}/>
        <CarSelectionForm/>
      </main>
		)
	}

}
