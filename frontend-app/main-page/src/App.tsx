import React from 'react';
import {AsideNav} from './components/aside_nav/AsideNav';
import {endpoints} from './constants/PathsAPI';
import {MainNav} from './components/main_nav/MainNav';
import {Footer} from './components/footer/Footer';
import {Route, Switch} from 'react-router';
import {homeLink} from './constants/Links';
import {Home} from './components/page_content/home/Home';
import LocalisationResponseDTO from './model/LocalisationResponseDTO';

interface AppState {
    isAuthenticated: boolean;
    localisations: LocalisationResponseDTO[] | null;
}

export class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isAuthenticated: false,
            localisations: null
        };
    }

    componentDidMount() {
        fetch(endpoints.authenticationEndpoint).then((response: Response) => {
            response.json().then((json) => {
                this.setState({isAuthenticated: json.isAuthenticated});
            });
        });
        fetch(endpoints.localisationsEndpoint).then((response: Response) => {
            response.json().then((localisations: LocalisationResponseDTO[]) => {
                this.setState({localisations: localisations});
            });
        });
    }

    renderHome = () => {
        const {isAuthenticated, localisations} = this.state;
        return (
            <Home
                isAuthenticated={isAuthenticated}
                localisations={localisations}
            />
        );
    }

    render() {
        const {isAuthenticated} = this.state;

        return (
            <main>
                <AsideNav isAuthenticated={isAuthenticated}/>
                <MainNav/>
                <Switch>
                    <Route exact path={homeLink} component={this.renderHome}/>
                </Switch>
                <Footer/>
            </main>
        );
    }
}

// 
//
//     <Route path="/cars" component={CarList} />
//     <Route path="/cars?page=:page" component={CarList} />
//     <Route path="/search-result" component={SearchResults} />
//     <Route path="/search-result?page=:page" component={SearchResults} />
//     <Route path="/best-offers" component={BestOffers} />
//     <Route path="/best-offers?page=:page" component={BestOffers} />
//     <Route path="/about-us" component={AboutUs} />
//     <Route path="/contact" component={Contact} />
//     <Route path="/car-details/:car_id" component={CarDetails} />
// 
