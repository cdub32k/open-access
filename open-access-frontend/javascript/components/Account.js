import React, { Component, Fragment, createRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

import ReactCrop from "react-image-crop";
import "react-image-crop/lib/ReactCrop.scss";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      croppedImage: null,
      imageSrc: null,
      crop: {
        width: 300,
        height: 300,
        aspect: 1 / 1,
      },
      editInfo: false,
    };

    this.imageInput = createRef();
  }

  componentDidMount() {
    this.props.getUserAccountInfo(this.props.username);
  }

  uploadImage = (e) => {
    this.imageInput.current.click();
  };

  imageHandler = (e) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ imageSrc: fileReader.result });
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onCropComplete = (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = this.getCroppedImg(this.imageRef, crop);
      this.setState({ croppedImageUrl });
    }
  };

  getCroppedImg(image, crop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const reader = new FileReader();
    canvas.toBlob((blob) => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.dataURLtoFile(reader.result, "cropped.jpg");
      };
    });
  }

  dataURLtoFile(dataUrl, filename) {
    let arr = dataUrl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    this.setState({ croppedImage });
  }

  uploadProfilePic = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", this.state.croppedImage);

    axios.post("/images/profile/upload", data).then((res) => {
      this.setState({
        imageSrc: null,
        croppedImage: null,
      });
    });
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

  editInfo = () => {
    this.setState({
      displayName: this.props.displayName,
      email: this.props.email,
      phoneNumber: this.props.phoneNumber,
      country: this.props.country,
      city: this.props.city,
      state: this.props.state,
      bio: this.props.bio,
      editInfo: true,
    });
  };

  render() {
    const {
      profilePic,
      username,
      email,
      country,
      state,
      city,
      phoneNumber,
      displayName,
      bio,
      classes,
    } = this.props;

    const { imageSrc, crop, editInfo } = this.state;

    return (
      <div className={classes.container}>
        <Typography variant="h3" color="primary">
          Your Account
        </Typography>
        <br />
        <div>
          <form
            onSubmit={this.uploadProfilePic}
            style={{
              marginBottom: 32,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormGroup>
              {!imageSrc && (
                <Fragment>
                  <Avatar src={profilePic} className={classes.large} />
                  <input
                    hidden
                    ref={this.imageInput}
                    type="file"
                    name="image"
                    onChange={this.imageHandler}
                    accept="image/*"
                  />
                  <CustomButton
                    style={{ margin: "12px 0" }}
                    text="Change profile picture"
                    onClick={this.uploadImage}
                    size="small"
                  />
                </Fragment>
              )}
              {imageSrc && (
                <Fragment>
                  <ReactCrop
                    src={imageSrc}
                    crop={crop}
                    minHeight={300}
                    minWidth={300}
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                  <div style={{ display: "flex" }}>
                    <CustomButton
                      style={{ margin: "12px" }}
                      text="Save"
                      onClick={this.uploadProfilePic}
                      size="small"
                    />
                    <CustomButton
                      style={{ margin: "12px 0" }}
                      text="Cancel"
                      onClick={() =>
                        this.setState({ imageSrc: null, croppedImage: null })
                      }
                      size="small"
                    />
                  </div>
                </Fragment>
              )}
            </FormGroup>
          </form>
        </div>
        <Grid className={classes.sectionsContainer} container>
          <Grid className={classes.section} item xs={12} md={6}>
            {!editInfo && (
              <Fragment>
                <Typography variant="body1">
                  <b>Display name:</b> {displayName}
                </Typography>
                <Typography variant="body1">
                  <b>Email:</b> {email}
                </Typography>
                <Typography variant="body1">
                  <b>Phone Number:</b> {phoneNumber}
                </Typography>
                <Typography variant="body1">
                  <b>Country:</b> {country}
                </Typography>
                <Typography variant="body1">
                  <b>City:</b> {city}
                </Typography>
                <Typography variant="body1">
                  <b>State:</b> {state}
                </Typography>
                <Typography variant="body1">
                  <b>Bio:</b> {bio}
                </Typography>
                <a onClick={this.editInfo}>edit</a>
              </Fragment>
            )}
            {editInfo && (
              <form onSubmit={this.onSubmitHandler}>
                <div className={classes.inputContainer}>
                  <CustomInput
                    label="Display Name"
                    name="displayName"
                    placeholder={displayName || ""}
                    value={displayName}
                    onChange={this.onTextChange}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <CustomInput
                    label="Email"
                    name="email"
                    placeholder={email || ""}
                    value={email}
                    onChange={this.onTextChange}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <CustomInput
                    label="Phone Number"
                    name="phoneNumber"
                    placeholder={phoneNumber || ""}
                    value={phoneNumber}
                    onChange={this.onTextChange}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <CustomInput
                    label="Country"
                    name="country"
                    placeholder={country || ""}
                    value={country}
                    onChange={this.onTextChange}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <CustomInput
                    placeholder={city}
                    label="City"
                    name="city"
                    placeholder={city || ""}
                    value={city}
                    onChange={this.onTextChange}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <CustomInput
                    label="State"
                    name="state"
                    placeholder={state || ""}
                    value={state}
                    onChange={this.onTextChange}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <CustomInput
                    label="Bio"
                    value={bio}
                    name="bio"
                    placeholder={bio || ""}
                    multiline={true}
                    rows={3}
                    onChange={this.onTextChange}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <CustomButton
                    style={{ marginTop: 32, marginLeft: 0 }}
                    type="submit"
                    text="Update Info"
                  />
                  <CustomButton
                    style={{ marginTop: 32, marginLeft: 0 }}
                    onClick={() => this.setState({ editInfo: false })}
                    text="Cancel"
                  />
                </div>
              </form>
            )}
          </Grid>
          <Grid className={classes.section} item xs={12} md={6}>
            <Link to={"/payment"}>Payment Info</Link>
          </Grid>
        </Grid>
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

const styles = (theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sectionsContainer: {
    maxWidth: 800,
  },
  section: {
    padding: "0 24px",
    marginBottom: 54,
    maxWidth: 400,
  },
  large: {
    width: 200,
    height: 200,
    border: `4px solid ${theme.palette.secondary.main}`,
    marginBottom: 12,
  },
  ...theme.globalClasses,
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
