import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import ReservationStatus from './ReservationStatus/ReservationStatus';
import { reservationStatusSubpage } from './constants/Links';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Route exact path={reservationStatusSubpage} component={ReservationStatus} />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
