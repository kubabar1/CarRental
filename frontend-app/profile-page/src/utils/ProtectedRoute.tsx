import { Route } from 'react-router-dom';
import React from 'react';
import { RouteProps } from 'react-router';
import { NotAuthorizedPage } from '../subpages/authorization/NotAuthorizedPage';

interface ProtectedRouteProps extends RouteProps {
    isAuthorized: boolean;
}

export function ProtectedRoute({ component, isAuthorized, ...rest }: ProtectedRouteProps) {
    return <Route {...rest} component={isAuthorized ? component : NotAuthorizedPage} />;
}
