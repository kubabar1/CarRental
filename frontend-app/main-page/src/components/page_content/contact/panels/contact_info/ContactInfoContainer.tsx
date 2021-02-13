import React from 'react';
import { ContactData } from './components/contact_data/ContactData';
import { SendMessage } from './components/send_message/SendMessage';

export function ContactInfoContainer() {
    return (
        <div id="contacts-info-container" className="container mb-5 mt-4">
            <div className="row">
                <ContactData />
                <SendMessage />
            </div>
        </div>
    );
}
