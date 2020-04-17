import newState from '../helpers/newState';
import types from '../constants/actionTypes';

const defaultState = {
    movies: null,
    loading: false,
    error: null,
};

const movies = (state = defaultState, action) => {
    switch (action.type) {
    case types.MOVIES_IS_LOADING:
        return newState(state, {
            loading: true,
            error: null,
        });

    case types.MOVIES_SUCCESS:
        return newState(state, {
            loading: false,
            movies: action.movies,
        });

    case types.MOVIES_ERROR:
        return newState(state, {
            loading: false,
            error: action.errorMessage,
        });

    default: return state;
    }
};

export default movies;
