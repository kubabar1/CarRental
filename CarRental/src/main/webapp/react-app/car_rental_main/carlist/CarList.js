import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import '../../../static/css/car_list.css';
import {PageLocation} from './PageLocation.js';
import {ContentContainer} from './ContentContainer.js';

export class CarList extends React.Component {

	constructor() {
		super();

		this.state = {
			filterWrapper:null,
			activePage:0,
			loaded:false,
			searchState:false,
			redirect:false
		};
	}

	componentDidMount(){
		var page;
		if(typeof(this.props.match.params.page) === 'undefined' || this.props.match.params.page==null){
			page=0;
		}else{
			page=this.props.match.params.page;
		}

		this.setState({activePage:page});

		this.setState({loaded:true});
	};

	render () {

		const vehicles = this.state.vehicles;

		const loaded = this.state.loaded;

		const redirect = this.state.redirect;

		return (

      <div>
        <PageLocation/>
        <div id="car-list-content">
          <div className="container">
							{loaded ? <ContentContainer activePage={this.state.activePage}/> : <div></div>}
          </div>
        </div>
      </div>
		)
	}

}
