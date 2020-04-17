import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchMovies } from '../actions/movies';
import { toObject, build } from '../helpers/urlQuery';

import SearchBox from './SearchBox';
import PureComponent from './PureComponent';

class SearchPage extends PureComponent {
    constructor(props) {
        super(props);

        const { location, history, currentSearchQuery } = props;

        history.replace(build(location.pathname, { query: currentSearchQuery }));
    }

    handleSearch = (query, page) => {
        const { location, history } = this.props;

        history.push(build(location.pathname, { query }));

        this.props.moviesFetch(query, page);
    }

    render() {
        const {
            location, moviesIsLoading, currentSearchQuery,
        } = this.props;

        return (
            <div className="search-page">
                <SearchBox
                    currentSearchQuery={currentSearchQuery}
                    handleSearch={this.handleSearch}
                    currentQuery={toObject(location.search)}
                    isLoading={moviesIsLoading} />
            </div>
        );
    }
}

SearchPage.propTypes = {
    moviesFetch: PropTypes.func.isRequired,
    currentSearchQuery: PropTypes.string.isRequired,
    moviesIsLoading: PropTypes.bool.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func,
        replace: PropTypes.func,
    }).isRequired,
};

const mapStateToProps = (state) => ({
    moviesIsLoading: state.movies.loading,
    currentSearchQuery: state.movies.currentSearchQuery,
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        moviesFetch: fetchMovies,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
