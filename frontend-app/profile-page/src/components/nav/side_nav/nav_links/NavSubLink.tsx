import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './NavSubLink.scss';

export interface NavSubLinkProperties extends RouteComponentProps {
    navItemName: string;
    link: string;
    authorized?: boolean;
}

function NavSubLink({ navItemName, link, location, authorized = true }: NavSubLinkProperties): JSX.Element {
    const isSelected = link === location.pathname;

    return authorized ? (
        <Link to={link} className="sub-link">
            <div className={`container py-3 sub-link-container ${isSelected ? 'selected-sub-link' : ''}`}>
                <div>
                    <FontAwesomeIcon className="mr-2 ml-3" icon={faAngleRight} />
                </div>
                <div>{navItemName}</div>
            </div>
        </Link>
    ) : (
        <></>
    );
}

export default withRouter(NavSubLink);
