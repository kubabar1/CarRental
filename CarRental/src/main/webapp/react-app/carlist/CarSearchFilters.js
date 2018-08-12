import * as React from "react";
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../static/css/main.css';
import '../../static/css/car_list.css';


export class CarSearchFilters extends React.Component {
	render () {
		return (
			<div className="card shadow">
				<div id="search-filter-container" className="card-body">
					<form>
						<div className="form-group">
							<label >Marka:</label>
							<select className="form-control">
								<option value=""></option>
								<option value="volvo">Volvo</option>
								<option value="saab">Saab</option>
								<option value="mercedes">Mercedes</option>
								<option value="audi">Audi</option>
							</select>
						</div>
						<div className="form-group">
							<label>Model:</label>
							<select className="form-control">
								<option value=""></option>
								<option value="c3">C3</option>
								<option value="slrmclaren">SLR McLaren</option>
								<option value="ibiza">Ibiza</option>
								<option value="r8">R8</option>
							</select>
						</div>
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
							<label>Typ nadwozia:</label>
							<select className="form-control">
								<option value=""></option>
								<option value="sedan">Sedan</option>
								<option value="suv">SUV</option>
								<option value="kombi">Kombi</option>
								<option value="kabriolet">kabriolet</option>
							</select>
						</div>
						<div className="form-group">
							<label>Cena:</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">od</span>
								</div>
								<input type="text" className="form-control"/>
									<div className="input-group-prepend">
										<span className="input-group-text">do</span>
									</div>
								<input type="text" className="form-control"/>
							</div>
						</div>
						<div className="form-group">
							<label>Liczba miejsc:</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">od</span>
								</div>
								<input type="text" className="form-control"/>
									<div className="input-group-prepend">
										<span className="input-group-text">do</span>
									</div>
								<input type="text" className="form-control"/>
							</div>
						</div>
						<div className="form-group">
							<label>Liczba drzwi:</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">od</span>
								</div>
								<input type="text" className="form-control"/>
									<div className="input-group-prepend">
										<span className="input-group-text">do</span>
									</div>
								<input type="text" className="form-control"/>
							</div>
						</div>
						<div className="form-group">
							<label>Rok produkcji:</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text">od</span>
								</div>
								<input type="text" className="form-control"/>
									<div className="input-group-prepend">
										<span className="input-group-text">do</span>
									</div>
								<input type="text" className="form-control"/>
							</div>
						</div>
						<div className="form-group">
							<label>Kolor:</label>
							<select className="form-control">
								<option value=""></option>
								<option value="red">Czerwony</option>
								<option value="black">Czarny</option>
								<option value="silver">Srebrny</option>
								<option value="white">Biały</option>
							</select>
						</div>
						<input type="submit" value="Szukaj" className="btn btn-primary"/>
					</form>
				</div>
			</div>
		)
	}

}
