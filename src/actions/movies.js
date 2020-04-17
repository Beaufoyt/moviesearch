import types from '../constants/actionTypes';

import { getErrorMessage } from '../helpers/responses';

export const moviesIsLoading = () => ({ type: types.MOVIES_IS_LOADING });
export const moviesSuccess = (movies) => ({ type: types.MOVIES_SUCCESS, movies });
export const moviesError = (errorMessage) => ({ type: types.MOVIES_ERROR, errorMessage });

export const fetchMovies = () => {
    return async (dispatch) => {
        try {
            dispatch(moviesIsLoading());

            const data = [];

            dispatch(moviesSuccess(data));
        } catch (err) {
            dispatch(moviesError(getErrorMessage(err)));
        }
    };
};
