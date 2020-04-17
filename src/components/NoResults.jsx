import React from 'react';
import PropTypes from 'prop-types';

import Emoji from './Emoji';

const NoResults = ({ title, emoji }) => (
    <div className="no-results">
        <h2>
            { title }&nbsp;
            <Emoji emojiKey={emoji} />
        </h2>
    </div>
);

NoResults.propTypes = {
    title: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
};

export default NoResults;
