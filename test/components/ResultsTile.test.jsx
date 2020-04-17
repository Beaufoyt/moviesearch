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
describe('Given a ResultsTile Component', () => {
    beforeEach(() => {
        resultsTile = render();
    });

    it('should render unfavorited', () => {
        expect(resultsTile.find('.far.fa-star').length).toEqual(1);
    });

    it('should set default favourited to false', () => {
        expect(resultsTile.state('currentFavourite')).toEqual(false);
    });

    describe('when results tile is clicked', () => {
        beforeEach(() => {
            selectMovie.mockReset();
            const resultsTileButton = resultsTile.find('button').first();

            resultsTileButton.simulate('click', movie);
        });

        it('should call select movie with the passed in movie', () => {
            expect(selectMovie.mock.calls.length).toEqual(1);
            expect(selectMovie.mock.calls[0][0].id).toEqual(movie.id);
        });
    });

    describe('when the favourite button is clicked', () => {
        beforeEach(() => {
            toggleMovie.mockReset();
            const favouriteButton = resultsTile.find('.btn.btn-toggle-favourite').first();

            favouriteButton.simulate('click', {
                preventDefault: () => {},
                stopPropagation: () => {},
            }, movie);
        });

        it('should set favourite in the state to the opposite of current favourite', () => {
            expect(resultsTile.state('currentFavourite')).toEqual(true);
        });

        it('should call toggle movie with the opposite of current favourite and the passed in movie', () => {
            expect(toggleMovie.mock.calls.length).toEqual(1);
            expect(toggleMovie.mock.calls[0][0]).toEqual(true);
            expect(toggleMovie.mock.calls[0][1].id).toEqual(movie.id);
        });
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
