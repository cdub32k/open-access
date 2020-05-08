import * as jwt_decode from "jwt-decode";
import { ActionTypes } from "../actions";
import axios from "axios";

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
};

const subscribeToNotifications = (username) => {
  return apolloClient
    .subscribe({
      query: parse(`
          subscription notifications($username: String!) {
            notifications(username: $username) {
              sender
              type
              targetId
              body
            }
          }
        `),
      variables: { username },
    })
    .subscribe({
      next(data) {
        console.log("RECEIVED NOTIFICATION: ", data);
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

      subscribeToNotifications(username);

      return {
        ...state,
        loggedIn: true,
        username,
        email,
        profilePic,
      };
    }
    case ActionTypes.LOGOUT:
      localStorage.removeItem("open-access-api-token");
      this.state.notificationsSubscription &&
        this.state.notificationsSubscription();
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
    default:
      return { ...state };
  }
};

export default userReducer;
