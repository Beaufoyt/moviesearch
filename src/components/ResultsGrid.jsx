/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

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

    renderMovies(movies) {
        return movies.map((movie) => {
            const { release_date } = movie;
            const releaseYear = release_date ? new Date(release_date).getFullYear() : 0;

            return (
                <ResultsTile
                    key={movie.id + releaseYear}
                    movie={movie}
                    releaseYear={releaseYear}
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
        const { movies, noResults } = this.props;

        return (
            <div className="results-grid">
                { movies && movies.length
                    ? (
                        <div className="results-grid-tiles">
                            { this.renderCountTitle() }
                            { this.renderMovies(movies) }
                        </div>
                    ) : noResults }
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
    fetchNextPage: PropTypes.func.isRequired,
    moviesCount: PropTypes.number,
    type: PropTypes.string.isRequired,
};

ResultsGrid.defaultProps = {
    movies: null,
    moviesCount: null,
};

export default ResultsGrid;
