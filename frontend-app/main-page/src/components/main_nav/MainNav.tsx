import React from 'react';
import { Link } from 'react-router-dom';
import './MainNav.scss';
import { homeLink } from '../../constants/Links';
import { Navbar } from './navbar/Navbar';

interface MainNavState {
    active: boolean;
}

export class MainNav extends React.Component<Record<string, never>, MainNavState> {
    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            active: false,
        };
    }

    toggleClass = (): void => {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    setTrue = (): void => {
        this.setState({ active: true });
    };

    render(): JSX.Element {
        return (
            <nav id="main-nav" className="navbar navbar-expand-lg navbar-light sticky-top">
                <Link to={homeLink} className="navbar-brand pl-5 linkstyle">
                    <img id="main-nav-logo-img" src={require('../../images/car_logo.png')} alt="Logo" />
                </Link>
                <button className="navbar-toggler" type="button" onClick={this.toggleClass}>
                    <span className="navbar-toggler-icon" />
                </button>
                <Navbar active={this.state.active} setTrue={this.setTrue} />
            </nav>
        );
    }
}
