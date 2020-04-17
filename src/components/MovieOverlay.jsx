import React from 'react';
import PropTypes from 'prop-types';

import { setNoScroll } from '../helpers/dom';

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
        const { movie: { title } } = this.props;

        return (
            <div className="overlay-movie">
                { title }
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
