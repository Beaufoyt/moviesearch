import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classnames from '../helpers/classnames';

const NavLink = ({ children, to, currentPath }) => {
    const isActive = currentPath.split('/')[1] === to.substring(1);

    return (
        <Link
            className={classnames('nav-link', { active: isActive })}
            to={to}>
            {children}
        </Link>
    );
};

NavLink.propTypes = {
    children: PropTypes.string,
    to: PropTypes.string.isRequired,
    currentPath: PropTypes.string.isRequired,
};

NavLink.defaultProps = {
    children: null,
};

export default NavLink;
