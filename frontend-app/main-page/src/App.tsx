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
import CarListPage from './components/page_content/vehicle_list/VehicleListPage';
import CarDetailsPage from './components/page_content/vehicle_details/VehicleDetailsPage';
import BestOffersPage from './components/page_content/best_offers/BestOffersPage';
import { UserResponseDTO } from '../../profile-page/src/model/UserResponseDTO';
import { getAuthorizedUserData } from '../../profile-page/src/service/UserService';

export function App(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentUser, setCurrentUserData] = useState<UserResponseDTO | undefined>(undefined);
    // TODO: remove!!!
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [localisations, setLocalisations] = useState<LocalisationResponseDTO[]>([]);

    useEffect(() => {
        getAuthorizedUserData().then((authorizedUser: UserResponseDTO) => setCurrentUserData(authorizedUser));
    }, []);

    const renderHomePage = (): JSX.Element => {
        return <HomePage isAuthenticated={isAuthenticated} localisations={localisations} />;
    };

    const renderCarListPage = (): JSX.Element => {
        return <CarListPage localisations={localisations} />;
    };

    const renderBestOffersPage = (): JSX.Element => {
        return <BestOffersPage localisations={localisations} />;
    };

    const renderCarDetailsPage = (): JSX.Element => {
        return <CarDetailsPage isAuthenticated={isAuthenticated} currentUser={currentUser} />;
    };

    return (
        <main>
            <AsideNav isAuthenticated={isAuthenticated} />
            <MainNav />
            <Switch>
                <Route exact path={homeLink} component={renderHomePage} />
                <Route path={carListLink} component={renderCarListPage} />
                <Route path={carListPageableLink} component={renderCarListPage} />
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
