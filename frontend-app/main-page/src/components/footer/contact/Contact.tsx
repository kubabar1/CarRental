import React from 'react';
import './Contact.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobile, faPhone } from '@fortawesome/free-solid-svg-icons';

export function Contact(): JSX.Element {
    return (
        <div id="footer-contacts" className="col-lg-4 col-md-12 mt-3">
            <h5 className="link-style-black">Contact us:</h5>
            <div className="contacts-container">
                <FontAwesomeIcon className="link-style-black font-awesome-additional-styles" icon={faPhone} />
                <p className="link-style-black contact-text">123 456 789</p>
            </div>
            <div className="contacts-container">
                <FontAwesomeIcon className="link-style-black font-awesome-additional-styles" icon={faMobile} />
                <p className="link-style-black contact-text">123 456 789</p>
            </div>
            <div className="contacts-container">
                <FontAwesomeIcon className="link-style-black font-awesome-additional-styles" icon={faEnvelope} />
                <a className="contact-text" href="mailto:car.rental@test.com">
                    car.rental@test.com
                </a>
            </div>
        </div>
    );
}
