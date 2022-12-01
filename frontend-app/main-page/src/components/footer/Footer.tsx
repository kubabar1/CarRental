import React from 'react';
import { Copyright } from './copyright/Copyright';
import { Socials } from './socials/Socials';
import { Contact } from './contact/Contact';
import { PagesList } from './pages_list/PagesList';
import './Footer.scss';

export function Footer(): JSX.Element {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <PagesList />
                    <Socials />
                    <Contact />
                </div>
            </div>
            <Copyright />
        </footer>
    );
}
