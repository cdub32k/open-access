import { ActionTypes, ActionCreators } from "../actions";
import axios from "axios";

import apolloCache from "../apollo";
import { parse } from "graphql";

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

const GET_IMAGE_INFO_QUERY = `
  query ImageInfo($imageId: String!){
    image(id: $imageId) {
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
`;

const GET_NOTE_INFO_QUERY = `
  query NoteInfo($noteId: String!) {
    note(id: $noteId) {
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
`;

const USER_VIDEO_PAGE_QUERY = `
  query UserVideoPage($username: String!, $page: Int!){
    videoSearch(username: $username, page: $page) {
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
`;

const USER_IMAGE_PAGE_QUERY = `
  query UserImagePage($username: String!, $page: Int!) {
    imageSearch(username: $username, page: $page) {
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
`;

const USER_NOTE_PAGE_QUERY = `
  query UserNotePage($username: String!, $page: Int!) {
    noteSearch(username: $username, page: $page) {
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
`;

export default [
  (store) => (next) => (action) => {
    next(ActionCreators.clearErrors());

    if (action.type == ActionTypes.LOGIN_START) {
      axios
        .post("auth/login", action.payload.credentials)
        .then((res) => {
          if (res.data.auth) next(ActionCreators.loginSuccess(res.data.token));
          else throw new Error("authentication failed!");
        })
        .catch((err) => next(ActionCreators.loginError(err)));
    } else if (action.type == ActionTypes.SIGN_UP_START) {
      axios
        .post("auth/sign-up", action.payload.userInfo)
        .then((res) => {
          if (res.data.auth) next(ActionCreators.loginSuccess(res.data.token));
          else throw new Error("sign up failed!");
        })
        .catch((err) => next(ActionCreators.signupError(err)));
    } else if (action.type == ActionTypes.GET_USER_INFO_START) {
      next(ActionCreators.userInfoLoading());

      const { username } = action.payload;

      const cachedQ = apolloCache.readQuery({
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

          apolloCache.writeQuery({
            query: parse(GET_USER_INFO_QUERY),
            variables: { username },
            data: { ...userData },
          });
          next(ActionCreators.getUserInfoSuccess(userData.user));
        })
        .catch((err) => next(ActionCreators.getUserInfoError(err)));
    } else if (action.type == ActionTypes.GET_USER_ACCOUNT_INFO_START) {
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
    } else if (action.type == ActionTypes.UPDATE_ACCOUNT_INFO_START) {
      axios
        .put("/users", action.payload.userInfo)
        .then((res) => {
          next(ActionCreators.updateAccountInfoSuccess(res.data.user));
        })
        .catch((err) => next(ActionCreators.updateAccountInfoError(err)));
    } else if (action.type == ActionTypes.LIKE_NOTE_START) {
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
    } else if (action.type == ActionTypes.DISLIKE_NOTE_START) {
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
    } else if (action.type == ActionTypes.LIKE_IMAGE_START) {
      axios
        .post("/api", {
          query: `
            mutation {
              likeImage(id:"${action.payload.imageId}")
            }
          `,
        })
        .then((res) => {
          if (res.data.data.likeImage) next(ActionCreators.likeImageSuccess());
          else next(ActionCreators.likeImageError());
        });
    } else if (action.type == ActionTypes.DISLIKE_IMAGE_START) {
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
    } else if (action.type == ActionTypes.GET_VIDEO_INFO_START) {
      next(ActionCreators.videoLoading());

      const { videoId } = action.payload;

      const cachedQ = apolloCache.readQuery({
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

          apolloCache.writeQuery({
            query: parse(GET_VIDEO_INFO_QUERY),
            variables: { id: videoId },
            data: { ...videoData },
          });
          next(ActionCreators.getVideoInfoSuccess(videoData.video));
        });
    } else if (action.type == ActionTypes.RECORD_VIDEO_VIEW_START) {
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
    } else if (action.type == ActionTypes.LIKE_VIDEO_START) {
      axios
        .post("/api", {
          query: `
          mutation {
            likeVideo(id:"${action.payload.videoId}")
          }
        `,
        })
        .then((res) => {
          if (res.data.data.likeVideo) next(ActionCreators.likeVideoSuccess());
          else next(ActionCreators.likeVideoError());
        });
    } else if (action.type == ActionTypes.DISLIKE_VIDEO_START) {
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
    } else if (action.type == ActionTypes.POST_VIDEO_COMMENT_START) {
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
    } else if (action.type == ActionTypes.LOAD_USER_VIDEO_PAGE_START) {
      const { username, page } = action.payload;

      const cachedQ = apolloCache.readQuery({
        query: parse(USER_VIDEO_PAGE_QUERY),
        variables: { username, page },
      });
      if (cachedQ)
        return next(
          ActionCreators.loadUserVideoPageSuccess(
            cachedQ.videoSearch.videos,
            cachedQ.videoSearch.hasMore
          )
        );

      axios
        .post("/api", {
          query: USER_VIDEO_PAGE_QUERY,
          variables: { username, page },
        })
        .then((res) => {
          const videoData = res.data.data;

          apolloCache.writeQuery({
            query: parse(USER_VIDEO_PAGE_QUERY),
            variables: { username, page },
            data: { ...videoData },
          });

          next(
            ActionCreators.loadUserVideoPageSuccess(
              videoData.videoSearch.videos,
              videoData.videoSearch.hasMore
            )
          );
        })
        .catch((error) => {
          next(ActionCreators.loadUserVideoPageError(error));
        });
    } else if (action.type == ActionTypes.LOAD_USER_IMAGE_PAGE_START) {
      const { username, page } = action.payload;

      const cachedQ = apolloCache.readQuery({
        query: parse(USER_IMAGE_PAGE_QUERY),
        variables: { username, page },
      });
      if (cachedQ)
        return next(
          ActionCreators.loadUserImagePageSuccess(
            cachedQ.imageSearch.images,
            cachedQ.imageSearch.hasMore
          )
        );

      axios
        .post("/api", {
          query: USER_IMAGE_PAGE_QUERY,
          variables: { username, page },
        })
        .then((res) => {
          const imageData = res.data.data;

          apolloCache.writeQuery({
            query: parse(USER_IMAGE_PAGE_QUERY),
            variables: { username, page },
            data: { ...imageData },
          });

          next(
            ActionCreators.loadUserImagePageSuccess(
              imageData.imageSearch.images,
              imageData.imageSearch.hasMore
            )
          );
        })
        .catch((error) => {
          next(ActionCreators.loadUserImagePageError(error));
        });
    } else if (action.type == ActionTypes.LOAD_USER_NOTE_PAGE_START) {
      const { username, page } = action.payload;

      const cachedQ = apolloCache.readQuery({
        query: parse(USER_NOTE_PAGE_QUERY),
        variables: { username, page },
      });
      if (cachedQ)
        return next(
          ActionCreators.loadUserNotePageSuccess(
            cachedQ.noteSearch.notes,
            cachedQ.noteSearch.hasMore
          )
        );

      axios
        .post("/api", {
          query: USER_NOTE_PAGE_QUERY,
          variables: { username, page },
        })
        .then((res) => {
          const noteData = res.data.data;

          apolloCache.writeQuery({
            query: parse(USER_NOTE_PAGE_QUERY),
            variables: { username, page },
            data: { ...noteData },
          });

          next(
            ActionCreators.loadUserNotePageSuccess(
              noteData.noteSearch.notes,
              noteData.noteSearch.hasMore
            )
          );
        })
        .catch((error) => {
          next(ActionCreators.loadUserNotePageError(error));
        });
    } else if (action.type == ActionTypes.GET_IMAGE_INFO_START) {
      next(ActionCreators.imageLoading());

      const { imageId } = action.payload;

      const cachedQ = apolloCache.readQuery({
        query: parse(GET_IMAGE_INFO_QUERY),
        variables: { imageId },
      });

      if (cachedQ)
        return next(ActionCreators.getImageInfoSuccess({ ...cachedQ.image }));

      axios
        .post("api", {
          query: GET_IMAGE_INFO_QUERY,
          variables: { imageId },
        })
        .then((res) => {
          const imageData = res.data.data;

          apolloCache.writeQuery({
            query: parse(GET_IMAGE_INFO_QUERY),
            variables: { imageId },
            data: { ...imageData },
          });

          next(ActionCreators.getImageInfoSuccess(imageData.image));
        });
    } else if (action.type == ActionTypes.POST_IMAGE_COMMENT_START) {
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
    } else if (action.type == ActionTypes.GET_NOTE_INFO_START) {
      next(ActionCreators.noteLoading());

      const { noteId } = action.payload;

      const cachedQ = apolloCache.readQuery({
        query: parse(GET_NOTE_INFO_QUERY),
        variables: { noteId },
      });

      if (cachedQ)
        return next(ActionCreators.getNoteInfoSuccess({ ...cachedQ.note }));

      axios
        .post("api", {
          query: GET_NOTE_INFO_QUERY,
          variables: { noteId },
        })
        .then((res) => {
          const noteData = res.data.data;

          apolloCache.writeQuery({
            query: parse(GET_NOTE_INFO_QUERY),
            variables: { noteId },
            data: { ...noteData },
          });

          next(ActionCreators.getNoteInfoSuccess(noteData.note));
        });
    } else if (action.type == ActionTypes.POST_NOTE_COMMENT_START) {
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
    } else next(action);
  },
];
