import rootReducer from "../reducer";
import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";

const thunkMiddleware = thunk;
let store;

if (process.env.REACT_APP_ENVIRONMENT === "production" || process.env.REACT_APP_ENVIRONMENT === "staging") {
    store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
} else {
    const composeEnhancers = typeof window === 'object' && 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
    store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
}

store.dispatch(thunk);
export default store;
