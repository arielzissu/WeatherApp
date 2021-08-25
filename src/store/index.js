import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import FavoriteReducer from './reducers/favoriteReducer';
import DarkModeReducer from './reducers/darkModeReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    favorite: FavoriteReducer,
    darkMode: DarkModeReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;