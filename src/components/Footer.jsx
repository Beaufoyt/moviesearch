import React from 'react';

import Emoji from './Emoji';

const Footer = () => (
    <div className="footer">
        <div className="love">
            <span className="love-text">
                Made with&nbsp;
                <Emoji emojiKey="loveHeart" />
                &nbsp;by Tom Beaufoy
            </span>
        </div>
    </div>
);

export default Footer;
