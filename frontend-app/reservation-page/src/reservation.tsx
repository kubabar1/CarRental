import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import { ReservationStepContainer } from './ReservationStepContainer/ReservationStepContainer';
import { reservationRootLink } from './constants/Links';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Route path={reservationRootLink} component={ReservationStepContainer} />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
