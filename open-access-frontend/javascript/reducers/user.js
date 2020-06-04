import * as jwt_decode from "jwt-decode";
import { ActionTypes } from "../actions";
import axios from "axios";

import store from "../store";
import { ActionCreators } from "../actions";

import apolloClient from "../apollo";
import { parse } from "graphql";

const initialState = {
  active: false,
  activeUntil: null,
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

    videoSubscriptions: [],
    imageSubscriptions: [],
    noteSubscriptions: [],
  },
  payment: {
    charges: [],
    subscriptions: [],
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

const subscribeToNewsfeedVideoItemUpdates = (videoId) => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription NewsfeedVideoItem($videoId: String) {
          newsfeedVideoItem(videoId: $videoId) {
            _id
            likeCount
            dislikeCount
            commentCount
          }
        }
     `),
      variables: { videoId },
    })
    .subscribe({
      next({ data: { newsfeedVideoItem } }) {
        store.dispatch(
          ActionCreators.newsfeedVideoItemUpdate(newsfeedVideoItem)
        );
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
      let { token, refreshToken } = action.payload;
      localStorage.setItem("open-access-api-token", token);
      localStorage.setItem("open-access-api-refresh-token", refreshToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["x-refresh-token"] = refreshToken;
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
      const refreshToken = localStorage.getItem(
        "open-access-api-refresh-token"
      );
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["x-refresh-token"] = refreshToken;
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
    case ActionTypes.SUBSCRIBE_NEWSFEED_VIDEO_ITEM_UPDATES:
      const vidSub = subscribeToNewsfeedVideoItemUpdates(
        action.payload.videoId
      );
      return {
        ...state,
        newsfeed: {
          ...state.newsfeed,
          videoSubscriptions: [...state.newsfeed.videoSubscriptions, vidSub],
        },
      };
    case ActionTypes.NEWSFEED_VIDEO_ITEM_UPDATE:
      let existing = state.newsfeed.videos.findIndex(
        (v) => v._id == action.payload.video._id
      );
      if (existing > -1) {
        let vids = [...state.newsfeed.videos];
        vids[existing] = { ...vids[existing], ...action.payload.video };
        return {
          ...state,
          newsfeed: {
            ...state.newsfeed,
            videos: vids,
          },
        };
      }
      return state;
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
      const vidSub2 = subscribeToNewsfeedVideoUpdates();

      return {
        ...state,
        newsfeed: {
          ...state.newsfeed,
          videoSubscriptions: [...state.newsfeed.videoSubscriptions, vidSub2],
        },
      };
    case ActionTypes.LOAD_NEWSFEED_VIDEO_SUCCESS:
      return {
        ...state,
        newsfeed: {
          ...state.newsfeed,
          videos: [...state.newsfeed.videos, ...action.payload.videos],
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
          images: [...state.newsfeed.images, ...action.payload.images],
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
          notes: [...state.newsfeed.notes, ...action.payload.notes],
        },
      };
    case ActionTypes.LOAD_NEWSFEED_NOTES_ERROR:
      return {
        ...state,
      };
    case ActionTypes.LOAD_USER_PAYMENT_INFO_SUCCESS:
      return {
        ...state,
        payment: { ...action.payload },
      };
    case ActionTypes.LOAD_USER_PAYMENT_INFO_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
