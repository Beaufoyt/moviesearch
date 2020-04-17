import React from 'react';
import PropTypes from 'prop-types';

import BrandLogo from './BrandLogo';
import NavLink from './NavLink';

const Header = ({ currentPath }) => (
    <div className="header">
        <BrandLogo />
        <div className="header-nav">
            <NavLink to="/search" currentPath={currentPath}>Search</NavLink>
            <NavLink to="/favourites" currentPath={currentPath}>Favourites</NavLink>
        </div>
    </div>
);

Header.propTypes = {
    currentPath: PropTypes.string.isRequired,
};

export default Header;
