import newState from '../helpers/newState';
import types from '../constants/actionTypes';

const defaultState = {
    movies: null,
    loading: false,
    error: null,
    moviesCount: null,
    currentSearchQuery: '',
};

const addMovies = (moviesList, newMovies, page) => {
    if (moviesList && page > 1) {
        return [...moviesList, ...newMovies];
    }

    return (newMovies);
};

const resetMovies = (moviesList) => {
    return moviesList && moviesList.length ? moviesList.slice(0, 20) : null;
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
            movies: addMovies(state.movies, action.moviesResult.results, action.page),
            moviesCount: action.moviesResult.total_results,
            currentSearchQuery: action.currentSearchQuery,
        });

    case types.MOVIES_RESET:
        return newState(state, {
            movies: resetMovies(state.movies),
        });

    case types.MOVIES_ERROR:
        return newState(state, {
            loading: false,
            error: action.errorMessage,
        });

    case types.MOVIES_CANCEL:
        return newState(state, {
            loading: false,
        });

    default: return state;
    }
};

export default movies;
