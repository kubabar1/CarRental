import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faMobile, faPhone } from '@fortawesome/free-solid-svg-icons';
import './ContactData.scss';

export function ContactData(): JSX.Element {
    return (
        <div className="container col-md-3">
            <div id="contacts-data" className="card shadow">
                <div className="card-header bg-secondary text-white">
                    <h3>Contact:</h3>
                </div>
                <div className="card-body">
                    <div className="contacts-container">
                        <div className="contacts-container-icon">
                            <FontAwesomeIcon className="link-style-black font-awesome-style" icon={faMapMarkerAlt} />
                        </div>
                        <div className="contacts-container-text">
                            Warszawa 12-345 <br /> ul. Piękna 888
                        </div>
                    </div>
                    <div className="contacts-container">
                        <div className="contacts-container-icon">
                            <FontAwesomeIcon className="link-style-black font-awesome-style" icon={faPhone} />
                        </div>
                        <div className="contacts-container-text">123 456 789</div>
                    </div>
                    <div className="contacts-container">
                        <div className="contacts-container-icon">
                            <FontAwesomeIcon className="link-style-black font-awesome-style" icon={faMobile} />
                        </div>
                        <div className="contacts-container-text">123 456 789</div>
                    </div>
                    <div className="contacts-container">
                        <div className="contacts-container-icon">
                            <FontAwesomeIcon className="link-style-black font-awesome-style" icon={faEnvelope} />
                        </div>
                        <div className="contacts-container-text">car.rental@gmail.com</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
