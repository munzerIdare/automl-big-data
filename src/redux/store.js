import thunk from "redux-thunk";
import logger from "redux-logger";
import baseReducer from "./baseReducer";
import { createStore, applyMiddleware, compose } from "redux";

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore() {
  return createStore(
    baseReducer,
    reduxDevTools(applyMiddleware(logger, thunk))
  );
}

const store = configureStore();

export default store;
