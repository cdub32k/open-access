import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import axios from "axios";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

class NoteUploader extends Component {
  state = {
    noteBody: "",
    goToProfile: false,
  };

  constructor(props) {
    super(props);
  }

  updateBody = (event) => {
    this.setState({
      noteBody: event.target.value,
    });
  };

  onSubmitHandler = () => {
    axios
      .post("/api", {
        query: `
      mutation {
        postNote(body:"${this.state.noteBody}") {
          body
        }
      }
    `,
      })
      .then((res) => {
        if (res.data.data.postNote)
          this.setState({
            goToProfile: true,
          });
      });
  };

  render() {
    if (this.state.goToProfile)
      return <Redirect to={`/profile/${this.props.username}`} />;

    const { body } = this.state;
    return (
      <div>
        <Typography color="primary" variant="h3">
          Post Note
        </Typography>
        <form onSubmit={this.onSubmitHandler} style={{ marginTop: 48 }}>
          <CustomInput
            value={body}
            onChange={this.updateBody}
            multiline={true}
            rows={3}
          />
          <CustomButton text="Post" onClick={this.onSubmitHandler} />
        </form>
      </div>
    );
  }
}

const styles = (theme) => ({
  form: {
    display: "flex",
    maxWidth: 1450,
    justifyContent: "space-between",
    margin: "auto",
  },
});

const mapStateToProps = (state) => ({
  username: state.user.username,
});

export default withStyles(styles)(connect(mapStateToProps)(NoteUploader));
