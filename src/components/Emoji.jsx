import React from 'react';
import PropTypes from 'prop-types';

import emojis from '../constants/emojis';

const Emoji = ({ emojiKey }) => {
    const { label, emoji } = emojis[emojiKey];

    return <span role="img" aria-label={label || 'Emoji not found'}>{ emoji || '🚫' }‍</span>;
};

Emoji.propTypes = {
    emojiKey: PropTypes.string.isRequired,
};

export default Emoji;
