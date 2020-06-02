import * as jwt_decode from "jwt-decode";
import { ActionTypes } from "../actions";
import axios from "axios";

import store from "../store";
import { ActionCreators } from "../actions";

import apolloClient from "../apollo";
import { parse } from "graphql";

const initialState = {
  profilePic: "",
  email: "",
  username: "",
  error: null,
  notifications: [],
  notificationsSubscription: null,
  loggedIn: false,
  viewed: {
    loading: false,
    username: "",
    videos: [],
    images: [],
    notes: [],
  },
  newsfeed: {
    notes: [],
    images: [],
    videos: [],
    videoSubscription: null,
    imageSubscription: null,
    noteSubscription: null,
  },
};

const subscribeToNotifications = (username) => {
  return apolloClient
    .subscribe({
      query: parse(`
          subscription notifications($username: String!) {
            notifications(username: $username) {
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
        `),
      variables: { username },
    })
    .subscribe({
      next({ data: { notifications } }) {
        store.dispatch(ActionCreators.addNotification(notifications));
      },
    });
};

const subscribeToNewsfeedVideoUpdates = () => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription NewsfeedVideos {
          newsfeedVideos {
            _id
            user {
              username
              profilePic
            }
            uploadedAt
            thumbUrl
            likeCount
            dislikeCount
            commentCount
            title
            caption
          }
        }
     `),
    })
    .subscribe({
      next({ data: { newsfeedVideos } }) {
        store.dispatch(ActionCreators.newsfeedVideoUpdate(newsfeedVideos));
      },
    });
};
const subscribeToNewsfeedImageUpdates = () => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription NewsfeedImages {
          newsfeedImages {
            _id
            user {
              username
              profilePic
            }
            uploadedAt
            thumbUrl
            likeCount
            dislikeCount
            commentCount
          }
        }
     `),
    })
    .subscribe({
      next({ data: { newsfeedImages } }) {
        store.dispatch(ActionCreators.newsfeedImageUpdate(newsfeedImages));
      },
    });
};
const subscribeToNewsfeedNoteUpdates = () => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription NewsfeedNotes {
          newsfeedNotes {
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
     `),
    })
    .subscribe({
      next({ data: { newsfeedNotes } }) {
        store.dispatch(ActionCreators.newsfeedNoteUpdate(newsfeedNotes));
      },
    });
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    case ActionTypes.LOGIN_SUCCESS: {
      let { token } = action.payload;
      localStorage.setItem("open-access-api-token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      let decodedToken = jwt_decode(token);

      const { username, email, profilePic } = decodedToken;

      const notificationsSubscription = subscribeToNotifications(username);

      return {
        ...state,
        loggedIn: true,
        username,
        email,
        profilePic,
        notificationsSubscription,
      };
    }
    case ActionTypes.LOGIN_ERROR:
      localStorage.removeItem("open-access-api-token");
      return { ...state, loggedIn: false, error: action.error };
    case ActionTypes.AUTO_LOGIN: {
      const token = localStorage.getItem("open-access-api-token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { username, email, profilePic } = action.payload.token;

      const notificationsSubscription = subscribeToNotifications(username);

      return {
        ...state,
        loggedIn: true,
        username,
        email,
        profilePic,
        notificationsSubscription,
      };
    }
    case ActionTypes.LOGOUT:
      localStorage.removeItem("open-access-api-token");
      state.notificationsSubscription &&
        state.notificationsSubscription.unsubscribe();
      return { ...initialState };
    case ActionTypes.USER_INFO_LOADING:
      return { ...state, viewed: { ...state.viewed, loading: true } };
    case ActionTypes.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        viewed: action.payload.userInfo,
      };
    case ActionTypes.GET_USER_INFO_ERROR:
      return {
        ...state,
        viewed: { ...state.viewed, error: action.error },
      };
    case ActionTypes.GET_USER_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload.userData,
      };
    case ActionTypes.GET_USER_ACCOUNT_INFO_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case ActionTypes.UPDATE_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload.userData,
      };
    case ActionTypes.UPDATE_ACCOUNT_INFO_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case ActionTypes.LOAD_USER_VIDEO_PAGE_SUCCESS:
      return {
        ...state,
        viewed: {
          ...state.viewed,
          videos: [...state.viewed.videos, ...action.payload.videos],
          hasMoreVideos: action.payload.hasMoreVideos,
        },
      };
    case ActionTypes.LOAD_USER_VIDEO_PAGE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case ActionTypes.LOAD_USER_IMAGE_PAGE_SUCCESS:
      return {
        ...state,
        viewed: {
          ...state.viewed,
          images: [...state.viewed.images, ...action.payload.images],
          hasMoreImages: action.payload.hasMoreImages,
        },
      };
    case ActionTypes.LOAD_USER_IMAGE_PAGE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case ActionTypes.LOAD_USER_NOTE_PAGE_SUCCESS:
      return {
        ...state,
        viewed: {
          ...state.viewed,
          notes: [...state.viewed.notes, ...action.payload.notes],
          hasMoreNotes: action.payload.hasMoreNotes,
        },
      };
    case ActionTypes.LOAD_USER_NOTE_PAGE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case ActionTypes.CLEAR_USER_DATA:
      return {
        ...state,
        viewed: { ...initialState.viewed },
      };
    case ActionTypes.MARK_NOTIFICATIONS_READ_SUCCESS:
      const readNotifs = state.notifications.map((notif) => {
        notif.read = true;
        return notif;
      });
      return { ...state, notifications: readNotifs };
    case ActionTypes.MARK_NOTIFICATIONS_READ_ERROR:
      return { ...state, error: action.error };
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload.notification, ...state.notifications],
      };
    case ActionTypes.NEWSFEED_VIDEO_UPDATE:
      return {
        ...state,
        newsfeed: {
          ...state.newsfeed,
          videos: [action.payload.video, ...state.newsfeed.videos],
        },
      };
    case ActionTypes.NEWSFEED_IMAGE_UPDATE:
      return {
        ...state,
        newsfeed: {
          ...state.newsfeed,
          images: [action.payload.image, ...state.newsfeed.images],
        },
      };
    case ActionTypes.NEWSFEED_NOTE_UPDATE:
      return {
        ...state,
        newsfeed: {
          ...state.newsfeed,
          notes: [action.payload.note, ...state.newsfeed.notes],
        },
      };
    case ActionTypes.LOAD_NEWSFEED_VIDEO_START:
      /// will remove this (only runs in middleware eventually)
      const videoSubscription = subscribeToNewsfeedVideoUpdates();

      return {
        ...state,
        newsfeed: { ...state.newsfeed, videoSubscription },
      };
    case ActionTypes.LOAD_NEWSFEED_VIDEO_SUCCESS:
      return {
        ...state,
        newsfeed: {
          ...state.newsfeed,
          videos: [...action.payload.videos, ...state.newsfeed.videos],
        },
      };
    case ActionTypes.LOAD_NEWSFEED_VIDEO_ERROR:
      return {
        ...state,
      };
    case ActionTypes.LOAD_NEWSFEED_IMAGES_START:
      /// will remove this (only runs in middleware eventually)
      const imageSubscription = subscribeToNewsfeedImageUpdates();

      return {
        ...state,
        newsfeed: { ...state.newsfeed, imageSubscription },
      };
    case ActionTypes.LOAD_NEWSFEED_IMAGES_SUCCESS:
      return {
        ...state,
        newsfeed: {
          ...state.newsfeed,
          images: [...action.payload.images, ...state.newsfeed.images],
        },
      };
    case ActionTypes.LOAD_NEWSFEED_IMAGES_ERROR:
      return {
        ...state,
      };
    case ActionTypes.LOAD_NEWSFEED_NOTES_START:
      /// will remove this (only runs in middleware eventually)
      const noteSubscription = subscribeToNewsfeedNoteUpdates();

      return {
        ...state,
        newsfeed: { ...state.newsfeed, noteSubscription },
      };
    case ActionTypes.LOAD_NEWSFEED_NOTES_SUCCESS:
      return {
        ...state,
        newsfeed: {
          ...state.newsfeed,
          notes: [...action.payload.notes, ...state.newsfeed.notes],
        },
      };
    case ActionTypes.LOAD_NEWSFEED_NOTES_ERROR:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
