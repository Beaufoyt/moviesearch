/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import SearchBox from '../../src/components/SearchBox';

configure({ adapter: new Adapter() });

const currentSearchQuery = 'joker';
const handleSearch = jest.fn();
const currentQuery = { query: 'joker' };
const isLoading = false;

const render = (
    defaultCurrentQuery = currentQuery,
    defaultCurrentSearchQuery = currentSearchQuery,
) => {
    return shallow(
        <SearchBox
            currentSearchQuery={defaultCurrentSearchQuery}
            handleSearch={handleSearch}
            currentQuery={defaultCurrentQuery}
            isLoading={isLoading} />,
    );
};

let searchBox;
describe('Given a SearchBox Component', () => {
    beforeEach(() => {
        searchBox = render();
    });

    it('should render the query input pre-filled with the passed in query', () => {
        expect(searchBox.find('#query').first().props().value).toEqual(currentQuery.query);
    });

    it('should not call handle search', () => {
        expect(handleSearch.mock.calls.length).toEqual(0);
    });

    describe('when the search box is loading for the first time with a query', () => {
        beforeEach(() => {
            searchBox = render({ query: 'joker' }, '');
        });

        it('should call handle search', () => {
            expect(handleSearch.mock.calls.length).toEqual(1);
        });
    });

    describe('if there is already a search query cached in the state', () => {
        beforeEach(() => {
            handleSearch.mockReset();
            searchBox = render({ query: 'joker' }, 'joker');
        });

        it('should not call handle search', () => {
            expect(handleSearch.mock.calls.length).toEqual(0);
        });
    });

    it('should not show an error', () => {
        expect(searchBox.find('.search-box-error').length).toEqual(0);
    });

    describe('when the search box is triggered to show an error', () => {
        beforeEach(() => {
            searchBox.setState({ showError: true });
        });

        it('should render the search box input error', () => {
            expect(searchBox.find('.search-box-error').length).toEqual(1);
        });
    });

    describe('when the search form is submitted', () => {
        beforeEach(() => {
            handleSearch.mockReset();

            searchBox.find('form').first().simulate('submit', {
                preventDefault: () => {},
                stopPropagation: () => {},
            });
        });

        it('should call handle search', () => {
            expect(handleSearch.mock.calls.length).toEqual(1);
        });
    });

    describe('when the search form is submitted without a query', () => {
        beforeEach(() => {
            handleSearch.mockReset();
            searchBox = render({ query: '' }, '');

            searchBox.find('form').first().simulate('submit', {
                preventDefault: () => {},
                stopPropagation: () => {},
            });
        });

        it('should not call handle search', () => {
            expect(handleSearch.mock.calls.length).toEqual(0);
        });
    });
});
