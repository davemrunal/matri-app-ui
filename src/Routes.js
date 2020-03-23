import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import AppliedRoute from './components/AppliedRoute';
import Signup from './containers/Signup';
import ConfirmSignup from './components/ConfirmSignup';
import ResetPassword from './components/ResetPassword';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

export default function Routes({appProps}) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps}/>
            <AppliedRoute path="/login" exact component={Login} appProps={appProps}/>
            <AppliedRoute path="/signup" exact component={Signup} appProps={appProps}/>
            <AppliedRoute path="/confirmAccount" exact component={ConfirmSignup} appProps={appProps}/>
            <UnauthenticatedRoute path="/login/reset" exact component={ResetPassword} appProps={appProps}/>
            { /* Finally, catch all unmatched routes */}
            <Route component={NotFound}/>
        </Switch>
    );
}