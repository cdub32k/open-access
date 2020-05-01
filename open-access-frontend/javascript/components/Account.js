import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import axios from "axios";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getUserAccountInfo(this.props.username);
  }

  imageHandler = (e) => {
    this.setState({ profilePic: e.target.files[0], loaded: 0 });
  };

  uploadProfilePic = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", this.state.profilePic);

    axios.post("/images/profile/upload", data).then((res) => {});
  };

  onTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    this.props.updateAccountInfo({ ...this.state, profilePic: undefined });
  };

  render() {
    const {
      username,
      email,
      country,
      state,
      city,
      phoneNumber,
      displayName,
      bio,
    } = this.props;
    return (
      <div>
        <h1>Your Account</h1>
        <br />
        <div>
          <form onSubmit={this.uploadProfilePic}>
            <input
              type="file"
              name="image"
              onChange={this.imageHandler}
              accept="image/*"
            />
            <Button type="submit">Upload</Button>
          </form>
        </div>

        <Typography>{username}</Typography>
        <Typography>{email}</Typography>
        <form onSubmit={this.onSubmitHandler}>
          <span>current:{displayName}</span>
          <TextField
            label="Display Name"
            name="displayName"
            onChange={this.onTextChange}
          />
          <br />
          <span>current:{phoneNumber}</span>
          <TextField
            label="Phone Number"
            name="phoneNumber"
            onChange={this.onTextChange}
          />
          <br />
          <span>current:{country}</span>
          <TextField
            label="Country"
            name="country"
            onChange={this.onTextChange}
          />
          <br />
          <span>current:{city}</span>
          <TextField
            placeholder={city}
            label="City"
            name="city"
            onChange={this.onTextChange}
          />
          <br />
          <span>current:{state}</span>
          <TextField label="State" name="state" onChange={this.onTextChange} />
          <br />
          <span>current:{bio}</span>
          <TextField label="Bio" name="bio" onChange={this.onTextChange} />
          <br />
          <Button type="submit">Update Info</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profilePic: state.user.profilePic,
  username: state.user.username,
  email: state.user.email,
  displayName: state.user.displayName,
  city: state.user.city,
  state: state.user.state,
  country: state.user.country,
  phoneNumber: state.user.phoneNumber,
  bio: state.user.bio,
});

const mapDispatchToProps = (dispatch) => ({
  getUserAccountInfo: (username) =>
    dispatch(ActionCreators.getUserAccountInfoStart(username)),
  updateAccountInfo: (userInfo) =>
    dispatch(ActionCreators.updateAccountInfoStart(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
