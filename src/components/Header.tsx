import React from "react";
import Profile from "../models/Profile";
import {ScuFlyOut, ScuHeadline, ScuIcon, ScuLink, ScuNavBar, ScuNavBarAction, ScuTopBar} from "../index";
import {Route} from "react-router-dom";
import Home from "./Home";
import CityList from "./CityList";
import CountryList from "./CountryList";
import ProfilePage from "./ProfilePage";

class Header extends React.Component<any, Profile> {
  state: Profile = {
    profile: {
      name: "",
      picture: "",
      email: undefined
    },
  };

  componentDidMount() {
    const {userProfile, getProfile, isAuthenticated} = this.props.auth;
    if (isAuthenticated()) {
      if (!userProfile) {
        getProfile((err: any, profile: any) => {
          this.setState({profile});
        });
      } else {
        this.setState({profile: userProfile});
      }
    }
  }

  login = () => {
    this.props.auth.login();
  };

  logOut = () => {
    this.props.auth.logout();
  };


  render() {
    const {isAuthenticated} = this.props.auth;
    return (
      <div>
        <ScuTopBar class="app-title" label="REACT WEATHER APP" display-mode="fixed" scu-theme="schwarz">
          <div slot="top-bar-right">
            {isAuthenticated() &&
            <div>
                <ScuIcon icon="user-topbar" size={24} />
                <ScuFlyOut type="top-bar" label={`Hi, ${this.state.profile.name}`}>
                    <ScuLink class="profile-link" mode="sidebar" href="/profile">My Profile
                    </ScuLink>
                    <ScuLink mode="sidebar" onClick={this.logOut}>LOG OUT
                    </ScuLink>
                </ScuFlyOut>
            </div>
            }

            {!isAuthenticated() &&
            <div>
                <ScuLink mode="nav-bar" className="log-in"
                         onClick={this.login}
                >LOG IN
                </ScuLink>
            </div>
            }
          </div>
          <ScuNavBar slot="nav-bar">
            <div slot="sidebar-header">
              <ScuHeadline element="h3">REACT WEATHER APP</ScuHeadline>
            </div>
            <div slot="actions">
              <ScuNavBarAction
                class="home-link"
                label="HOME"
                href="/home"
              />
              <ScuNavBarAction
                disabled={!isAuthenticated()}
                class="countries-link"
                label="COUNTRIES"
                active
                href="/country-list"
              />
            </div>
            <div slot="secondary">
              {isAuthenticated() &&
              <div>
                  <ScuLink id="profile-link" mode="sidebar" href="/profile">My Profile
                  </ScuLink>
                  <ScuLink className="log-out" mode="sidebar" onClick={this.logOut}>LOG OUT
                  </ScuLink>
              </div>
              }
              {!isAuthenticated() &&
              <div>
                  <ScuLink
                      class="log-in-secondary"
                      mode="nav-bar" onClick={this.login}
                  >LOG IN
                  </ScuLink>
              </div>
              }
            </div>
          </ScuNavBar>
        </ScuTopBar>
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

export default Header;
