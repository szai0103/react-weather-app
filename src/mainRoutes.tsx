import * as React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import App from "./App";
import Callback from "./components/Callack";
import Auth from "./components/Auth";

const auth = new Auth();

const handleAuthentication = (prop: any) => {
    if (/access_token|id_token|error/.test(prop.location.hash)) {
        auth.handleAuthentication();
    }
};
const mainRoutes = () =>
    <Switch>

        <Route
            path="/"
            exact={true}
            render={props => !auth.isAuthenticated() ?
                <Redirect to="/home" />
                : <App auth={auth} {...props} />}
        />
        <Route
            path="/callback"
            render={props => {
                handleAuthentication(props);
                return <Callback {...props} />;
            }}
        />

        <Route exact={true}
               path="/home"
               render={props => <App auth={auth} {...props} />} />

        <Route path="/country-list/:iso"
               exact={true}
               render={props => !auth.isAuthenticated() ?
                <Redirect to="/home" />
                : <App auth={auth} {...props} />}
        />

        <Route path="/country-list/" exact={true} render={props => !auth.isAuthenticated() ?
                <Redirect to="/home" />
                : <App auth={auth} {...props} />}
        />
        <Route exact={true} path="/profile" render={props =>
        !auth.isAuthenticated() ?
          <Redirect to="/home" />
          :<App auth={auth} {...props} />}
        />
    </Switch>
;

export default mainRoutes;
