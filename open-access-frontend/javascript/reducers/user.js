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
    notes: [
      {
        _id: 3,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "note",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        title: "Adipisicing nulla nulla officia Lorem velit laboris magna.",
      },
      {
        _id: 4,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "note",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        title:
          "Esse veniam irure est dolor dolore proident excepteur laborum cupidatat cupidatat adipisicing.",
      },
      {
        _id: 4,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "note",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        title:
          "Esse veniam irure est dolor dolore proident excepteur laborum cupidatat cupidatat adipisicing.",
      },
      {
        _id: 4,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "note",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        title:
          "Esse veniam irure est dolor dolore proident excepteur laborum cupidatat cupidatat adipisicing.",
      },
      {
        _id: 4,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "note",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        title:
          "Esse veniam irure est dolor dolore proident excepteur laborum cupidatat cupidatat adipisicing.",
      },
      {
        _id: 4,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "note",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        title:
          "Esse veniam irure est dolor dolore proident excepteur laborum cupidatat cupidatat adipisicing.",
      },
      {
        _id: 4,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "note",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        title:
          "Esse veniam irure est dolor dolore proident excepteur laborum cupidatat cupidatat adipisicing.",
      },
      {
        _id: 4,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "note",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        title:
          "Esse veniam irure est dolor dolore proident excepteur laborum cupidatat cupidatat adipisicing.",
      },
      {
        _id: 4,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "note",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        title:
          "Esse veniam irure est dolor dolore proident excepteur laborum cupidatat cupidatat adipisicing.",
      },
      {
        _id: 4,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "note",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        title:
          "Esse veniam irure est dolor dolore proident excepteur laborum cupidatat cupidatat adipisicing.",
      },
    ],
    images: [
      {
        _id: 2,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "image",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/img/first_member/1588218623504.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Dolore exercitation id laborum laboris anim eiusmod nulla qui. Enim laborum elit tempor ea incididunt et elit. Aliqua ex do culpa in duis. Labore pariatur magna deserunt velit ipsum amet.",
      },
      {
        _id: 2,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "image",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/img/first_member/1588218623504.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Dolore exercitation id laborum laboris anim eiusmod nulla qui. Enim laborum elit tempor ea incididunt et elit. Aliqua ex do culpa in duis. Labore pariatur magna deserunt velit ipsum amet.",
      },
      {
        _id: 2,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "image",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/img/first_member/1588218623504.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Dolore exercitation id laborum laboris anim eiusmod nulla qui. Enim laborum elit tempor ea incididunt et elit. Aliqua ex do culpa in duis. Labore pariatur magna deserunt velit ipsum amet.",
      },
      {
        _id: 2,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "image",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/img/first_member/1588218623504.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Dolore exercitation id laborum laboris anim eiusmod nulla qui. Enim laborum elit tempor ea incididunt et elit. Aliqua ex do culpa in duis. Labore pariatur magna deserunt velit ipsum amet.",
      },
      {
        _id: 2,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "image",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/img/first_member/1588218623504.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Dolore exercitation id laborum laboris anim eiusmod nulla qui. Enim laborum elit tempor ea incididunt et elit. Aliqua ex do culpa in duis. Labore pariatur magna deserunt velit ipsum amet.",
      },
      {
        _id: 2,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "image",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/img/first_member/1588218623504.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Dolore exercitation id laborum laboris anim eiusmod nulla qui. Enim laborum elit tempor ea incididunt et elit. Aliqua ex do culpa in duis. Labore pariatur magna deserunt velit ipsum amet.",
      },
      {
        _id: 2,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "image",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/img/first_member/1588218623504.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Dolore exercitation id laborum laboris anim eiusmod nulla qui. Enim laborum elit tempor ea incididunt et elit. Aliqua ex do culpa in duis. Labore pariatur magna deserunt velit ipsum amet.",
      },
      {
        _id: 2,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "image",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/img/first_member/1588218623504.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Dolore exercitation id laborum laboris anim eiusmod nulla qui. Enim laborum elit tempor ea incididunt et elit. Aliqua ex do culpa in duis. Labore pariatur magna deserunt velit ipsum amet.",
      },
      {
        _id: 2,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "image",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/img/first_member/1588218623504.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Dolore exercitation id laborum laboris anim eiusmod nulla qui. Enim laborum elit tempor ea incididunt et elit. Aliqua ex do culpa in duis. Labore pariatur magna deserunt velit ipsum amet.",
      },
      {
        _id: 2,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "image",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/img/first_member/1588218623504.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Dolore exercitation id laborum laboris anim eiusmod nulla qui. Enim laborum elit tempor ea incididunt et elit. Aliqua ex do culpa in duis. Labore pariatur magna deserunt velit ipsum amet.",
      },
    ],
    videos: [
      {
        _id: 1,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "video",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/vid/first_member/1588203830736.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Sunt sit sunt amet voluptate reprehenderit esse anim eu amet sit exercitation pariatur tempor. In tempor esse ullamco est duis et officia Lorem minim tempor commodo. Est sint anim fugiat sit ad est qui adipisicing mollit cupidatat pariatur. Sit ea qui nulla sit aliqua tempor amet aliqua aute laborum. Eu dolore labore mollit tempor veniam. Veniam reprehenderit aute deserunt minim ullamco reprehenderit ex adipisicing nisi. Id id in fugiat incididunt cillum aute aliquip irure et in dolor eu id id.",
      },
      {
        _id: 1,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "video",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/vid/first_member/1588203830736.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Sunt sit sunt amet voluptate reprehenderit esse anim eu amet sit exercitation pariatur tempor. In tempor esse ullamco est duis et officia Lorem minim tempor commodo. Est sint anim fugiat sit ad est qui adipisicing mollit cupidatat pariatur. Sit ea qui nulla sit aliqua tempor amet aliqua aute laborum. Eu dolore labore mollit tempor veniam. Veniam reprehenderit aute deserunt minim ullamco reprehenderit ex adipisicing nisi. Id id in fugiat incididunt cillum aute aliquip irure et in dolor eu id id.",
      },
      {
        _id: 1,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "video",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/vid/first_member/1588203830736.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Sunt sit sunt amet voluptate reprehenderit esse anim eu amet sit exercitation pariatur tempor. In tempor esse ullamco est duis et officia Lorem minim tempor commodo. Est sint anim fugiat sit ad est qui adipisicing mollit cupidatat pariatur. Sit ea qui nulla sit aliqua tempor amet aliqua aute laborum. Eu dolore labore mollit tempor veniam. Veniam reprehenderit aute deserunt minim ullamco reprehenderit ex adipisicing nisi. Id id in fugiat incididunt cillum aute aliquip irure et in dolor eu id id.",
      },
      {
        _id: 1,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "video",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/vid/first_member/1588203830736.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Sunt sit sunt amet voluptate reprehenderit esse anim eu amet sit exercitation pariatur tempor. In tempor esse ullamco est duis et officia Lorem minim tempor commodo. Est sint anim fugiat sit ad est qui adipisicing mollit cupidatat pariatur. Sit ea qui nulla sit aliqua tempor amet aliqua aute laborum. Eu dolore labore mollit tempor veniam. Veniam reprehenderit aute deserunt minim ullamco reprehenderit ex adipisicing nisi. Id id in fugiat incididunt cillum aute aliquip irure et in dolor eu id id.",
      },
      {
        _id: 1,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "video",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/vid/first_member/1588203830736.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Sunt sit sunt amet voluptate reprehenderit esse anim eu amet sit exercitation pariatur tempor. In tempor esse ullamco est duis et officia Lorem minim tempor commodo. Est sint anim fugiat sit ad est qui adipisicing mollit cupidatat pariatur. Sit ea qui nulla sit aliqua tempor amet aliqua aute laborum. Eu dolore labore mollit tempor veniam. Veniam reprehenderit aute deserunt minim ullamco reprehenderit ex adipisicing nisi. Id id in fugiat incididunt cillum aute aliquip irure et in dolor eu id id.",
      },
      {
        _id: 1,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "video",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/vid/first_member/1588203830736.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Sunt sit sunt amet voluptate reprehenderit esse anim eu amet sit exercitation pariatur tempor. In tempor esse ullamco est duis et officia Lorem minim tempor commodo. Est sint anim fugiat sit ad est qui adipisicing mollit cupidatat pariatur. Sit ea qui nulla sit aliqua tempor amet aliqua aute laborum. Eu dolore labore mollit tempor veniam. Veniam reprehenderit aute deserunt minim ullamco reprehenderit ex adipisicing nisi. Id id in fugiat incididunt cillum aute aliquip irure et in dolor eu id id.",
      },
      {
        _id: 1,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "video",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/vid/first_member/1588203830736.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Sunt sit sunt amet voluptate reprehenderit esse anim eu amet sit exercitation pariatur tempor. In tempor esse ullamco est duis et officia Lorem minim tempor commodo. Est sint anim fugiat sit ad est qui adipisicing mollit cupidatat pariatur. Sit ea qui nulla sit aliqua tempor amet aliqua aute laborum. Eu dolore labore mollit tempor veniam. Veniam reprehenderit aute deserunt minim ullamco reprehenderit ex adipisicing nisi. Id id in fugiat incididunt cillum aute aliquip irure et in dolor eu id id.",
      },
      {
        _id: 1,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "video",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/vid/first_member/1588203830736.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Sunt sit sunt amet voluptate reprehenderit esse anim eu amet sit exercitation pariatur tempor. In tempor esse ullamco est duis et officia Lorem minim tempor commodo. Est sint anim fugiat sit ad est qui adipisicing mollit cupidatat pariatur. Sit ea qui nulla sit aliqua tempor amet aliqua aute laborum. Eu dolore labore mollit tempor veniam. Veniam reprehenderit aute deserunt minim ullamco reprehenderit ex adipisicing nisi. Id id in fugiat incididunt cillum aute aliquip irure et in dolor eu id id.",
      },
      {
        _id: 1,
        username: "@first_member",
        profilePic: "http://localhost:5000/img/default-profile.png",
        uploadedAt: Date(),
        type: "video",
        likeCount: 4,
        dislikeCount: 3,
        commentCount: 12,
        thumbUrl: "http://localhost:5000/vid/first_member/1588203830736.jpg",
        title: "Ankle Breaking 1V1 Against TheFlightMike!",
        caption:
          "Sunt sit sunt amet voluptate reprehenderit esse anim eu amet sit exercitation pariatur tempor. In tempor esse ullamco est duis et officia Lorem minim tempor commodo. Est sint anim fugiat sit ad est qui adipisicing mollit cupidatat pariatur. Sit ea qui nulla sit aliqua tempor amet aliqua aute laborum. Eu dolore labore mollit tempor veniam. Veniam reprehenderit aute deserunt minim ullamco reprehenderit ex adipisicing nisi. Id id in fugiat incididunt cillum aute aliquip irure et in dolor eu id id.",
      },
    ],
    subscription: null,
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
        console.log("RECEIVED NOTIFICATION: ", notifications);
        store.dispatch(ActionCreators.addNotification(notifications));
      },
    });
};

const subscribeToNewsfeedUpdates = () => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription newsfeed {
          newsfeed {
            _id
            username
            profilePic
            uploadedAt
            type
            likeCount
            dislikeCount
            commentCount
          }
        }
     `),
    })
    .subscribe({
      next({ data: { newsfeed } }) {
        console.log("RECEIVED NOTIFICATION: ", newsfeed);
        store.dispatch(ActionCreators.newsfeedUpdate(newsfeed));
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
    case ActionTypes.NEWSFEED_UPDATE:
      return {
        ...state,
        newsfeed: {
          ...state.newsfeed,
          items: [action.payload.item, ...state.newsfeed.items],
        },
      };
    case ActionTypes.LOAD_NEWSFEED_START:
      /// will remove this (only runs in middleware eventually)
      const subscription = subscribeToNewsfeedUpdates();
      return {
        ...state,
        newsfeed: { ...state.newsfeed, subscription },
      };
    case ActionTypes.LOAD_NEWSFEED_SUCCESS:
      return {
        ...state,
      };
    case ActionTypes.LOAD_NEWSFEED_ERROR:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
