import React from 'react';
import PropTypes from 'prop-types';

import PureComponent from './PureComponent';

class ScrollLoader extends PureComponent {
    componentDidMount() {
        this.props.fetchNextPage();
    }

    render() {
        return (
            <div className="loader-infinite">
                <i className="fa fa-spinner fa-spin" />
            </div>
        );
    }
}

ScrollLoader.propTypes = {
    fetchNextPage: PropTypes.func.isRequired,
};

export default ScrollLoader;
