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
  USER_INFO_LOADING: "USER_INFO_LOADING",
  GET_USER_INFO_START: "GET_USER_INFO_START",
  GET_USER_INFO_SUCCESS: "GET_USER_INFO_SUCCESS",
  GET_USER_INFO_ERROR: "GET_USER_INFO_ERROR",
  GET_VIDEO_INFO_START: "GET_VIDEO_INFO_START",
  GET_VIDEO_INFO_SUCCESS: "GET_VIDEO_INFO_SUCCESS",
  GET_VIDEO_INFO_ERROR: "GET_VIDEO_INFO_ERROR",
  RECORD_VIDEO_VIEW_START: "RECORD_VIDEO_VIEW_START",
  RECORD_VIDEO_VIEW_SUCCESS: "RECORD_VIDEO_VIEW_SUCCESS",
  RECORD_VIDEO_VIEW_ERROR: "RECORD_VIDEO_VIEW_ERROR",
  GET_IMAGE_INFO_START: "GET_IMAGE_INFO_START",
  GET_IMAGE_INFO_SUCCESS: "GET_IMAGE_INFO_SUCCESS",
  GET_IMAGE_INFO_ERROR: "GET_IMAGE_INFO_ERROR",
  GET_NOTE_INFO_START: "GET_NOTE_INFO_START",
  GET_NOTE_INFO_SUCCESS: "GET_NOTE_INFO_SUCCESS",
  GET_NOTE_INFO_ERROR: "GET_NOTE_INFO_ERROR",
  GET_USER_ACCOUNT_INFO_START: "GET_USER_ACCOUNT_INFO_START",
  GET_USER_ACCOUNT_INFO_SUCCESS: "GET_USER_ACCOUNT_INFO_SUCCESS",
  GET_USER_ACCOUNT_INFO_ERROR: "GET_USER_ACCOUNT_INFO_ERROR",
  UPDATE_ACCOUNT_INFO_START: "UPDATE_ACCOUNT_INFO_START",
  UPDATE_ACCOUNT_INFO_SUCCESS: "UPDATE_ACCOUNT_INFO_SUCCESS",
  UPDATE_ACCOUNT_INFO_ERROR: "UPDATE_ACCOUNT_INFO_ERROR",
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
  userInfoLoading: () => {
    return { type: ActionTypes.USER_INFO_LOADING };
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
  recordVideoViewStart: (videoId) => {
    return { type: ActionTypes.RECORD_VIDEO_VIEW_START, payload: { videoId } };
  },
  recordVideoViewSuccess: () => {
    return { type: ActionTypes.RECORD_VIDEO_VIEW_SUCCESS };
  },
  recordVideoViewError: (error) => {
    return { type: ActionTypes.RECORD_VIDEO_VIEW_ERROR, error };
  },
  getImageInfoStart: (imageId) => {
    return { type: ActionTypes.GET_IMAGE_INFO_START, payload: { imageId } };
  },
  getImageInfoSuccess: (imageData) => {
    return { type: ActionTypes.GET_IMAGE_INFO_SUCCESS, payload: { imageData } };
  },
  getImageInfoError: (error) => {
    return { type: ActionTypes.GET_IMAGE_INFO_ERROR, error };
  },
  getNoteInfoStart: (noteId) => {
    return { type: ActionTypes.GET_NOTE_INFO_START, payload: { noteId } };
  },
  getNoteInfoSuccess: (noteData) => {
    return { type: ActionTypes.GET_NOTE_INFO_SUCCESS, payload: { noteData } };
  },
  getNoteInfoError: (error) => {
    return { type: ActionTypes.GET_NOTE_INFO_ERROR, error };
  },
  getUserAccountInfoStart: (username) => {
    return {
      type: ActionTypes.GET_USER_ACCOUNT_INFO_START,
      payload: { username },
    };
  },
  getUserAccountInfoSuccess: (userData) => {
    return {
      type: ActionTypes.GET_USER_ACCOUNT_INFO_SUCCESS,
      payload: { userData },
    };
  },
  getUserAccountInfoError: (error) => {
    return { type: ActionTypes.GET_USER_ACCOUNT_INFO_ERROR, error };
  },
  updateAccountInfoStart: (userInfo) => {
    return {
      type: ActionTypes.UPDATE_ACCOUNT_INFO_START,
      payload: { userInfo },
    };
  },
  updateAccountInfoSuccess: (userData) => {
    return {
      type: ActionTypes.UPDATE_ACCOUNT_INFO_SUCCESS,
      payload: { userData },
    };
  },
  updateAccountInfoError: (error) => {
    return { type: ActionTypes.UPDATE_ACCOUNT_INFO_ERROR, error };
  },
};
