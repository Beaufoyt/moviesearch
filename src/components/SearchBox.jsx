/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { handleValidate } from '../helpers/form';

import PureComponent from './PureComponent';

class SearchBox extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showError: false,
            form: {
                meta: {
                    submitted: false,
                    valid: false,
                },
                fields: {
                    query: {
                        id: 'query',
                        value: props.currentSearchQuery,
                        error: true,
                        required: true,
                        validation: 'string',
                        length: 1,
                    },
                },
            },
        };

        this.delayedKeyChangeSearch = debounce(this.handleKeyChangeSearch, 200);
    }

    componentDidMount() {
        const { currentQuery, currentSearchQuery } = this.props;
        const { query } = currentQuery;

        if (currentQuery) {
            this.setInitialValues({ query: query || currentSearchQuery });

            if (!currentSearchQuery && currentQuery.query) {
                this.props.handleSearch(currentQuery.query);
            }
        }
    }

    setInitialValues = (defaultValues) => {
        Object.keys(defaultValues).forEach((key) => {
            const currentStateField = this.state.form.fields[key];

            if (currentStateField) {
                let currentValue = defaultValues[key];

                if (currentStateField.validation === 'string' && Number.isInteger(currentValue)) {
                    currentValue = `${currentValue}`;
                }

                if (currentValue === null) {
                    currentValue = '';
                }

                this.validateForm(key, currentValue);
            }
        });
    }

    validateForm = (id, value) => {
        const { form } = this.state;

        const newForm = { ...form };

        newForm.fields[id].value = value;

        this.setState({ form: handleValidate(newForm, id) });
    }

    handleFormChange = (e) => {
        const { id, value } = e.target;
        const { form } = this.state;

        const newForm = { ...form };

        newForm.fields[id].value = value;

        this.setState({ form: handleValidate(newForm, id), showError: false });

        this.delayedKeyChangeSearch();
    }

    handleKeyChangeSearch = () => {
        this.handleSearch();
    }

    submitSearch = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.handleSearch(true);
    }

    handleSearch = (submit = false) => {
        const { value } = this.state.form.fields.query;
        const { form } = this.state;
        const newForm = handleValidate(form);
        const { meta: { valid, submitted } } = newForm;

        this.setState({ form: newForm, showError: submit && !valid && submitted }, () => {
            if (value && value.length) {
                this.props.handleSearch(value, 1);
            }
        });
    }

    render() {
        const { isLoading } = this.props;
        const { query: { value } } = this.state.form.fields;
        const { showError } = this.state;

        return (
            <div className="search-box-container">
                <form onSubmit={this.submitSearch}>
                    <input
                        id="query"
                        className="search-box"
                        value={value}
                        onChange={this.handleFormChange}
                        placeholder="Search for movies..."
                        autoFocus
                        autoComplete="off" />
                    <button type="submit" className="btn btn-primary btn-search-submit" aria-label="search">
                        <i className={`fa fa-${isLoading ? 'spinner fa-spin' : 'search'}`} />
                    </button>
                </form>
                { showError ? <span className="search-box-error">Please enter a search term</span> : null }
            </div>
        );
    }
}

SearchBox.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    currentSearchQuery: PropTypes.string.isRequired,
    currentQuery: PropTypes.shape({
        query: PropTypes.string,
    }),
};

SearchBox.defaultProps = {
    currentQuery: {},
};

export default SearchBox;
