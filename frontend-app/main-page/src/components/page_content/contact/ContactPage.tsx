import React from 'react';
import { Location } from './panels/map/Location';
import { ContactInfoContainer } from './panels/contact_info/ContactInfoContainer';

export function ContactPage(): JSX.Element {
    return (
        <div>
            <Location />
            <ContactInfoContainer />
        </div>
    );
}
