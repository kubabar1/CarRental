import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../../main/static/css/main.css';
import '../../../../main/static/css/reservation_data.css';
import {Logo} from '../Logo.js';
import {ReservationStep} from '../ReservationStep.js';
import DataForm from './DataForm.js';
import { Link } from 'react-router-dom'


export class ReservationData extends React.Component {

	constructor() {
    super();
    this.state = {
      step:1
    };
  }

	render () {

		return (
      <main>
        <Logo/>
        <ReservationStep step={1}/>
        <DataForm
						selected_city={(this.props.location.state && this.props.location.state.selected_city) ? this.props.location.state.selected_city : ""}
						reception_date={(this.props.location.state && this.props.location.state.reception_date) ? this.props.location.state.reception_date : ""}
						reception_hour={(this.props.location.state && this.props.location.state.reception_hour) ? this.props.location.state.reception_hour : ""}
						return_date={(this.props.location.state && this.props.location.state.return_date) ? this.props.location.state.return_date : ""}
						return_hour={(this.props.location.state && this.props.location.state.return_hour) ? this.props.location.state.return_hour : ""}
						selectedCar={(this.props.location.state && this.props.location.state.selectedCar) ? this.props.location.state.selectedCar : ""}
				/>
      </main>
		)
	}

}
