import { ActionTypes, ActionCreators } from "../actions";
import axios from "axios";
axios.defaults.baseURL = process.env.API_URL;
axios.interceptors.response.use(
  (response) => {
    if (response.headers && response.headers["x-token"]) {
      localStorage.setItem(
        "open-access-api-token",
        response.headers["x-token"]
      );
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.headers["x-token"]}`;
    }
    if (response.headers && response.headers["x-refresh-token"]) {
      localStorage.setItem(
        "open-access-api-refresh-token",
        response.headers["x-refresh-token"]
      );
      axios.defaults.headers.common["x-refresh-token"] =
        response.headers["x-refresh-token"];
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

import apolloCache from "../apollo";
import { parse } from "graphql";

const GET_USER_INFO_QUERY = `
  query UserInfo($username: String!) {
    user(username: $username) {
      active
      activeUntil
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
      comments {
        ... on VideoComment {
          _id
          video {
            title
            _id
            user {
              username
            }
          }
          replyId
          body
          createdAt
        }
        ... on ImageComment {
          _id
          image {
            title
            _id
            user {
              username
            }
          }
          body
          replyId
          createdAt
        }
        ... on NoteComment {
          _id
          note {
            _id
            user {
              username
            }
          }
          body
          replyId
          createdAt
        }
      },
      videoCount
      imageCount
      noteCount
      commentCount
    }
  }
`;

const GET_USER_PAYMENT_INFO_QUERY = `
  query UserPaymentInfo($username: String!) {
    user(username: $username) {
      charges {
        amount
        createdAt
        stripePaymentIntentId
      }
      subscriptions {
        amount
        terminated
        terminatedAt
        createdAt
      }
    }
  }
`;

const GET_VIDEO_INFO_QUERY = `
  query VideoInfo($videoId: String!, $cId: String) {
    video(id: $videoId, cId: $cId) {
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
        replyCount
        likeCount
        dislikeCount
        liked
        disliked
        highlighted
        replies
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
  query ImageInfo($imageId: String!, $cId: String){
    image(id: $imageId, cId: $cId) {
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
        replyCount
        likeCount
        dislikeCount
        liked
        disliked
        highlighted
        replies
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
  query NoteInfo($noteId: String!, $cId: String) {
    note(id: $noteId, cId: $cId) {
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
        replyCount
        likeCount
        dislikeCount
        liked
        disliked
        highlighted
        replies
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

const USER_COMMENTS_PAGE_QUERY = `
  query UserCommentPage($username: String!, $page: Int!) {
    commentsSearch(username: $username, page: $page) {
      comments {
        ... on VideoComment {
          _id
          video {
            title
            _id
            user {
              username
            }
          }
          replyId
          body
          createdAt
        }
        ... on ImageComment {
          _id
          image {
            title
            _id
            user {
              username
            }
          }
          body
          replyId
          createdAt
        }
        ... on NoteComment {
          _id
          note {
            _id
            user {
              username
            }
          }
          body
          replyId
          createdAt
        }
      }
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

const GET_USER_NOTIFICATIONS_QUERY = `
  query UserNotifications($username: String!) {
    user(username: $username) {
      active
      activeUntil
      notifications {
        _id
        type
        target
        targetId
        body
        sender
        read
        createdAt
      }
    }
  }
`;

const MARK_NOTIFICATIONS_READ_QUERY = `
  mutation MarkNotificationsRead($ids: [String]!) {
    markNotificationsRead(ids: $ids)
  }
`;

const GET_NEWSFEED_VIDEOS_QUERY = `
  query NewsfeedVideos($lastOldest: Date) {
    newsfeedVideos(lastOldest: $lastOldest) {
      _id
      user {
        username
        profilePic
      }
      uploadedAt
      likeCount
      dislikeCount
      commentCount
      thumbUrl
      title
      caption
    }
  }
`;
const GET_NEWSFEED_IMAGES_QUERY = `
  query NewsfeedImages($lastOldest: Date) {
    newsfeedImages(lastOldest: $lastOldest) {
      _id
      user {
        username
        profilePic
      }
      uploadedAt
      likeCount
      dislikeCount
      commentCount
      thumbUrl
    }
  }
`;
const GET_NEWSFEED_NOTES_QUERY = `
  query NewsfeedNotes($lastOldest: Date) {
    newsfeedNotes(lastOldest: $lastOldest) {
      _id
      user {
        username
        profilePic
      }
      uploadedAt
      likeCount
      dislikeCount
      commentCount
      body
    }
  }
`;

const LOAD_MORE_IMAGE_COMMENTS_QUERY = `
  query ImageInfo($imageId: String!, $lastOldest: Date) {
    image(id: $imageId) {
      comments(lastOldest: $lastOldest) {
        _id
        user {
          username
          profilePic
        }
        body
        createdAt
      }
    }
  }
`;
const LOAD_MORE_VIDEO_COMMENTS_QUERY = `
  query VideoInfo($videoId: String!, $lastOldest: Date) {
    video(id: $videoId) {
      comments(lastOldest: $lastOldest) {
        _id
        user {
          username
          profilePic
        }
        body
        createdAt
      }
    }
  }
`;
const LOAD_MORE_NOTE_COMMENTS_QUERY = `
  query NoteInfo($noteId: String!, $lastOldest: Date) {
    note(id: $noteId) {
      comments(lastOldest: $lastOldest) {
        _id
        user {
          username
          profilePic
        }
        body
        createdAt
      }
    }
  }
`;
const LOAD_VIDEO_COMMENT_REPLIES_QUERY = `
  query VideoCommentReplies($commentId: String!) {
    videoCommentReplies(commentId:$commentId) {
      _id
        user {
          username
          profilePic
        }
        body
        createdAt
        replyCount
        replyId
        likeCount
        dislikeCount
        liked
        disliked
    }
  }
`;

const LOAD_IMAGE_COMMENT_REPLIES_QUERY = `
  query ImageCommentReplies($commentId: String!) {
    imageCommentReplies(commentId:$commentId) {
      _id
        user {
          username
          profilePic
        }
        body
        createdAt
        replyCount
        replyId
        likeCount
        dislikeCount
        liked
        disliked
    }
  }
`;
const LOAD_NOTE_COMMENT_REPLIES_QUERY = `
  query NoteCommentReplies($commentId: String!) {
    noteCommentReplies(commentId:$commentId) {
      _id
        user {
          username
          profilePic
        }
        body
        createdAt
        replyCount
        replyId
        likeCount
        dislikeCount
        liked
        disliked
    }
  }
`;
export default [
  (store) => (next) => (action) => {
    next(ActionCreators.clearErrors());
    if (action.type == ActionTypes.MARK_NOTIFICATIONS_READ_START) {
      axios
        .post("/api", {
          query: MARK_NOTIFICATIONS_READ_QUERY,
          variables: {
            ids: store.getState().user.notifications.map((notif) => notif._id),
          },
        })
        .then((res) => {
          if (res.data.data.markNotificationsRead)
            next(ActionCreators.markNotificationsReadSuccess());
          else next(ActionCreators.markNotificationsReadError());
        })
        .catch((err) => next(ActionCreators.markNotificationsReadError(err)));
    } else if (action.type == ActionTypes.LOGIN_START) {
      axios
        .post("auth/login", action.payload.credentials)
        .then((res) => {
          if (res.data.auth) {
            next(
              ActionCreators.loginSuccess(res.data.token, res.data.refreshToken)
            );

            axios
              .post("/api", {
                query: GET_USER_NOTIFICATIONS_QUERY,
                variables: { username: action.payload.credentials.username },
              })
              .then((res) => {
                next(
                  ActionCreators.getUserAccountInfoSuccess(res.data.data.user)
                );
              })
              .catch((err) =>
                next(ActionCreators.getUserAccountInfoError(err))
              );
          } else throw new Error("authentication failed!");
        })
        .catch((err) => next(ActionCreators.loginError(err)));
    } else if (action.type == ActionTypes.AUTO_LOGIN) {
      next(action);
      axios
        .post("/api", {
          query: GET_USER_NOTIFICATIONS_QUERY,
          variables: { username: action.payload.token.username },
        })
        .then((res) => {
          next(ActionCreators.getUserAccountInfoSuccess(res.data.data.user));
        })
        .catch((err) => next(ActionCreators.getUserAccountInfoError(err)));
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

      axios
        .post("api", {
          query: GET_USER_INFO_QUERY,
          variables: {
            username,
          },
        })
        .then((res) => {
          const userData = res.data.data;

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
      const { videoId, cId } = action.payload;

      axios
        .post("api", {
          query: GET_VIDEO_INFO_QUERY,
          variables: {
            videoId,
            cId,
          },
        })
        .then((res) => {
          const videoData = res.data.data;

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
            mutation CommentVideo($id:String!,$body:String!,$replyId:String) {
              commentVideo(id:$id,body:$body,replyId:$replyId)
            },
      `,
          variables: {
            id: action.payload.videoId,
            body: action.payload.body,
            replyId: action.payload.replyId,
          },
        })
        .then((res) => {});
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
    } else if (action.type == ActionTypes.LOAD_USER_COMMENTS_PAGE_START) {
      const { username, page } = action.payload;

      const cachedQ = apolloCache.readQuery({
        query: parse(USER_COMMENTS_PAGE_QUERY),
        variables: { username, page },
      });
      if (cachedQ)
        return next(
          ActionCreators.loadUserCommentsPageSuccess(
            cachedQ.commentsSearch.comments,
            cachedQ.commentsSearch.hasMore
          )
        );

      axios
        .post("/api", {
          query: USER_COMMENTS_PAGE_QUERY,
          variables: { username, page },
        })
        .then((res) => {
          const commentData = res.data.data;

          apolloCache.writeQuery({
            query: parse(USER_COMMENTS_PAGE_QUERY),
            variables: { username, page },
            data: { ...commentData },
          });

          next(
            ActionCreators.loadUserCommentsPageSuccess(
              commentData.commentsSearch.comments,
              commentData.commentsSearch.hasMore
            )
          );
        })
        .catch((error) => {
          next(ActionCreators.loadUserCommentsPageError(error));
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

      const { imageId, cId } = action.payload;

      axios
        .post("api", {
          query: GET_IMAGE_INFO_QUERY,
          variables: { imageId, cId },
        })
        .then((res) => {
          const imageData = res.data.data;

          next(ActionCreators.getImageInfoSuccess(imageData.image));
        });
    } else if (action.type == ActionTypes.POST_IMAGE_COMMENT_START) {
      axios
        .post("/api", {
          query: `
            mutation CommentImage($id:String!,$body:String!,$replyId:String)  {
              commentImage(id:$id,body:$body,replyId:$replyId)
            }
          `,
          variables: {
            id: action.payload.imageId,
            body: action.payload.body,
            replyId: action.payload.replyId,
          },
        })
        .then((res) => {});
    } else if (action.type == ActionTypes.GET_NOTE_INFO_START) {
      next(ActionCreators.noteLoading());

      const { noteId, cId } = action.payload;

      axios
        .post("api", {
          query: GET_NOTE_INFO_QUERY,
          variables: { noteId, cId },
        })
        .then((res) => {
          const noteData = res.data.data;

          next(ActionCreators.getNoteInfoSuccess(noteData.note));
        });
    } else if (action.type == ActionTypes.POST_NOTE_COMMENT_START) {
      axios
        .post("/api", {
          query: `
            mutation  CommentNote($id:String!,$body:String!,$replyId:String) {
              commentNote(id:$id,body:$body,replyId:$replyId)
            }
          `,
          variables: {
            id: action.payload.noteId,
            body: action.payload.body,
            replyId: action.payload.replyId,
          },
        })
        .then((res) => {});
    } else if (action.type == ActionTypes.LOAD_NEWSFEED_VIDEO_START) {
      axios
        .post("/api", {
          query: GET_NEWSFEED_VIDEOS_QUERY,
        })
        .then((res) => {
          const videoData = res.data.data;

          if (videoData.newsfeedVideos) {
            next(action);
            next(
              ActionCreators.loadNewsfeedVideoSuccess(videoData.newsfeedVideos)
            );
          }
        })
        .catch((error) => next(ActionCreators.loadNewsfeedVideoError(error)));
    } else if (action.type == ActionTypes.LOAD_NEWSFEED_IMAGES_START) {
      axios
        .post("/api", {
          query: GET_NEWSFEED_IMAGES_QUERY,
        })
        .then((res) => {
          const imageData = res.data.data;

          if (imageData.newsfeedImages) {
            next(action);
            next(
              ActionCreators.loadNewsfeedImagesSuccess(imageData.newsfeedImages)
            );
          }
        })
        .catch((error) => next(ActionCreators.loadNewsfeedVideoError(error)));
    } else if (action.type == ActionTypes.LOAD_NEWSFEED_NOTES_START) {
      axios
        .post("/api", {
          query: GET_NEWSFEED_NOTES_QUERY,
        })
        .then((res) => {
          const noteData = res.data.data;

          if (noteData.newsfeedNotes) {
            next(action);
            next(
              ActionCreators.loadNewsfeedNotesSuccess(noteData.newsfeedNotes)
            );
          }
        })
        .catch((error) => next(ActionCreators.loadNewsfeedNotesError(error)));
    } else if (action.type == ActionTypes.LOAD_MORE_NEWSFEED_VIDEO) {
      axios
        .post("/api", {
          query: GET_NEWSFEED_VIDEOS_QUERY,
          variables: {
            lastOldest: store.getState().user.newsfeed.videos.slice(-1)[0]
              .uploadedAt,
          },
        })
        .then((res) => {
          const videoData = res.data.data;

          if (videoData.newsfeedVideos) {
            next(action);
            next(
              ActionCreators.loadNewsfeedVideoSuccess(videoData.newsfeedVideos)
            );
          }
        })
        .catch((error) => next(ActionCreators.loadNewsfeedVideoError(error)));
    } else if (action.type == ActionTypes.LOAD_MORE_NEWSFEED_IMAGES) {
      axios
        .post("/api", {
          query: GET_NEWSFEED_IMAGES_QUERY,
          variables: {
            lastOldest: store.getState().user.newsfeed.images.slice(-1)[0]
              .uploadedAt,
          },
        })
        .then((res) => {
          const imageData = res.data.data;

          if (imageData.newsfeedImages) {
            next(action);
            next(
              ActionCreators.loadNewsfeedImagesSuccess(imageData.newsfeedImages)
            );
          }
        })
        .catch((error) => next(ActionCreators.loadNewsfeedImagesError(error)));
    } else if (action.type == ActionTypes.LOAD_MORE_NEWSFEED_NOTES) {
      axios
        .post("/api", {
          query: GET_NEWSFEED_NOTES_QUERY,
          variables: {
            lastOldest: store.getState().user.newsfeed.notes.slice(-1)[0]
              .uploadedAt,
          },
        })
        .then((res) => {
          const noteData = res.data.data;

          if (noteData.newsfeedNotes) {
            next(action);
            next(
              ActionCreators.loadNewsfeedNotesSuccess(noteData.newsfeedNotes)
            );
          }
        })
        .catch((error) => next(ActionCreators.loadNewsfeedNotesError(error)));
    } else if (action.type == ActionTypes.LOAD_USER_PAYMENT_INFO_START) {
      axios
        .post("/api", {
          query: GET_USER_PAYMENT_INFO_QUERY,
          variables: {
            username: store.getState().user.username,
          },
        })
        .then((res) => {
          const pData = res.data.data;

          if (pData)
            next(ActionCreators.loadUserPaymentInfoSuccess(pData.user));
          else next(ActionCreators.loadUserNotePageError());
        })
        .catch((error) => next(ActionCreators.loadUserNotePageError(error)));
    } else if (action.type == ActionTypes.LOAD_MORE_IMAGE_COMMENTS) {
      axios
        .post("api", {
          query: LOAD_MORE_IMAGE_COMMENTS_QUERY,
          variables: {
            imageId: action.payload.imageId,
            lastOldest: store.getState().image.comments.slice(-1)[0].createdAt,
          },
        })
        .then((res) => {
          const imageData = res.data.data;

          if (imageData && imageData.image && imageData.image.comments)
            next(
              ActionCreators.loadMoreCommentsSuccess(
                "image",
                imageData.image.comments
              )
            );
        });
    } else if (action.type == ActionTypes.LOAD_MORE_VIDEO_COMMENTS) {
      axios
        .post("api", {
          query: LOAD_MORE_VIDEO_COMMENTS_QUERY,
          variables: {
            videoId: action.payload.videoId,
            lastOldest: store.getState().video.comments.slice(-1)[0].createdAt,
          },
        })
        .then((res) => {
          const videoData = res.data.data;
          if (videoData && videoData.video && videoData.video.comments)
            next(
              ActionCreators.loadMoreCommentsSuccess(
                "video",
                videoData.video.comments
              )
            );
        });
    } else if (action.type == ActionTypes.LOAD_MORE_NOTE_COMMENTS) {
      axios
        .post("api", {
          query: LOAD_MORE_NOTE_COMMENTS_QUERY,
          variables: {
            noteId: action.payload.noteId,
            lastOldest: store.getState().note.comments.slice(-1)[0].createdAt,
          },
        })
        .then((res) => {
          const noteData = res.data.data;
          if (noteData && noteData.note && noteData.note.comments)
            next(
              ActionCreators.loadMoreCommentsSuccess(
                "note",
                noteData.note.comments
              )
            );
        });
    } else if (action.type == ActionTypes.GET_VIDEO_COMMENT_REPLIES) {
      axios
        .post("api", {
          query: LOAD_VIDEO_COMMENT_REPLIES_QUERY,
          variables: {
            commentId: action.payload._id,
          },
        })
        .then((res) => {
          const replyData = res.data.data.videoCommentReplies;
          next(
            ActionCreators.getCommentRepliesSuccess(
              "video",
              action.payload._id,
              replyData
            )
          );
        });
    } else if (action.type == ActionTypes.GET_IMAGE_COMMENT_REPLIES) {
      axios
        .post("api", {
          query: LOAD_IMAGE_COMMENT_REPLIES_QUERY,
          variables: {
            commentId: action.payload._id,
          },
        })
        .then((res) => {
          const replyData = res.data.data.imageCommentReplies;
          next(
            ActionCreators.getCommentRepliesSuccess(
              "image",
              action.payload._id,
              replyData
            )
          );
        });
    } else if (action.type == ActionTypes.GET_NOTE_COMMENT_REPLIES) {
      axios
        .post("api", {
          query: LOAD_NOTE_COMMENT_REPLIES_QUERY,
          variables: {
            commentId: action.payload._id,
          },
        })
        .then((res) => {
          const replyData = res.data.data.noteCommentReplies;
          next(
            ActionCreators.getCommentRepliesSuccess(
              "note",
              action.payload._id,
              replyData
            )
          );
        });
    } else if (action.type == ActionTypes.LIKE_VIDEO_COMMENT) {
      axios
        .post("/api", {
          query: `
            mutation {
              likeVideoComment(videoId:"${action.payload.mediaId}" , commentId:"${action.payload.commentId}")
            }
          `,
        })
        .then((res) => {
          if (res.data.data.likeVideoComment)
            next(
              ActionCreators.likeCommentSuccess(
                "video",
                action.payload.commentId
              )
            );
        });
    } else if (action.type == ActionTypes.DISLIKE_VIDEO_COMMENT) {
      axios
        .post("/api", {
          query: `
            mutation {
              dislikeVideoComment(videoId:"${action.payload.mediaId}" , commentId:"${action.payload.commentId}")
            }
          `,
        })
        .then((res) => {
          if (res.data.data.dislikeVideoComment)
            next(
              ActionCreators.dislikeCommentSuccess(
                "video",
                action.payload.commentId
              )
            );
        });
    } else if (action.type == ActionTypes.LIKE_IMAGE_COMMENT) {
      axios
        .post("/api", {
          query: `
            mutation {
              likeImageComment(imageId:"${action.payload.mediaId}" , commentId:"${action.payload.commentId}")
            }
          `,
        })
        .then((res) => {
          if (res.data.data.likeImageComment)
            next(
              ActionCreators.likeCommentSuccess(
                "image",
                action.payload.commentId
              )
            );
        });
    } else if (action.type == ActionTypes.DISLIKE_IMAGE_COMMENT) {
      axios
        .post("/api", {
          query: `
            mutation {
              dislikeImageComment(imageId:"${action.payload.mediaId}" , commentId:"${action.payload.commentId}")
            }
          `,
        })
        .then((res) => {
          if (res.data.data.dislikeImageComment)
            next(
              ActionCreators.dislikeCommentSuccess(
                "image",
                action.payload.commentId
              )
            );
        });
    } else if (action.type == ActionTypes.LIKE_NOTE_COMMENT) {
      axios
        .post("/api", {
          query: `
            mutation {
              likeNoteComment(noteId:"${action.payload.mediaId}" , commentId:"${action.payload.commentId}")
            }
          `,
        })
        .then((res) => {
          if (res.data.data.likeNoteComment)
            next(
              ActionCreators.likeCommentSuccess(
                "note",
                action.payload.commentId
              )
            );
        });
    } else if (action.type == ActionTypes.DISLIKE_NOTE_COMMENT) {
      axios
        .post("/api", {
          query: `
            mutation {
              dislikeNoteComment(noteId:"${action.payload.mediaId}" , commentId:"${action.payload.commentId}")
            }
          `,
        })
        .then((res) => {
          if (res.data.data.dislikeNoteComment)
            next(
              ActionCreators.dislikeCommentSuccess(
                "note",
                action.payload.commentId
              )
            );
        });
    } else next(action);
  },
];
