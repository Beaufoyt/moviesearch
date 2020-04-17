/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import PureComponent from './PureComponent';

class ResultsGrid extends PureComponent {
    render() {
        const { movie, releaseYear } = this.props;
        const {
            id, title, poster_path, vote_average, vote_count, overview,
        } = movie;

        return (
            <button
                id={id}
                type="button"
                onClick={() => {}}
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

ResultsGrid.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        vote_count: PropTypes.number,
        release_date: PropTypes.string,
        overview: PropTypes.string,
    }).isRequired,
    releaseYear: PropTypes.number.isRequired,
};

export default ResultsGrid;
