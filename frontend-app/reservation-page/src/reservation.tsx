import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './reservation.scss';
import 'bootstrap/scss/bootstrap.scss';
import {ReservationStepContainer} from "./ReservationStepContainer/ReservationStepContainer";

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Route path="/" component={ReservationStepContainer} />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
