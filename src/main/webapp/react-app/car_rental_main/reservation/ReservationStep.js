import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import '../../../static/css/reservation_data.css';


export class ReservationStep extends React.Component {

  constructor() {
    super();
    this.state = {
      step:1,
      loaded:false
    };
  }

  componentDidMount(){
    this.setState({step:this.props.step});
    this.setState({loaded:true});
  };

  renderContent = () => {
    const step = this.state.step;

    return(
      <div className="container my-5">
        <div className="card-deck">
          <div className={step==1 ? "card bg-primary mx-4" : "card mx-4"}>
            <div className="card-body text-center">
              <h3 className={step==1 ? "card-text text-white" : "card-text"}>Data</h3>
            </div>
          </div>
          <div className={step==2 ? "card bg-primary mx-4" : "card mx-4"}>
            <div className="card-body text-center">
              <h3 className={step==2 ? "card-text text-white" : "card-text"}>Select car</h3>
            </div>
          </div>
          <div className={step==3 ? "card bg-primary mx-4" : "card mx-4"}>
            <div className="card-body text-center">
              <h3 className={step==3 ? "card-text text-white" : "card-text"}>Confirm</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

	render () {
    const loaded = this.state.loaded;

		return (
      <div>
        {loaded ? this.renderContent() : <div></div>}
      </div>
		);
	}

}
