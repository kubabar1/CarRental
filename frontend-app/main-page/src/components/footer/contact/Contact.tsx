import React from 'react';
import './Contact.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobile, faPhone } from '@fortawesome/free-solid-svg-icons';

export function Contact(): JSX.Element {
    return (
        <div id="footer-contacts" className="col-lg-4 col-md-12 mt-3">
            <div className="contacts-container">
                <div className="contact-container">
                    <div className="contacts-container-icon">
                        <FontAwesomeIcon className="font-awesome-additional-styles" icon={faPhone} />
                    </div>
                    <div className="contacts-container-text">
                        <p className="contact-text">123 456 789</p>
                    </div>
                </div>
                <div className="contact-container">
                    <div className="contacts-container-icon">
                        <FontAwesomeIcon className="font-awesome-additional-styles" icon={faMobile} />
                    </div>
                    <div className="contacts-container-text">
                        <p className="contact-text">123 456 789</p>
                    </div>
                </div>
                <div className="contact-container">
                    <div className="contacts-container-icon">
                        <FontAwesomeIcon className="font-awesome-additional-styles" icon={faEnvelope} />
                    </div>
                    <div className="contacts-container-text">
                        <a className="contact-text" href="mailto:car.rental@test.com">
                            car.rental@test.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
