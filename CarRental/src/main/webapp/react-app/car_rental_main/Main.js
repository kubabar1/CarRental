import React from 'react';
import ReactDOM from 'react-dom';
import {  Switch, Route } from 'react-router-dom'
import {CarList} from './carlist/CarList.js';
import {Home} from './home/Home.js';
import {BestOffers} from './best_offers/BestOffers.js';
import {AboutUs} from './about_us/AboutUs.js';
import {Contact} from './contact/Contact.js';
import {CarDetails} from './car_details/CarDetails.js';
import {SearchResults} from './carlist/search_results/SearchResults.js';

export class Main extends React.Component {
	render () {
		return (
      <main>
        <Switch>
					<Route exact path="/CarRental/" component={Home} />
					<Route path="/CarRental/listcar" component={CarList} />
					<Route path="/CarRental/listcar?page=:page" component={CarList} />
					<Route path="/CarRental/searchresult" component={SearchResults} />
					<Route path="/CarRental/searchresult?page=:page" component={SearchResults} />
					<Route path="/CarRental/bestoffers" component={BestOffers} />
					<Route path="/CarRental/bestoffers?page=:page" component={BestOffers} />
					<Route path="/CarRental/aboutus" component={AboutUs} />
					<Route path="/CarRental/contact" component={Contact} />
					<Route path="/CarRental/cardetails/:car_id" component={CarDetails} />
        </Switch>
      </main>
		)
	}
}
