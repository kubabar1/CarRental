import React from 'react';
import {AsideNav} from './components/aside_nav/AsideNav';
import {endpoints} from './constants/PathsAPI';
import {MainNav} from './components/main_nav/MainNav';
import {Footer} from './components/footer/Footer';
import {Route, Switch} from 'react-router';
import {
    aboutUsLink, bestOffersLink, bestOffersPageableLink,
    carDetailsLink,
    carListLink,
    carListPageableLink,
    contactLink,
    homeLink,
} from './constants/Links';
import {HomePage} from './components/page_content/home/HomePage';
import LocalisationResponseDTO from './model/LocalisationResponseDTO';
import {AboutUsPage} from './components/page_content/about_us/AboutUsPage';
import {ContactPage} from './components/page_content/contact/ContactPage';
import CarListPage from './components/page_content/car_list/CarListPage';
import CarDetailsPage from './components/page_content/car_details/CarDetailsPage';
import BestOffersPage from "./components/page_content/best_offers/BestOffersPage";

interface AppState {
    isAuthenticated: boolean;
    localisations: LocalisationResponseDTO[] | null;
}

export class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isAuthenticated: false,
            localisations: null,
        };
    }

    componentDidMount() {
        fetch(endpoints.authenticationEndpoint)
            .then((response: Response) => {
                response.json().then((json) => {
                    this.setState({isAuthenticated: json.isAuthenticated});
                });
            })
            .finally(() => this.setState({isAuthenticated: true})); // TODO: Remove
        fetch(endpoints.localisationsEndpoint).then((response: Response) => {
            response.json().then((localisations: LocalisationResponseDTO[]) => {
                this.setState({localisations: localisations});
            });
        });
    }

    renderHomePage = () => {
        const {isAuthenticated, localisations} = this.state;
        return <HomePage isAuthenticated={isAuthenticated} localisations={localisations}/>;
    };

    renderCarListPage = () => {
        const {localisations} = this.state;
        return <CarListPage localisations={localisations}/>;
    };

    renderBestOffersPage = () => {
        const {localisations} = this.state;
        return <BestOffersPage localisations={localisations}/>;
    };

    renderCarDetailsPage = () => {
        const {isAuthenticated} = this.state;
        return <CarDetailsPage isAuthenticated={isAuthenticated}/>;
    };

    render() {
        const {isAuthenticated} = this.state;

        return (
            <main>
                <AsideNav isAuthenticated={isAuthenticated}/>
                <MainNav/>
                <Switch>
                    <Route exact path={homeLink} component={this.renderHomePage}/>
                    <Route path={carListLink} component={this.renderCarListPage}/>
                    <Route path={carListPageableLink} component={this.renderCarListPage}/>
                    <Route path={carDetailsLink} component={this.renderCarDetailsPage}/>
                    <Route path={bestOffersPageableLink} component={this.renderBestOffersPage}/>
                    <Route path={bestOffersLink} component={this.renderBestOffersPage}/>
                    <Route path={aboutUsLink} component={AboutUsPage}/>
                    <Route path={contactLink} component={ContactPage}/>
                </Switch>
                <Footer/>
            </main>
        );
    }
}
