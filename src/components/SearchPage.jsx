import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchMovies } from '../actions/movies';
import { toObject, build } from '../helpers/urlQuery';

import SearchBox from './SearchBox';
import ResultsGrid from './ResultsGrid';
import NoResults from './NoResults';
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

    fetchNextPage = (page) => {
        const { currentSearchQuery } = this.props;

        this.handleSearch(currentSearchQuery, page);
    }

    renderNoResults = () => {
        return this.props.moviesCount === 0
            ? <NoResults title="No movies found" emoji="cry" />
            : this.props.moviesIsLoading ? <NoResults title="Finding movies" emoji="eyes" />
                : <NoResults title="Type anything in the search box above" emoji="pointUp" />;
    }

    render() {
        const {
            location, movies, moviesIsLoading, currentSearchQuery, moviesCount,
        } = this.props;

        return (
            <div className="search-page">
                <SearchBox
                    currentSearchQuery={currentSearchQuery}
                    handleSearch={this.handleSearch}
                    currentQuery={toObject(location.search)}
                    isLoading={moviesIsLoading} />
                <ResultsGrid
                    type="search"
                    fetchNextPage={this.fetchNextPage}
                    movies={movies}
                    moviesCount={moviesCount}
                    noResults={this.renderNoResults()} />
            </div>
        );
    }
}

SearchPage.propTypes = {
    moviesFetch: PropTypes.func.isRequired,
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
        }),
    ),
    currentSearchQuery: PropTypes.string.isRequired,
    moviesCount: PropTypes.number,
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

SearchPage.defaultProps = {
    movies: null,
    moviesCount: null,
};

const mapStateToProps = (state) => ({
    movies: state.movies.movies,
    moviesIsLoading: state.movies.loading,
    currentSearchQuery: state.movies.currentSearchQuery,
    moviesCount: state.movies.moviesCount,
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        moviesFetch: fetchMovies,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
