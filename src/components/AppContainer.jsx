import React from 'react';
import PropTypes from 'prop-types';
import {
    Route, Switch, Redirect, withRouter,
} from 'react-router-dom';

import Header from './Header';
import SearchPage from './SearchPage';
import FavouritesPage from './FavouritesPage';
import NotFound from './NotFound';

const AppContainer = ({ location, history }) => (
    <div className="app-container">
        <Header currentPath={location.pathname} />
        <div className="page-container">
            <Switch>
                <Redirect exact from="/" to="/search" />
                <Route
                    path="/search"
                    render={() => (<SearchPage location={location} history={history} />)} />
                <Route path="/favourites" component={FavouritesPage} />
                <Route exact path="*" component={NotFound} />
            </Switch>
        </div>
    </div>
);

AppContainer.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func,
    }).isRequired,
};

export default withRouter(AppContainer);
