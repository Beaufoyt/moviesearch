import React from 'react';

import NavLink from './NavLink';

const Header = () => (
    <div className="header">
        <div className="header-nav">
            <NavLink to="/search" currentPath="/">Search</NavLink>
            <NavLink to="/favourites" currentPath="/">Favourites</NavLink>
        </div>
    </div>
);

export default Header;
