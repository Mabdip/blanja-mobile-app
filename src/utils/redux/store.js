import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";

import reducers from "./Reducers";

const logger = createLogger();

const enhancers = applyMiddleware(promiseMiddleware, logger);

// rpm mengubah 1 async action menjadi 2 bagian
// action pending
// action fulfilled/rejected

const reduxStore = createStore(reducers, composeWithDevTools(enhancers));

export default reduxStore;