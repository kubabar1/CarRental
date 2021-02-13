import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faMobile, faPhone } from '@fortawesome/free-solid-svg-icons';
import './ContactData.scss';

export function ContactData(): JSX.Element {
    return (
        <div className="container col-md-3">
            <div id="contacts-data" className="card shadow">
                <div className="card-header bg-secondary text-white mb-2">
                    <h3>Contact:</h3>
                </div>
                <div className="card-body">
                    <div className="contacts-container">
                        <FontAwesomeIcon className="linkstyle_black font-awesome-style" icon={faMapMarkerAlt} />
                        <p className="contacts-container-text">
                            Warszawa 12-345 <br /> ul. Piękna 888
                        </p>
                    </div>
                    <div className="contacts-container">
                        <FontAwesomeIcon className="linkstyle_black font-awesome-style" icon={faPhone} />
                        <p className="contacts-container-text">123 456 789</p>
                    </div>
                    <div className="contacts-container">
                        <FontAwesomeIcon className="linkstyle_black font-awesome-style" icon={faMobile} />
                        <p className="contacts-container-text">123 456 789</p>
                    </div>
                    <div className="contacts-container">
                        <FontAwesomeIcon className="linkstyle_black font-awesome-style" icon={faEnvelope} />
                        <p className="contacts-container-text">car.rental@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
