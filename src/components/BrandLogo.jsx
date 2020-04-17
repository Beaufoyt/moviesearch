import React from 'react';
import { Link } from 'react-router-dom';

import brandLogo from '../images/brandLogo.png';

const BrandLogo = () => (
    <Link to="/" className="brand-logo">
        <img src={brandLogo} alt="Brand Logo" />
    </Link>
);

export default BrandLogo;
