import React, { MouseEvent, useEffect } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavLink.scss';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { NavSubLinkProperties } from './NavSubLink';
import * as H from 'history';

interface NavLinkProperties extends RouteComponentProps {
    navItemName: string;
    iconName: IconDefinition;
    children?: React.ReactElement<NavSubLinkProperties> | React.ReactElement<NavSubLinkProperties>[];
    linkPath?: string;
    disableRefresh?: boolean;
    onClick?: (event: MouseEvent) => void;
}

const checkIsCollapsed = (
    children: React.ReactElement<NavSubLinkProperties> | React.ReactElement<NavSubLinkProperties>[],
    location: H.Location<unknown>
) => {
    return children
        ? Array.isArray(children)
            ? children.some(
                  (subLink: React.ReactElement<NavSubLinkProperties>) => subLink.props.linkPath === location.pathname
              )
            : children.props.linkPath === location.pathname
        : false;
};

function NavLink({
    iconName,
    navItemName,
    children,
    linkPath,
    location,
    onClick,
    disableRefresh = false,
}: NavLinkProperties): JSX.Element {
    const history = useHistory();
    const isCollapsed: boolean = children ? checkIsCollapsed(children, location) : false;
    const isSelected = isCollapsed || linkPath === location.pathname;
    const [isOpen, toggleOpen] = React.useState<boolean>(isCollapsed);
    useEffect(() => {
        toggleOpen(isSelected);
    }, [isSelected, children]);

    const NavLinkMain = (): JSX.Element => {
        return (
            <div className={`card-header ${isSelected ? 'header-collapsed' : ''}`} onClick={() => toggleOpen(!isOpen)}>
                <FontAwesomeIcon className="mr-2" icon={iconName} />
                {navItemName}
            </div>
        );
    };

    const NavLinkChildren = (): JSX.Element => {
        return <div style={{ display: isOpen ? '' : 'none' }}>{children}</div>;
    };

    return linkPath ? (
        <a
            className="card card-link"
            {...(disableRefresh
                ? {
                      onClick: onClick
                          ? onClick
                          : (e) => {
                                e.preventDefault();
                                history.push(linkPath);
                            },
                  }
                : { href: linkPath })}
        >
            <NavLinkMain />
            <NavLinkChildren />
        </a>
    ) : (
        <div className="card card-link">
            <NavLinkMain />
            <NavLinkChildren />
        </div>
    );
}

export default withRouter(NavLink);
