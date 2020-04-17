import React from 'react';
import PropTypes from 'prop-types';

import Emoji from './Emoji';

const NoResults = ({ title, emoji, children }) => (
    <div className="no-results">
        <h2>
            { title }&nbsp;
            <Emoji emojiKey={emoji} />
        </h2>
        { children }
    </div>
);

NoResults.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    title: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
};

NoResults.defaultProps = {
    children: null,
};

export default NoResults;
