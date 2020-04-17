import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = compose(...enhancers);

    const store = createStore(
        {},
        composedEnhancers,
    );

    return store;
}
