import { Link } from 'react-router-dom';
import React from 'react';

interface NavbarLink {
    setTrue: () => void;
    target: string;
    name: string;
}

export function NavbarLink(props: NavbarLink) {
    return (
        <li data-toggle="collapse" data-target="#collapsibleNavbar" className="nav-item p-2 ">
            <Link onClick={props.setTrue} to={props.target} className="navlinkstyle">
                <h4>{props.name}</h4>
            </Link>
        </li>
    );
}