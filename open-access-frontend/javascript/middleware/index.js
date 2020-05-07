import { ActionTypes, ActionCreators } from "../actions";
import axios from "axios";

import apolloClient from "../apollo";
import { gql } from "@apollo/client";
import { parse, print } from "graphql";

const GET_USER_INFO_QUERY = `
  query UserInfo($username: String!) {
    user(username: $username) {
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
        liked
        disliked
      }
      hasMoreVideos
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
        liked
        disliked
      }
      hasMoreImages
      notes {
        _id
        user {
          username
          profilePic
        }
        commentCount
        body
        uploadedAt
        liked
        disliked
      }
      hasMoreNotes
    }
  }
`;

const GET_VIDEO_INFO_QUERY = `
  query VideoInfo($videoId: String!) {
    video(id: $videoId) {
      user {
        profilePic
        username
      }
      comments {
        _id
        user {
          username
          profilePic
        }
        body
        createdAt
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
      liked
      disliked
    }
  }
`;

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

        const { username } = action.payload;

        let cachedQ = apolloClient.readQuery({
          query: parse(GET_USER_INFO_QUERY),
          variables: { username },
        });

        if (cachedQ)
          return next(ActionCreators.getUserInfoSuccess({ ...cachedQ.user }));

        axios
          .post("api", {
            query: GET_USER_INFO_QUERY,
            variables: {
              username,
            },
          })
          .then((res) => {
            const userData = res.data.data;

            apolloClient.writeQuery({
              query: parse(GET_USER_INFO_QUERY),
              variables: { username },
              data: { ...userData },
            });
            next(ActionCreators.getUserInfoSuccess(userData.user));
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
        next(ActionCreators.videoLoading());

        const { videoId } = action.payload;

        cachedQ = apolloClient.readQuery({
          query: parse(GET_VIDEO_INFO_QUERY),
          variables: { id: videoId },
        });
        if (cachedQ)
          return next(ActionCreators.getVideoInfoSuccess({ ...cachedQ.video }));

        axios
          .post("api", {
            query: GET_VIDEO_INFO_QUERY,
            variables: {
              videoId,
            },
          })
          .then((res) => {
            const videoData = res.data.data;

            apolloClient.writeQuery({
              query: parse(GET_VIDEO_INFO_QUERY),
              variables: { id: videoId },
              data: { ...videoData },
            });
            next(ActionCreators.getVideoInfoSuccess(videoData.video));
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
      case ActionTypes.POST_VIDEO_COMMENT_START:
        axios
          .post("/api", {
            query: `
            mutation {
              commentVideo(id:"${action.payload.videoId}",body:"${action.payload.body}")
            }
          `,
          })
          .then((res) => {
            if (res.data.data.commentVideo)
              next(
                ActionCreators.postVideoCommentSuccess(
                  res.data.data.commentVideo,
                  action.payload.body,
                  store.getState().user.username,
                  store.getState().user.profilePic
                )
              );
            else next(ActionCreators.postVideoCommentError());
          });
        break;
      case ActionTypes.LOAD_USER_VIDEO_PAGE_START:
        axios
          .post("/api", {
            query: `
            {
              videoSearch(username:"${action.payload.username}", page:${action.payload.page}) {
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
                  liked
                  disliked
                }
                hasMore
              }
            }
          `,
          })
          .then((res) => {
            const { videos, hasMore } = res.data.data.videoSearch;
            next(ActionCreators.loadUserVideoPageSuccess(videos, hasMore));
          })
          .catch((error) => {
            next(ActionCreators.loadUserVideoPageError(error));
          });
        break;
      case ActionTypes.LOAD_USER_IMAGE_PAGE_START:
        axios
          .post("/api", {
            query: `
            {
              imageSearch(username:"${action.payload.username}", page:${action.payload.page}) {
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
                  liked
                  disliked
                }
                hasMore
              }
            }
          `,
          })
          .then((res) => {
            const { images, hasMore } = res.data.data.imageSearch;
            next(ActionCreators.loadUserImagePageSuccess(images, hasMore));
          })
          .catch((error) => {
            next(ActionCreators.loadUserImagePageError(error));
          });
        break;
      case ActionTypes.LOAD_USER_NOTE_PAGE_START:
        axios
          .post("/api", {
            query: `
            {
              noteSearch(username:"${action.payload.username}", page:${action.payload.page}) {
                notes {
                  _id
                  user {
                    username
                    profilePic
                  }
                  commentCount
                  body
                  uploadedAt
                  liked
                  disliked
                }
                hasMore
              }
            }
          `,
          })
          .then((res) => {
            const { notes, hasMore } = res.data.data.noteSearch;
            next(ActionCreators.loadUserNotePageSuccess(notes, hasMore));
          })
          .catch((error) => {
            next(ActionCreators.loadUserNotePageError(error));
          });
        break;
      case ActionTypes.GET_IMAGE_INFO_START:
        next(ActionCreators.imageLoading());
        axios
          .post("api", {
            query: `
              {
                image(id:"${action.payload.imageId}") {
                  user {
                    profilePic
                    username
                  }
                  comments {
                    _id
                    user {
                      username
                      profilePic
                    }
                    body
                    createdAt
                  }
                  title
                  caption
                  url
                  likeCount
                  dislikeCount
                  commentCount
                  uploadedAt
                  liked
                  disliked
                }
              }
            `,
          })
          .then((res) => {
            next(ActionCreators.getImageInfoSuccess(res.data.data.image));
          });
        break;
      case ActionTypes.POST_IMAGE_COMMENT_START:
        axios
          .post("/api", {
            query: `
              mutation {
                commentImage(id:"${action.payload.imageId}",body:"${action.payload.body}")
              }
            `,
          })
          .then((res) => {
            if (res.data.data.commentImage)
              next(
                ActionCreators.postImageCommentSuccess(
                  res.data.data.commentImage,
                  action.payload.body,
                  store.getState().user.username,
                  store.getState().user.profilePic
                )
              );
            else next(ActionCreators.postImageCommentError());
          });
        break;
      case ActionTypes.GET_NOTE_INFO_START:
        next(ActionCreators.noteLoading());
        axios
          .post("api", {
            query: `
              {
                note(id:"${action.payload.noteId}") {
                  user {
                    profilePic
                    username
                  }
                  comments {
                    _id
                    user {
                      username
                      profilePic
                    }
                    body
                    createdAt
                  }
                  body      
                  likeCount
                  dislikeCount
                  commentCount            
                  uploadedAt
                  liked
                  disliked
                }
              }
            `,
          })
          .then((res) => {
            next(ActionCreators.getNoteInfoSuccess(res.data.data.note));
          });
        break;
      case ActionTypes.POST_NOTE_COMMENT_START:
        axios
          .post("/api", {
            query: `
            mutation {
              commentNote(id:"${action.payload.noteId}",body:"${action.payload.body}")
            }
          `,
          })
          .then((res) => {
            if (res.data.data.commentNote)
              next(
                ActionCreators.postNoteCommentSuccess(
                  res.data.data.commentNote,
                  action.payload.body,
                  store.getState().user.username,
                  store.getState().user.profilePic
                )
              );
            else next(ActionCreators.postNoteCommentError());
          });
        break;
      default:
        next(action);
        break;
    }
  },
];
