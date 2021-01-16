import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../main/static/css/main.css';
import '../../../main/static/css/best_offers.css';
import {PageLocation} from './PageLocation.js';
import {ItemContainer} from './ItemContainer.js';


export class BestOffers extends React.Component {

	constructor() {
		super();
		this.state = {
			activePageNumber:0
		};
	}

	componentDidMount(){

			var page;
			if(typeof(this.props.match.params.page) === 'undefined' || this.props.match.params.page==null){
				page=0;
			}else{
				page=this.props.match.params.page;
			}

			this.setState({activePageNumber:page});
	}


	render () {
		return (
      <div>
        <PageLocation/>
        <div id="best-offers-car-container" className="container text-center">
        	 <ItemContainer activePageNumber={this.state.activePageNumber}/>
        </div>
      </div>
		)
	}

}
