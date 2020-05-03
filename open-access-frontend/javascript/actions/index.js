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
  VIDEO_LOADING: "VIDEO_LOADING",
  GET_VIDEO_INFO_START: "GET_VIDEO_INFO_START",
  GET_VIDEO_INFO_SUCCESS: "GET_VIDEO_INFO_SUCCESS",
  GET_VIDEO_INFO_ERROR: "GET_VIDEO_INFO_ERROR",
  RECORD_VIDEO_VIEW_START: "RECORD_VIDEO_VIEW_START",
  RECORD_VIDEO_VIEW_SUCCESS: "RECORD_VIDEO_VIEW_SUCCESS",
  RECORD_VIDEO_VIEW_ERROR: "RECORD_VIDEO_VIEW_ERROR",
  POST_VIDEO_COMMENT_START: "POST_VIDEO_COMMENT_START",
  POST_VIDEO_COMMENT_SUCCESS: "POST_VIDEO_COMMENT_SUCCESS",
  POST_VIDEO_COMMENT_ERROR: "POST_VIDEO_COMMENT_ERROR",
  LIKE_VIDEO_START: "LIKE_VIDEO_START",
  LIKE_VIDEO_SUCCESS: "LIKE_VIDEO_SUCCESS",
  LIKE_VIDEO_ERROR: "LIKE_VIDEO_ERROR",
  DISLIKE_VIDEO_START: "DISLIKE_VIDEO_START",
  DISLIKE_VIDEO_SUCCESS: "DISLIKE_VIDEO_SUCCESS",
  DISLIKE_VIDEO_ERROR: "DISLIKE_VIDEO_ERROR",
  IMAGE_LOADING: "IMAGE_LOADING",
  GET_IMAGE_INFO_START: "GET_IMAGE_INFO_START",
  GET_IMAGE_INFO_SUCCESS: "GET_IMAGE_INFO_SUCCESS",
  GET_IMAGE_INFO_ERROR: "GET_IMAGE_INFO_ERROR",
  LIKE_IMAGE_START: "LIKE_IMAGE_START",
  LIKE_IMAGE_SUCCESS: "LIKE_IMAGE_SUCCESS",
  LIKE_IMAGE_ERROR: "LIKE_IMAGE_ERROR",
  DISLIKE_IMAGE_START: "DISLIKE_IMAGE_START",
  DISLIKE_IMAGE_SUCCESS: "DISLIKE_IMAGE_SUCCESS",
  DISLIKE_IMAGE_ERROR: "DISLIKE_IMAGE_ERROR",
  POST_IMAGE_COMMENT_START: "POST_IMAGE_COMMENT_START",
  POST_IMAGE_COMMENT_SUCCESS: "POST_IMAGE_COMMENT_SUCCESS",
  POST_IMAGE_COMMENT_ERROR: "POST_IMAGE_COMMENT_ERROR",
  NOTE_LOADING: "NOTE_LOADING",
  GET_NOTE_INFO_START: "GET_NOTE_INFO_START",
  GET_NOTE_INFO_SUCCESS: "GET_NOTE_INFO_SUCCESS",
  GET_NOTE_INFO_ERROR: "GET_NOTE_INFO_ERROR",
  LIKE_NOTE_START: "LIKE_NOTE_START",
  LIKE_NOTE_SUCCESS: "LIKE_NOTE_SUCCESS",
  LIKE_NOTE_ERROR: "LIKE_NOTE_ERROR",
  DISLIKE_NOTE_START: "DISLIKE_NOTE_START",
  DISLIKE_NOTE_SUCCESS: "DISLIKE_NOTE_SUCCESS",
  DISLIKE_NOTE_ERROR: "DISLIKE_NOTE_ERROR",
  POST_NOTE_COMMENT_START: "POST_NOTE_COMMENT_START",
  POST_NOTE_COMMENT_SUCCESS: "POST_NOTE_COMMENT_SUCCESS",
  POST_NOTE_COMMENT_ERROR: "POST_NOTE_COMMENT_ERROR",
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
  videoLoading: () => {
    return { type: ActionTypes.VIDEO_LOADING };
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
  likeVideoStart: (videoId) => {
    return { type: ActionTypes.LIKE_VIDEO_START, payload: { videoId } };
  },
  likeVideoSuccess: () => {
    return { type: ActionTypes.LIKE_VIDEO_SUCCESS };
  },
  likeVideoError: (error) => {
    return { type: ActionTypes.LIKE_VIDEO_ERROR, error };
  },
  dislikeVideoStart: (videoId) => {
    return { type: ActionTypes.DISLIKE_VIDEO_START, payload: { videoId } };
  },
  dislikeVideoSuccess: () => {
    return { type: ActionTypes.DISLIKE_VIDEO_SUCCESS };
  },
  dislikeVideoError: (error) => {
    return { type: ActionTypes.DISLIKE_VIDEO_ERROR, error };
  },
  postVideoCommentStart: (videoId, body) => {
    return {
      type: ActionTypes.POST_VIDEO_COMMENT_START,
      payload: { videoId, body },
    };
  },
  postVideoCommentSuccess: (commentId, body, username, profilePic) => {
    return {
      type: ActionTypes.POST_VIDEO_COMMENT_SUCCESS,
      payload: { commentId, body, username, profilePic },
    };
  },
  postVideoCommentError: (error) => {
    return { type: ActionTypes.POST_VIDEO_COMMENT_ERROR, error };
  },
  imageLoading: () => {
    return { type: ActionTypes.IMAGE_LOADING };
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
  likeImageStart: (imageId) => {
    return { type: ActionTypes.LIKE_IMAGE_START, payload: { imageId } };
  },
  likeImageSuccess: () => {
    return { type: ActionTypes.LIKE_IMAGE_SUCCESS };
  },
  likeImageError: (error) => {
    return { type: ActionTypes.LIKE_IMAGE_ERROR, error };
  },
  dislikeImageStart: (imageId) => {
    return { type: ActionTypes.DISLIKE_IMAGE_START, payload: { imageId } };
  },
  dislikeImageSuccess: () => {
    return { type: ActionTypes.DISLIKE_IMAGE_SUCCESS };
  },
  dislikeImageError: (error) => {
    return { type: ActionTypes.DISLIKE_IMAGE_ERROR, error };
  },
  postImageCommentStart: (imageId, body) => {
    return {
      type: ActionTypes.POST_IMAGE_COMMENT_START,
      payload: { imageId, body },
    };
  },
  postImageCommentSuccess: (commentId, body, username, profilePic) => {
    return {
      type: ActionTypes.POST_IMAGE_COMMENT_SUCCESS,
      payload: { commentId, body, username, profilePic },
    };
  },
  postImageCommentError: (error) => {
    return { type: ActionTypes.POST_IMAGE_COMMENT_ERROR, error };
  },
  likeNoteStart: (noteId) => {
    return { type: ActionTypes.LIKE_NOTE_START, payload: { noteId } };
  },
  likeNoteSuccess: () => {
    return { type: ActionTypes.LIKE_NOTE_SUCCESS };
  },
  likeNoteError: (error) => {
    return { type: ActionTypes.LIKE_NOTE_ERROR, error };
  },
  dislikeNoteStart: (noteId) => {
    return { type: ActionTypes.DISLIKE_NOTE_START, payload: { noteId } };
  },
  dislikeNoteSuccess: () => {
    return { type: ActionTypes.DISLIKE_NOTE_SUCCESS };
  },
  dislikeNoteError: (error) => {
    return { type: ActionTypes.DISLIKE_NOTE_ERROR, error };
  },
  noteLoading: () => {
    return { type: ActionTypes.NOTE_LOADING };
  },
  postNoteCommentStart: (noteId, body) => {
    return {
      type: ActionTypes.POST_NOTE_COMMENT_START,
      payload: { noteId, body },
    };
  },
  postNoteCommentSuccess: (commentId, body, username, profilePic) => {
    return {
      type: ActionTypes.POST_NOTE_COMMENT_SUCCESS,
      payload: { commentId, body, username, profilePic },
    };
  },
  postNoteCommentError: (error) => {
    return { type: ActionTypes.POST_NOTE_COMMENT_ERROR, error };
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
