/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import ResultsTile from '../../src/components/ResultsTile';

configure({ adapter: new Adapter() });

const favourited = false;
const movie = {
    id: 1234,
    title: 'An Interesting Movie',
    poster_path: '/some-path',
    vote_average: 1.1,
    vote_count: 9001,
    release_date: '2030-04-01',
    overview: 'This movie is very interesting',
};
const selectMovie = jest.fn();
const toggleMovie = jest.fn();
const releaseYear = 2030;

const render = (defaultFavourited = favourited) => {
    return shallow(
        <ResultsTile
            movie={movie}
            releaseYear={releaseYear}
            favourited={defaultFavourited}
            selectMovie={selectMovie}
            toggleMovie={toggleMovie} />,
    );
};

let resultsTile;
describe('Given a Numbers Component', () => {
    beforeEach(() => {
        resultsTile = render();
    });

    it('should render unfavorited', () => {
        expect(resultsTile.find('.far.fa-star').length).toEqual(1);
    });

    it('should set default favourited to false', () => {
        expect(resultsTile.state('currentFavourite')).toEqual(false);
    });

    describe('when the results tile is passed favourited', () => {
        beforeEach(() => {
            resultsTile = render(true);
        });

        it('should no longer render the unfavorited star', () => {
            expect(resultsTile.find('.far.fa-star').length).toEqual(0);
        });

        it('should set default favourited to true', () => {
            expect(resultsTile.state('currentFavourite')).toEqual(true);
        });

        it('should render the favorited star', () => {
            expect(resultsTile.find('.fas.fa-star').length).toEqual(1);
        });
    });
});
