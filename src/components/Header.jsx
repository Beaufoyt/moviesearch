import React from 'react';
import PropTypes from 'prop-types';

import BrandLogo from './BrandLogo';
import NavLink from './NavLink';
import PureComponent from './PureComponent';

class Header extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isMobileMenuOpen: false,
        };
    }

    getLink = (currentPath, label, to) => {
        return (
            <NavLink
                currentPath={currentPath}
                to={to}>
                { label }
            </NavLink>
        );
    }

    closeMobileMenu = () => {
        this.setState({ isMobileMenuOpen: false });
    }

    toggleMobileMenu = () => {
        const { isMobileMenuOpen } = this.state;

        this.setState({ isMobileMenuOpen: !isMobileMenuOpen });
    }

    render() {
        const { currentPath } = this.props;
        const { isMobileMenuOpen } = this.state;

        return (
            <div className="menus-container">
                <div className="header">
                    <BrandLogo />
                    <div className="header-nav">
                        <span className="desktop-menu">
                            { this.getLink(currentPath, 'Search', '/search') }
                            { this.getLink(currentPath, 'Favourites', '/favourites') }
                        </span>
                        <button
                            aria-label="Header Menu"
                            type="button"
                            onClick={this.toggleMobileMenu}
                            className="btn btn-header-menu">
                            <i className={`fas fa-${isMobileMenuOpen ? 'times' : 'bars'}`} />
                        </button>
                        { isMobileMenuOpen
                    && (
                        <div className="mobile-menu">
                            <div className="mobile-menu-link">
                                <div
                                    role="presentation"
                                    className="mobile-menu-closer"
                                    onClick={this.closeMobileMenu}>
                                    { this.getLink(currentPath, 'Search', '/search') }
                                    { this.getLink(currentPath, 'Favourites', '/favourites') }
                                </div>
                            </div>
                        </div>
                    ) }
                    </div>
                </div>
                { isMobileMenuOpen
                    && (
                        <button
                            aria-label="close-mobile-menu"
                            type="button"
                            className="menu-overlay"
                            onClick={this.toggleMobileMenu} />
                    ) }
            </div>
        );
    }
}

Header.propTypes = {
    currentPath: PropTypes.string.isRequired,
};

export default Header;
