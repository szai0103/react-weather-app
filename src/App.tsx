import React from "react";
import "./App.css";
import Header from "./components/Header";
import {Route} from "react-router-dom";
import Home from "./components/Home";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import ProfilePage from "./components/ProfilePage";

class App extends React.Component<any, any> {

  componentDidMount() {
    window.console.info("App component mounted");
  }

  render() {
    return (
      <div>
        <Header auth={this.props.auth} {...this.props} />
        <Route exact={true} path="/home" render={props => <Home auth={this.props.auth} {...this.props} />} />
        <Route
          exact={true}
          path="/country-list/:iso"
          render={props => <CityList auth={this.props.auth} {...this.props} />}
        />
        <Route
          exact={true}
          path="/country-list"
          render={props => <CountryList auth={this.props.auth} {...this.props} />}
        />
        <Route exact={true} path="/profile" render={props => <ProfilePage auth={this.props.children} {...this.props} />}
        />
      </div>
    );
  }
}

export default App;
