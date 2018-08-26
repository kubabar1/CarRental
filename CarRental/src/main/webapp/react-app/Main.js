import React from 'react';
import ReactDOM from 'react-dom';
import {  Switch, Route } from 'react-router-dom'
import {CarList} from './carlist/CarList.js';
import {Home} from './home/Home.js';
import {BestOffers} from './best_offers/BestOffers.js';
import {AboutUs} from './about_us/AboutUs.js';
import {Contact} from './contact/Contact.js';
import {CarDetails} from './car_details/CarDetails.js';
import {SearchResult} from './carlist/search_results/SearchResult.js';

export class Main extends React.Component {
	render () {
		return (
      <main>
        <Switch>
					<Route exact path="/CarRental/" component={Home} />
					<Route path="/CarRental/listcar" component={CarList} />
					<Route path="/CarRental/listcar?page=:page" component={CarList} />
					<Route path="/CarRental/listcar/searchresult" component={SearchResult} />
					<Route path="/CarRental/bestoffers" component={BestOffers} />
					<Route path="/CarRental/blog" component={CarList} />
					<Route path="/CarRental/aboutus" component={AboutUs} />
					<Route path="/CarRental/contact" component={Contact} />
					<Route path="/CarRental/cardetails/:car_id" component={CarDetails} />
        </Switch>
      </main>
		)
	}
}
