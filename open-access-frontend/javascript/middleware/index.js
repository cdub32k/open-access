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
        next(ActionCreators.userInfoLoading());

        axios
          .post("api", {
            query: `
              {
                user(username:"${action.payload.username}") {
                  username
                  profilePic
                  displayName
                  bio
                  country
                  city
                  state
                  joinedAt
                  videos {
                    _id
                    user {
                      username
                      profilePic
                    }
                    title
                    viewCount
                    thumbUrl
                    uploadedAt
                  }
                  images {
                    _id
                    user {
                      username
                      profilePic
                    }
                    title
                    likeCount
                    url
                    uploadedAt
                  }
                  notes {
                    _id
                    user {
                      username
                      profilePic
                    }
                    commentCount
                    body
                    uploadedAt
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
      case ActionTypes.GET_USER_ACCOUNT_INFO_START:
        axios
          .post("/api", {
            query: `
          {
            user(username:"${action.payload.username}") {
              profilePic
              email
              username
              displayName
              phoneNumber
              country
              state
              city
              bio
            }
          }
        `,
          })
          .then((res) => {
            next(ActionCreators.getUserAccountInfoSuccess(res.data.data.user));
          })
          .catch((err) => next(ActionCreators.getUserAccountInfoError(err)));
        break;
      case ActionTypes.UPDATE_ACCOUNT_INFO_START:
        axios
          .put("/users", action.payload.userInfo)
          .then((res) => {
            next(ActionCreators.updateAccountInfoSuccess(res.data.user));
          })
          .catch((err) => next(ActionCreators.updateAccountInfoError(err)));
        break;
      case ActionTypes.LIKE_NOTE_START:
        axios
          .post("/api", {
            query: `
                mutation {
                  likeNote(id:"${action.payload.noteId}")
                }
              `,
          })
          .then((res) => {
            if (res.data.data.likeNote) next(ActionCreators.likeNoteSuccess());
            else next(ActionCreators.likeNoteError());
          });
        break;
      case ActionTypes.DISLIKE_NOTE_START:
        axios
          .post("/api", {
            query: `
                mutation {
                  dislikeNote(id:"${action.payload.noteId}")
                }
              `,
          })
          .then((res) => {
            if (res.data.data.dislikeNote)
              next(ActionCreators.dislikeNoteSuccess());
            else next(ActionCreators.dislikeNoteError());
          });
        break;
      case ActionTypes.LIKE_IMAGE_START:
        axios
          .post("/api", {
            query: `
                mutation {
                  likeImage(id:"${action.payload.imageId}")
                }
              `,
          })
          .then((res) => {
            if (res.data.data.likeImage)
              next(ActionCreators.likeImageSuccess());
            else next(ActionCreators.likeImageError());
          });
        break;
      case ActionTypes.DISLIKE_IMAGE_START:
        axios
          .post("/api", {
            query: `
                mutation {
                  dislikeImage(id:"${action.payload.imageId}")
                }
              `,
          })
          .then((res) => {
            if (res.data.data.dislikeImage)
              next(ActionCreators.dislikeImageSuccess());
            else next(ActionCreators.dislikeImageError());
          });
        break;
      case ActionTypes.GET_VIDEO_INFO_START:
        axios
          .post("api", {
            query: `
              {
                video(id:"${action.payload.videoId}") {
                  user {
                    profilePic
                    username
                  }
                  title
                  caption
                  viewCount
                  likeCount
                  dislikeCount
                  commentCount
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
      case ActionTypes.RECORD_VIDEO_VIEW_START:
        axios
          .post("/api", {
            query: `
              mutation {
                viewVideo(id:"${action.payload.videoId}")
              }
            `,
          })
          .then((res) => {
            if (res.data.data.viewVideo)
              next(ActionCreators.recordVideoViewSuccess());
            else next(ActionCreators.recordVideoViewError());
          });
        break;
      case ActionTypes.LIKE_VIDEO_START:
        axios
          .post("/api", {
            query: `
              mutation {
                likeVideo(id:"${action.payload.videoId}")
              }
            `,
          })
          .then((res) => {
            if (res.data.data.likeVideo)
              next(ActionCreators.likeVideoSuccess());
            else next(ActionCreators.likeVideoError());
          });
        break;
      case ActionTypes.DISLIKE_VIDEO_START:
        axios
          .post("/api", {
            query: `
              mutation {
                dislikeVideo(id:"${action.payload.videoId}")
              }
            `,
          })
          .then((res) => {
            if (res.data.data.dislikeVideo)
              next(ActionCreators.dislikeVideoSuccess());
            else next(ActionCreators.dislikeVideoError());
          });
        break;
      case ActionTypes.GET_IMAGE_INFO_START:
        axios
          .post("api", {
            query: `
              {
                image(id:"${action.payload.imageId}") {
                  user {
                    profilePic
                    username
                  }
                  title
                  caption
                  url
                  likeCount
                  dislikeCount
                  commentCount
                  uploadedAt
                }
              }
            `,
          })
          .then((res) => {
            next(ActionCreators.getImageInfoSuccess(res.data.data.image));
          });
        break;
      case ActionTypes.GET_NOTE_INFO_START:
        axios
          .post("api", {
            query: `
              {
                note(id:"${action.payload.noteId}") {
                  user {
                    profilePic
                    username
                  }
                  body      
                  likeCount
                  dislikeCount
                  commentCount            
                  uploadedAt
                }
              }
            `,
          })
          .then((res) => {
            next(ActionCreators.getNoteInfoSuccess(res.data.data.note));
          });
        break;
      default:
        next(action);
        break;
    }
  },
];
