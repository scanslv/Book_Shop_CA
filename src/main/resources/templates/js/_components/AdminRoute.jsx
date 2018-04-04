import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AdminRoute = (
    { component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role === 'ROLE_ADMIN'
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
);