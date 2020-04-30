export const ActionTypes = {
  CLEAR_ERRORS: "CLEAR_ERRORS",
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  AUTO_LOGIN: "AUTO_LOGIN",
  LOGOUT: "LOGOUT",
  SIGN_UP_START: "SIGN_UP_START",
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  SIGN_UP_ERROR: "SIGN_UP_ERROR",
  GET_USER_INFO_START: "GET_USER_INFO_START",
  GET_USER_INFO_SUCCESS: "GET_USER_INFO_SUCCESS",
  GET_USER_INFO_ERROR: "GET_USER_INFO_ERROR",
  GET_VIDEO_INFO_START: "GET_VIDEO_INFO_START",
  GET_VIDEO_INFO_SUCCESS: "GET_VIDEO_INFO_SUCCESS",
  GET_VIDEO_INFO_ERROR: "GET_VIDEO_INFO_ERROR",
};

export const ActionCreators = {
  clearErrors: () => {
    return { type: ActionTypes.CLEAR_ERRORS };
  },
  loginStart: (credentials) => {
    return { type: ActionTypes.LOGIN_START, payload: { credentials } };
  },
  loginSuccess: (token) => {
    return { type: ActionTypes.LOGIN_SUCCESS, payload: { token } };
  },
  loginError: (error) => {
    return { type: ActionTypes.LOGIN_ERROR, error };
  },
  autoLogin: (token) => {
    return { type: ActionTypes.AUTO_LOGIN, payload: { token } };
  },
  logout: () => {
    return { type: ActionTypes.LOGOUT };
  },
  signupStart: (userInfo) => {
    return { type: ActionTypes.SIGN_UP_START, payload: { userInfo } };
  },
  signupError: (error) => {
    return { type: ActionTypes.SIGN_UP_ERROR, error };
  },
  getUserInfoStart: (username) => {
    return { type: ActionTypes.GET_USER_INFO_START, payload: { username } };
  },
  getUserInfoSuccess: (userInfo) => {
    return { type: ActionTypes.GET_USER_INFO_SUCCESS, payload: { userInfo } };
  },
  getUserInfoError: (error) => {
    return { type: ActionTypes.GET_USER_INFO_ERROR, error };
  },
  getVideoInfoStart: (videoId) => {
    return { type: ActionTypes.GET_VIDEO_INFO_START, payload: { videoId } };
  },
  getVideoInfoSuccess: (videoData) => {
    return { type: ActionTypes.GET_VIDEO_INFO_SUCCESS, payload: { videoData } };
  },
  getVideoInfoError: (error) => {
    return { type: ActionTypes.GET_VIDEO_INFO_ERROR, error };
  },
};
