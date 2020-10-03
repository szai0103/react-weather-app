import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import {routerMiddleware} from "react-router-redux";

// Create a history of your choosing (we're using a browser history in this case)
const history = createBrowserHistory({});
// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history);
const middleware = applyMiddleware(thunk, logger, historyMiddleware);
const Store = createStore(reducers, middleware);

export {history};
export default Store;
