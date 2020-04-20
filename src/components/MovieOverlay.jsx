import React from 'react';
import PropTypes from 'prop-types';

import { setNoScroll } from '../helpers/dom';

import Emoji from './Emoji';
import PureComponent from './PureComponent';

class MovieOverlay extends PureComponent {
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        setNoScroll(true);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        setNoScroll(false);
    }

    handleKeyDown = (e) => {
        const keyCode = e.which || e.keyCode;

        if (keyCode === 27) {
            this.props.onClose();
        }
    }

    render() {
        const { onClose, movie: { title } } = this.props;

        return (
            <div role="presentation" onClick={onClose} className="overlay-movie">
                <div role="presentation" onClick={(e) => e.stopPropagation()} className="overlay-movie-content">
                    <h2>{ title }</h2>
                    <h3>Coming soon!<Emoji emojiKey="constructionWorker" /></h3>
                    <button
                        type="button"
                        aria-label="close-overlay"
                        className="btn btn-close-movie-overlay"
                        onClick={onClose}>
                        <i className="fa fa-times" />
                    </button>
                </div>
            </div>
        );
    }
}

MovieOverlay.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default MovieOverlay;
