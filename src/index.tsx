import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import * as serviceWorker from "./serviceWorker";
import Store, {history} from "./store";
import {ConnectedRouter} from "react-router-redux";
import "./index.css";
import {applyPolyfills, defineCustomElements} from "@scu/core-ui/dist/loader";
import "@scu/core-ui/dist/schwarz-core-ui/schwarz-core-ui.css";
import mainRoutes from "./mainRoutes";
import { JSX } from "@scu/core-ui";
import {createReactComponent} from "./react-component-lib/createComponent";

export const ScuTopBar = createReactComponent<JSX.ScuTopBar, HTMLScuTopBarElement>("scu-top-bar");
export const ScuNavBar = createReactComponent<JSX.ScuNavBar, HTMLScuNavBarElement>("scu-nav-bar");
export const ScuNavBarAction = createReactComponent<JSX.ScuNavBarAction, HTMLScuNavBarActionElement>("scu-nav-bar-action");
export const ScuIcon = createReactComponent<JSX.ScuIcon, HTMLScuIconElement>("scu-icon");
export const ScuFlyOut = createReactComponent<JSX.ScuFlyOut, HTMLScuFlyOutElement>("scu-fly-out");
export const ScuLink = createReactComponent<JSX.ScuLink, HTMLScuLinkElement>("scu-link");
export const ScuHeadline = createReactComponent<JSX.ScuHeadline, HTMLScuHeadlineElement>("scu-headline");
export const ScuAnchorGroup = createReactComponent<JSX.ScuAnchorGroup, HTMLScuAnchorGroupElement>("scu-anchor-group");
export const ScuAnchor = createReactComponent<JSX.ScuAnchor, HTMLScuAnchorElement>("scu-anchor");
export const ScuInput = createReactComponent<JSX.ScuInput, HTMLScuInputElement>("scu-input");
export const ScuButton = createReactComponent<JSX.ScuButton, HTMLScuButtonElement>("scu-button");

ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={history}>
      {mainRoutes()}
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

applyPolyfills().then(() => {
  defineCustomElements(window);
});
