import { ActionTypes, ActionCreators } from "../actions";
import axios from "axios";

export default [
  (store) => (next) => (action) => {
    next(ActionCreators.clearErrors());
    switch (action.type) {
      case ActionTypes.LOGIN_START:
        axios
          .post("auth/login", action.payload.credentials)
          .then((res) => {
            if (res.data.auth)
              next(ActionCreators.loginSuccess(res.data.token));
            else throw new Error("authentication failed!");
          })
          .catch((err) => next(ActionCreators.loginError(err)));
        break;
      case ActionTypes.SIGN_UP_START:
        axios
          .post("auth/sign-up", action.payload.userInfo)
          .then((res) => {
            if (res.data.auth)
              next(ActionCreators.loginSuccess(res.data.token));
            else throw new Error("sign up failed!");
          })
          .catch((err) => next(ActionCreators.signupError(err)));
        break;
      case ActionTypes.GET_USER_INFO_START:
        axios
          .post("api", {
            query: `
              {
                user(username:"${action.payload.username}") {
                  videos {
                    _id
                    title
                    views
                    thumbUrl
                  }
                }
              }
            `,
          })
          .then((res) => {
            next(ActionCreators.getUserInfoSuccess(res.data.data.user));
          })
          .catch((err) => next(ActionCreators.getUserInfoError(err)));
        break;
      case ActionTypes.GET_VIDEO_INFO_START:
        axios
          .post("api", {
            query: `
              {
                video(id:"${action.payload.videoId}") {
                  title
                  caption
                  views
                  url
                  thumbUrl
                  uploadedAt
                }
              }
            `,
          })
          .then((res) => {
            next(ActionCreators.getVideoInfoSuccess(res.data.data.video));
          });
        break;
      default:
        next(action);
        break;
    }
  },
];
