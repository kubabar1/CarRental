import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../../static/css/main.css';
import '../../../static/css/contact.css';

export class ContactData extends React.Component {

  render () {
    return (
      <div className="container col-md-3">
        <div id="contacts-data" className="card shadow">
          <div className="card-header bg-secondary text-white mb-2">
            <h3>Contact:</h3>
          </div>
          <div className="card-body">
            <i className="fas fa-map-marker-alt" style={{fontSize:18}}> Warszawa 12-345 <br></br> ul. Piękna 888</i><br></br>
            <i className="fa fa-phone" style={{fontSize:18}}> 123 456 789</i><br></br>
            <i className="fa fa-mobile" style={{fontSize:18}}> 987 654 321</i><br></br>
            <i className="fa fa-envelope" style={{fontSize:18}}>  car.rental@gmail.com</i><br></br>
          </div>
        </div>
      </div>
    )
  }
}
