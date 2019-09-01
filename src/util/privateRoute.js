import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import UserContext from '../component/context/UserContext';
import {isSatisfied} from "./authorization";

export const PrivateRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={props => (
                user && isSatisfied(user.roles, 'ADMIN')
                    ? <Component {...props} />
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            )}/>);
};