import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import axios from "axios";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 320,
  },
  form: {
    display: "flex",
    maxWidth: 1450,
    justifyContent: "space-between",
    margin: "auto",
  },
  input: {
    marginBottom: 24,
  },
  counter: {
    marginTop: 24,
    display: "inline-block",
  },
}));

const NoteUploader = ({ username }) => {
  const classes = useStyles();
  const [body, setBody] = useState("");
  const [goToProfile, setGoToProfile] = useState(false);

  const updateBody = (event) => {
    setBody(event.target.value);
  };

  const onSubmitHandler = () => {
    axios
      .post("/api", {
        query: `
      mutation {
        postNote(body:"${body}") {
          body
        }
      }
    `,
      })
      .then((res) => {
        if (res.data.data.postNote) setGoToProfile(true);
      });
  };

  if (goToProfile) return <Redirect to={`/profile/${username}`} />;

  return (
    <div className={classes.container}>
      <Typography color="primary" variant="h3">
        Post Note
      </Typography>
      <Typography className={classes.counter} variant="caption">
        {body.length} / 420 chars
      </Typography>
      <form onSubmit={onSubmitHandler}>
        <CustomInput
          className={classes.input}
          value={body}
          onChange={updateBody}
          multiline={true}
          rows={3}
          inputProps={{ maxLength: 420 }}
        />
        <CustomButton text="Post" onClick={onSubmitHandler} />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.user.username,
});

export default connect(mapStateToProps)(NoteUploader);
