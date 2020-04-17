/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

import { getItem, setItem, removeItem } from '../helpers/storage';

import ScrollLoader from './ScrollLoader';
import ResultsTile from './ResultsTile';
import PureComponent from './PureComponent';

class ResultsGrid extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
        };
    }

    fetchNextPage = () => {
        const { currentPage } = this.state;
        const newPage = currentPage + 1;

        this.setState({ currentPage: newPage });
        this.props.fetchNextPage(newPage);
    }

    toggleMovie = (selected, movie) => {
        const { type } = this.props;
        const currentMovies = getItem('favouriteMovies');
        let newMovies = [];


        if (selected) {
            if (currentMovies) {
                newMovies = [...currentMovies, movie];
            } else {
                newMovies = [movie];
            }
        } else {
            newMovies = currentMovies.filter((currentMovie) => currentMovie.id !== movie.id);
        }

        if (type === 'favourites') {
            this.props.setNewFavourites(newMovies);
        }

        if (currentMovies && !newMovies.length) {
            removeItem('favouriteMovies');
        } else {
            setItem('favouriteMovies', newMovies);
        }
    }

    renderMovies(movies) {
        const { favouriteMovies } = this.props;

        return movies.map((movie) => {
            const { release_date } = movie;
            const releaseYear = release_date ? new Date(release_date).getFullYear() : 0;
            const favourited = favouriteMovies && favouriteMovies.length
                ? !!favouriteMovies.find((favourite) => favourite.id === movie.id)
                : null;

            return (
                <ResultsTile
                    key={movie.id + releaseYear}
                    movie={movie}
                    releaseYear={releaseYear}
                    favourited={favourited}
                    selectMovie={this.selectMovie}
                    toggleMovie={this.toggleMovie} />
            );
        });
    }

    renderCountTitle() {
        const { moviesCount, type } = this.props;
        const plural = moviesCount > 1 ? 's' : '';

        if (type === 'favourites') {
            return <h3>{`You have ${moviesCount} favourite${plural}`}</h3>;
        }

        return <h3>{`${moviesCount} movie${plural} found`}</h3>;
    }

    render() {
        const { movies, noResults, moviesCount } = this.props;

        return (
            <div className="results-grid">
                { movies && movies.length
                    ? (
                        <div className="results-grid-tiles">
                            { this.renderCountTitle() }
                            { this.renderMovies(movies) }
                        </div>
                    ) : noResults }
                { movies && movies.length < moviesCount
                    ? (
                        <LazyLoad unmountIfInvisible resize>
                            <ScrollLoader fetchNextPage={this.fetchNextPage} />
                        </LazyLoad>
                    ) : null }
            </div>
        );
    }
}

ResultsGrid.propTypes = {
    noResults: PropTypes.node.isRequired,
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
        }),
    ),
    favouriteMovies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
        }),
    ),
    fetchNextPage: PropTypes.func.isRequired,
    setNewFavourites: PropTypes.func,
    moviesCount: PropTypes.number,
    type: PropTypes.string.isRequired,
};

ResultsGrid.defaultProps = {
    movies: null,
    moviesCount: null,
    favouriteMovies: null,
    setNewFavourites: () => {},
};

export default ResultsGrid;
