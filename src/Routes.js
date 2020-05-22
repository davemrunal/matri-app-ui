import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Signup from './containers/Signup';
import ConfirmSignup from './components/ConfirmSignup';
import ResetPassword from './components/ResetPassword';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import NewProfile from './containers/NewProfile';
import ProfilePhotoUploadPage from './containers/ProfilePhotoUploadPage';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import MatchedProfileDisplay from './containers/MatchedProfilesDisplay';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <UnauthenticatedRoute exact path="/login">
                <Login />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute exact path="/confirmAccount">
                <ConfirmSignup />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute exact path="/login/reset">
                <ResetPassword />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute exact path="/signup">
                <Signup />
            </UnauthenticatedRoute>
            <AuthenticatedRoute exact path="/profileDetails">
                <NewProfile />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path="/matchedProfiles">
                <MatchedProfileDisplay />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path="/profilePhotos">
                <ProfilePhotoUploadPage />
            </AuthenticatedRoute>
            {/* Finally, catch all unmatched routes */}
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}