import React, { useEffect, useState } from 'react';
import { AsideNav } from './components/aside_nav/AsideNav';
import { MainNav } from './components/main_nav/MainNav';
import { Footer } from './components/footer/Footer';
import { Route, Switch } from 'react-router';
import {
    aboutUsLink,
    bestOffersLink,
    bestOffersPageableLink,
    carDetailsLink,
    carListLink,
    carListPageableLink,
    contactLink,
    homeLink,
} from './constants/Links';
import { HomePage } from './components/page_content/home/HomePage';
import LocalisationResponseDTO from './model/LocalisationResponseDTO';
import { AboutUsPage } from './components/page_content/about_us/AboutUsPage';
import { ContactPage } from './components/page_content/contact/ContactPage';
import VehicleListPage from './components/page_content/vehicle_list/VehicleListPage';
import CarDetailsPage from './components/page_content/vehicle_details/VehicleDetailsPage';
import BestOffersPage from './components/page_content/best_offers/BestOffersPage';
import { getAuthenticatedUserData, logout } from './service/AuthService';
import { AuthenticatedUserDTO } from './model/AuthenticatedUserDTO';

export function App(): JSX.Element {
    const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUserDTO | undefined>(undefined);

    useEffect(() => {
        getAuthenticatedUserData().then((authorizedUser: AuthenticatedUserDTO) => setAuthenticatedUser(authorizedUser));
    }, []);

    const runLogout = (): void => {
        logout().then(() => {
            getAuthenticatedUserData().then((authorizedUser: AuthenticatedUserDTO) =>
                setAuthenticatedUser(authorizedUser)
            );
        });
    };

    const renderHomePage = (): JSX.Element => {
        return <HomePage authenticatedUser={authenticatedUser} />;
    };

    const renderVehicleListPage = (): JSX.Element => {
        return <VehicleListPage />;
    };

    const renderBestOffersPage = (): JSX.Element => {
        return <BestOffersPage />;
    };

    const renderCarDetailsPage = (): JSX.Element => {
        return <CarDetailsPage authenticatedUser={authenticatedUser} />;
    };

    return (
        <main>
            <AsideNav authenticatedUser={authenticatedUser} logout={runLogout} />
            <MainNav />
            <Switch>
                <Route exact path={homeLink} component={renderHomePage} />
                <Route path={carListLink} component={renderVehicleListPage} />
                <Route path={carListPageableLink} component={renderVehicleListPage} />
                <Route path={carDetailsLink} component={renderCarDetailsPage} />
                <Route path={bestOffersPageableLink} component={renderBestOffersPage} />
                <Route path={bestOffersLink} component={renderBestOffersPage} />
                <Route path={aboutUsLink} component={AboutUsPage} />
                <Route path={contactLink} component={ContactPage} />
            </Switch>
            <Footer />
        </main>
    );
}
