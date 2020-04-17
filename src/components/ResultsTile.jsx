/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import PureComponent from './PureComponent';

class ResultsTile extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            currentFavourite: this.props.favourited,
        };
    }

    toggleFavourite = (e, movie) => {
        const { currentFavourite } = this.state;

        e.preventDefault();
        e.stopPropagation();

        this.setState({ currentFavourite: !currentFavourite }, () => {
            this.props.toggleMovie(!currentFavourite, movie);
        });
    }

    render() {
        const { currentFavourite } = this.state;
        const { movie, releaseYear } = this.props;
        const {
            id, title, poster_path, vote_average, vote_count, overview,
        } = movie;

        return (
            <button
                id={id}
                type="button"
                onClick={() => this.props.selectMovie(movie)}
                className="col-xs-12 col-md-6 col-lg-4 col-xl-3 results-tile">
                <div className="results-tile-header">
                    <span>
                        { title }
                    </span>
                </div>
                <div className="results-tile-content">
                    <div className="results-tile-img-container">
                        { poster_path
                            ? (
                                <img alt="movie-poster" src={`https://image.tmdb.org/t/p/w188_and_h282_bestv2${poster_path}`} />
                            )
                            : null }
                        <i className="far fa-image results-tile-no-img" />
                    </div>
                    <div className="results-tile-description">
                        <p>
                            { overview || 'Description coming soon...' }
                        </p>
                    </div>
                    <span
                        tabIndex="0"
                        role="button"
                        onClick={(e) => this.toggleFavourite(e, movie)}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) this.toggleFavourite(e, movie);
                        }}
                        className="btn btn-toggle-favourite">
                        <i className={`fa${currentFavourite ? 's' : 'r'} fa-star`} />
                    </span>
                </div>
                <div className="results-tile-footer">
                    <span className="results-tile-rating">
                        <i className="fa fa-poll" />&nbsp;
                        { vote_average }/10&nbsp;
                        <span className="vote-count">({ vote_count } votes)</span>
                    </span>
                    <span className="results-tile-year">
                        { releaseYear || 'TBC' }
                    </span>
                </div>
            </button>
        );
    }
}

ResultsTile.propTypes = {
    favourited: PropTypes.bool,
    movie: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        vote_count: PropTypes.number,
        release_date: PropTypes.string,
        overview: PropTypes.string,
    }).isRequired,
    selectMovie: PropTypes.func.isRequired,
    toggleMovie: PropTypes.func.isRequired,
    releaseYear: PropTypes.number.isRequired,
};

ResultsTile.defaultProps = {
    favourited: false,
};

export default ResultsTile;
