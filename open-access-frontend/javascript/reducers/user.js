import * as jwt_decode from "jwt-decode";
import { ActionTypes } from "../actions";
import axios from "axios";

const initialState = {
  profilePic: "",
  email: "",
  username: "",
  error: null,
  loggedIn: false,
  viewed: {
    username: "",
    videos: [],
    images: [],
    notes: [],
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    case ActionTypes.LOGIN_SUCCESS:
      let { token } = action.payload;
      localStorage.setItem("open-access-api-token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      let decodedToken = jwt_decode(token);
      return {
        ...state,
        loggedIn: true,
        username: decodedToken.username,
        email: decodedToken.email,
        profilePic: decodedToken.profilePic,
      };
    case ActionTypes.LOGIN_ERROR:
      localStorage.removeItem("open-access-api-token");
      return { ...state, loggedIn: false, error: action.error };
    case ActionTypes.AUTO_LOGIN:
      token = localStorage.getItem("open-access-api-token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return {
        ...state,
        loggedIn: true,
        username: action.payload.token.username,
        email: action.payload.token.email,
        profilePic: action.payload.token.profilePic,
      };
    case ActionTypes.LOGOUT:
      localStorage.removeItem("open-access-api-token");
      return { ...state, loggedIn: false, username: "", email: "" };
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
    default:
      return { ...state };
  }
};

export default userReducer;
