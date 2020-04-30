import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "axios";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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

  onSubmitHandler = (e) => {};

  render() {
    const { username, email } = this.props;
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
          <TextField name="country" onChange={this.onTextChange} />
          <TextField name="city" onChange={this.onTextChange} />
          <TextField name="state" onChange={this.onTextChange} />
          <TextField name="bio" onChange={this.onTextChange} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profilePic: state.user.profilePic,
  username: state.user.username,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
