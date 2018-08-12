import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_details.css';

export class CarFeatures extends React.Component {

	create_left_column = () => {
		const vehicleEquipment=this.props.carprops.equipmentList;

		const listSize=vehicleEquipment.length;

		const half=Math.ceil(vehicleEquipment.length/2);

		const objs = [];

		for(var i=0; i < half ; i++){
			objs.push(<li key={vehicleEquipment[i].description}><i className="far fa-plus-square ml-4 mr-2 my-2"></i>{vehicleEquipment[i].description}</li>);
		}

		return objs;

	}

	create_right_column = () => {
		const vehicleEquipment=this.props.carprops.equipmentList;

		const listSize=vehicleEquipment.length;

		const half=Math.ceil(vehicleEquipment.length/2);

		const objs = [];

		for(var i=half ; i < listSize ; i++){
			objs.push(<li key={vehicleEquipment[i].description}><i className="far fa-plus-square ml-4 mr-2 my-2"></i>{vehicleEquipment[i].description}</li>);
		}

		return objs;

	}



	render () {


		const vehicleEquipment=this.props.carprops.equipmentList;

		const listSize=vehicleEquipment.length;

		const half=Math.ceil(vehicleEquipment.length/2);

		return (
      <section>
				<div className="text-left">
        	<h3 className="mt-2 ml-3 mb-4">Features</h3>
				</div>

        <div id="features-list" className="row">
          <div className="col-md-6 text-left">
						<ul>
            	{this.create_left_column()}
						</ul>
          </div>
          <div className="col-md-6 text-left">
						<ul>
							{this.create_right_column()}
						</ul>
          </div>
        </div>
      </section>
		)
	}
}
