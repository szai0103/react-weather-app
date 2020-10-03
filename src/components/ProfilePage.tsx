import React, {Component} from "react";
import {ScuHeadline} from "../index";
import {Profile} from "../models/profile";

class ProfilePage extends Component<any, Profile> {
  state: Profile = {
    profile: {
      name: "",
      picture: "",
      email: undefined
    }
  };

  componentDidMount() {
    const {userProfile, getProfile} = this.props.auth;
    if (!userProfile) {
      getProfile((err: any, profile: any) => {
        this.setState({profile});
      });
    } else {
      this.setState({profile: userProfile});
    }
  }

  render() {
    return (
      <div className="user-profile">
        <ScuHeadline id="details-title" element="h2"
        >Your User Details:
        </ScuHeadline
        >
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img src={this.state.profile.picture} alt="No image available" />
        <ScuHeadline id="name" element="h3"
        >Name: {this.state.profile.name}
        </ScuHeadline>
        <ScuHeadline id="email" element="h3"
        >Email: {this.state.profile.email}
        </ScuHeadline>
      </div>

    );
  }
}

export default ProfilePage;
