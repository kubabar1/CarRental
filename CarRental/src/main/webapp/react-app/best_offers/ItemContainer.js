import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/best_offers.css';
import {Item} from './Item.js';
import {Pagination} from './Pagination.js';


export class ItemContainer extends React.Component {

  bestOfferToTableRow = bestoffer=>{
      const id = bestoffer.id;
      const brand = bestoffer.brand;
      const model = bestoffer.model;
      const dailyFee = bestoffer.dailyFee;
      const description = bestoffer.vehicleParameters.description;
      const photoName = bestoffer.vehicleParameters.photoName;

      return <Item key={id} id={id} name={name} brand={brand} model={model} dailyFee={dailyFee} description={description} photoName={photoName}/>;
    }


	render () {
		return (
      <div>
        <div className="row">
  				{this.props.bestoffer.map(this.bestOfferToTableRow)}
        </div>
        <Pagination/>
      </div>
		)
	}
}
