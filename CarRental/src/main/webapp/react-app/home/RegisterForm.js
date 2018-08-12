import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/home.css';



export class RegisterForm extends React.Component {

	render () {

		return (
      <div>
        <div id="car-rent-form-container" className="container col-xl-3 col-lg-4 col-md-5 col-sm-7 card card-body shadow mr-3">
            <form action="/CarRental/reservation_data.html">
              <h3>Zarezerwuj pojazd:</h3>
              <div className="form-group">
                <label>Miasto:</label>
                <select className="form-control">
                    <option value=""></option>
                    <option value="warszawa">Warszawa</option>
                    <option value="wroclaw">Wrocław</option>
                    <option value="gdansk">Gdańsk</option>
                    <option value="krakow">Kraków</option>
                </select>
              </div>
              <div className="form-group">
                <label >Data i godzina odbioru:</label>
                <div className="input-group">
                  <input type="date" id="return-date" name="return-date" max="3000-12-31" min="1000-01-01" className="form-control"/>
                  <input type="time" id="return-hour" name="return-hour" max="3000-12-31" min="1000-01-01" className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                <label >Data i godzina zwrotu:</label>
                <div className="input-group">
                  <input type="date" id="return-date" name="return-date" max="3000-12-31" min="1000-01-01" className="form-control"/>
                  <input type="time" id="return-hour" name="return-hour" max="3000-12-31" min="1000-01-01" className="form-control"/>
                </div>
              </div>
              <input type="submit" value="Zarezerwuj" className="btn btn-primary"/>
            </form>
          </div>
      </div>
		)
	}

}
