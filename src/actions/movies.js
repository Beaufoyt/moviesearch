import axios from 'axios';
import types from '../constants/actionTypes';

import { getErrorMessage } from '../helpers/responses';
import { build } from '../helpers/urlQuery';

const { CancelToken } = axios;
let cancelMovies;

export const moviesIsLoading = () => ({ type: types.MOVIES_IS_LOADING });
export const moviesSuccess = (moviesResult, currentSearchQuery, page) => ({
    type: types.MOVIES_SUCCESS, moviesResult, currentSearchQuery, page,
});
export const moviesError = (errorMessage) => ({ type: types.MOVIES_ERROR, errorMessage });
export const moviesCancel = () => ({ type: types.MOVIES_CANCEL });
export const moviesReset = () => ({ type: types.MOVIES_RESET });

export const fetchMovies = (query, page) => {
    return async (dispatch) => {
        try {
            dispatch(moviesIsLoading());

            const { data } = await axios.get(build('https://api.themoviedb.org/3/search/movie', {
                api_key: '95107023211442633a2ddddd9a7259ee',
                language: 'en-US',
                query,
                page,
            }), {
                cancelToken: new CancelToken((c) => {
                    cancelMovies = c;
                }),
            });

            dispatch(moviesSuccess(data, query, page));
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log(err.message);
            } else {
                dispatch(moviesError(getErrorMessage(err)));
            }
        }
    };
};

export const resetMovieList = () => {
    return async (dispatch) => {
        resetMovieList();
        dispatch(moviesReset());
    };
};

export const cancelFetchMovies = () => {
    return async (dispatch) => {
        cancelMovies('Movie request cancelled by route change');
        dispatch(moviesCancel());
    };
};
