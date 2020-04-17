import React from 'react';
import { Link } from 'react-router-dom';

import { getItem } from '../helpers/storage';

import PureComponent from './PureComponent';
import ResultsGrid from './ResultsGrid';
import NoResults from './NoResults';

class FavouritesPage extends PureComponent {
    constructor(props) {
        super(props);

        const currentMovies = getItem('favouriteMovies');


        this.state = {
            movies: currentMovies ? currentMovies.slice(0, 20) : null,
            moviesCount: currentMovies ? currentMovies.length : 0,
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    fetchNextPage = (page) => {
        const { movies } = this.state;
        const startingIndex = (page - 1) * 20;
        const nextMovies = getItem('favouriteMovies').slice(startingIndex, startingIndex + 20);

        this.setState({ movies: [...movies, ...nextMovies] });
    }

    setNewFavourites = (newFavourites) => {
        this.setState({ movies: newFavourites, moviesCount: newFavourites.length });
    }

    renderNoResults = () => {
        return (
            <NoResults title="Click on a movie star to add it to your favourites!" emoji="star">
                <Link className="btn btn-primary btn-find-movies" to="/search">Search Movies</Link>
            </NoResults>
        );
    }

    render() {
        const { movies, moviesCount } = this.state;

        return (
            <div className="favourites-page">
                <ResultsGrid
                    type="favourites"
                    fetchNextPage={this.fetchNextPage}
                    movies={movies}
                    selectMovie={this.selectMovie}
                    moviesCount={moviesCount}
                    noResults={this.renderNoResults()}
                    favouriteMovies={movies}
                    setNewFavourites={this.setNewFavourites} />
            </div>
        );
    }
}

export default FavouritesPage;
