import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route} from 'react-router-dom'
import {MainWebsiteContent} from './MainWebsiteContent.js';
import {ReservationData} from './reservation/reservation_data/ReservationData.js';
import {ReservationCarSelection} from './reservation/reservation_select_car/ReservationCarSelection.js';
import {ReservationConfirm} from './reservation/reservation_confirm/ReservationConfirm.js';
import {ReservationSucceed} from './reservation/reservation_succeed/ReservationSucceed.js';
import {SearchResults} from './carlist/search_results/SearchResults.js';

export class Content extends React.Component {
	render () {
		return (
      <main>
        <Switch>
					<Route exact path="/CarRental/" component={MainWebsiteContent} />
					<Route path="/CarRental/listcar" component={MainWebsiteContent} />
					<Route path="/CarRental/listcar?page=:page" component={MainWebsiteContent} />
					<Route path="/CarRental/bestoffers" component={MainWebsiteContent} />
					<Route path="/CarRental/bestoffers?page=:page" component={MainWebsiteContent} />
					<Route path="/CarRental/aboutus" component={MainWebsiteContent} />
					<Route path="/CarRental/contact" component={MainWebsiteContent} />
					<Route path="/CarRental/cardetails/:car_id" component={MainWebsiteContent} />
					<Route path="/CarRental/searchresult" component={MainWebsiteContent} />
					<Route path="/CarRental/searchresult?page=:page" component={MainWebsiteContent} />

					<Route path="/CarRental/reservation/data" component={ReservationData} />
					<Route path="/CarRental/reservation/selectcar" component={ReservationCarSelection} />
					<Route path="/CarRental/reservation/confirm" component={ReservationConfirm} />
					<Route path="/CarRental/reservation/succeed" component={ReservationSucceed} />
        </Switch>
      </main>
		)
	}
}
