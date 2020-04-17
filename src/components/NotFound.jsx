import React from 'react';

import Emoji from './Emoji';

const NotFound = () => (
    <div className="not-found">
        <h1>
            404&nbsp;
            <Emoji emojiKey="cry" />
        </h1>
    </div>
);

export default NotFound;
