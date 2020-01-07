import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const configureStore = () => {
  const middlewares = [];
  let sagaMiddleware = createSagaMiddleware();

  middlewares.push(sagaMiddleware);
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }

  middlewares.push(logger);
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  store.runSaga = sagaMiddleware.run;

  store.runSaga(rootSaga);

  return store;
};

export default configureStore;
