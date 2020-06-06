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
  CLEAR_USER_DATA: "CLEAR_USER_DATA",
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
  LOAD_USER_VIDEO_PAGE_START: "LOAD_USER_VIDEO_PAGE_START",
  LOAD_USER_VIDEO_PAGE_SUCCESS: "LOAD_USER_VIDEO_PAGE_SUCCESS",
  LOAD_USER_VIDEO_PAGE_ERROR: "LOAD_USER_VIDEO_PAGE_ERROR",
  CLEAR_VIDEO_DATA: "CLEAR_VIDEO_DATA",
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
  LOAD_USER_IMAGE_PAGE_START: "LOAD_USER_IMAGE_PAGE_START",
  LOAD_USER_IMAGE_PAGE_SUCCESS: "LOAD_USER_IMAGE_PAGE_SUCCESS",
  LOAD_USER_IMAGE_PAGE_ERROR: "LOAD_USER_IMAGE_PAGE_ERROR",
  CLEAR_IMAGE_DATA: "CLEAR_IMAGE_DATA",
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
  LOAD_USER_NOTE_PAGE_START: "LOAD_USER_NOTE_PAGE_START",
  LOAD_USER_NOTE_PAGE_SUCCESS: "LOAD_USER_NOTE_PAGE_SUCCESS",
  LOAD_USER_NOTE_PAGE_ERROR: "LOAD_USER_NOTE_PAGE_ERROR",
  CLEAR_NOTE_DATA: "CLEAR_NOTE_DATA",
  GET_USER_ACCOUNT_INFO_START: "GET_USER_ACCOUNT_INFO_START",
  GET_USER_ACCOUNT_INFO_SUCCESS: "GET_USER_ACCOUNT_INFO_SUCCESS",
  GET_USER_ACCOUNT_INFO_ERROR: "GET_USER_ACCOUNT_INFO_ERROR",
  UPDATE_ACCOUNT_INFO_START: "UPDATE_ACCOUNT_INFO_START",
  UPDATE_ACCOUNT_INFO_SUCCESS: "UPDATE_ACCOUNT_INFO_SUCCESS",
  UPDATE_ACCOUNT_INFO_ERROR: "UPDATE_ACCOUNT_INFO_ERROR",
  MARK_NOTIFICATIONS_READ_START: "MARK_NOTIFICATIONS_READ_START",
  MARK_NOTIFICATIONS_READ_SUCCESS: "MARK_NOTIFICATIONS_READ_SUCCESS",
  MARK_NOTIFICATIONS_READ_ERROR: "MARK_NOTIFICATIONS_READ_ERROR",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  NEWSFEED_VIDEO_UPDATE: "NEWSFEED_VIDEO_UPDATE",
  SUBSCRIBE_VIDEO_ITEM_UPDATES: "SUBSCRIBE_VIDEO_ITEM_UPDATES",
  VIDEO_ITEM_UPDATE: "VIDEO_ITEM_UPDATE",
  SUBSCRIBE_NEWSFEED_VIDEO_ITEM_UPDATES:
    "SUBSCRIBE_NEWSFEED_VIDEO_ITEM_UPDATES",
  NEWSFEED_VIDEO_ITEM_UPDATE: "NEWSFEED_VIDEO_ITEM_UPDATE",
  NEWSFEED_IMAGE_UPDATE: "NEWSFEED_IMAGE_UPDATE",
  SUBSCRIBE_NEWSFEED_IMAGE_ITEM_UPDATES:
    "SUBSCRIBE_NEWSFEED_IMAGE_ITEM_UPDATES",
  SUBSCRIBE_IMAGE_ITEM_UPDATES: "SUBSCRIBE_IMAGE_ITEM_UPDATES",
  IMAGE_ITEM_UPDATE: "IMAGE_ITEM_UPDATE",
  NEWSFEED_IMAGE_ITEM_UPDATE: "NEWSFEED_IMAGE_ITEM_UPDATE",
  SUBSCRIBE_NOTE_ITEM_UPDATES: "SUBSCRIBE_NOTE_ITEM_UPDATES",
  NOTE_ITEM_UPDATE: "NOTE_ITEM_UPDATE",
  NEWSFEED_NOTE_UPDATE: "NEWSFEED_NOTE_UPDATE",
  SUBSCRIBE_NEWSFEED_NOTE_ITEM_UPDATES: "SUBSCRIBE_NEWSFEED_NOTE_ITEM_UPDATES",
  NEWSFEED_NOTE_ITEM_UPDATE: "NEWSFEED_NOTE_ITEM_UPDATE",
  LOAD_NEWSFEED_VIDEO_START: "LOAD_NEWSFEED_VIDEO_START",
  LOAD_NEWSFEED_VIDEO_SUCCESS: "LOAD_NEWSFEED_VIDEO_SUCCESS",
  LOAD_NEWSFEED_VIDEO_ERROR: "LOAD_NEWSFEED_VIDEO_START",
  LOAD_NEWSFEED_IMAGES_START: "LOAD_NEWSFEED_IMAGES_START",
  LOAD_NEWSFEED_IMAGES_SUCCESS: "LOAD_NEWSFEED_IMAGES_SUCCESS",
  LOAD_NEWSFEED_IMAGES_ERROR: "LOAD_NEWSFEED_IMAGES_START",
  LOAD_NEWSFEED_NOTES_START: "LOAD_NEWSFEED_NOTES_START",
  LOAD_NEWSFEED_NOTES_SUCCESS: "LOAD_NEWSFEED_NOTES_SUCCESS",
  LOAD_NEWSFEED_NOTES_ERROR: "LOAD_NEWSFEED_NOTES_START",
  LOAD_MORE_NEWSFEED_VIDEO: "LOAD_MORE_NEWSFEED_VIDEO",
  LOAD_MORE_NEWSFEED_IMAGES: "LOAD_MORE_NEWSFEED_IMAGES",
  LOAD_MORE_NEWSFEED_NOTES: "LOAD_MORE_NEWSFEED_NOTES",
  LOAD_USER_PAYMENT_INFO_START: "LOAD_USER_PAYMENT_INFO_START",
  LOAD_USER_PAYMENT_INFO_SUCCESS: "LOAD_USER_PAYMENT_INFO_SUCCESS",
  LOAD_USER_PAYMENT_INFO_ERROR: "LOAD_USER_PAYMENT_INFO_ERROR",
  DELETE_VIDEO_COMMENT: "DELETE_VIDEO_COMMENT",
  DELETE_IMAGE_COMMENT: "DELETE_IMAGE_COMMENT",
  DELETE_NOTE_COMMENT: "DELETE_NOTE_COMMENT",
  LOAD_MORE_VIDEO_COMMENTS: "LOAD_MORE_VIDEO_COMMENTS",
  LOAD_MORE_IMAGE_COMMENTS: "LOAD_MORE_IMAGE_COMMENTS",
  LOAD_MORE_NOTE_COMMENTS: "LOAD_MORE_NOTE_COMMENTS",
  LOAD_MORE_VIDEO_COMMENTS_SUCCESS: "LOAD_MORE_VIDEO_COMMENTS_SUCCESS",
  LOAD_MORE_IMAGE_COMMENTS_SUCCESS: "LOAD_MORE_IMAGE_COMMENTS_SUCCESS",
  LOAD_MORE_NOTE_COMMENTS_SUCCESS: "LOAD_MORE_NOTE_COMMENTS_SUCCESS",
  UPDATE_VIDEO_COMMENT: "UPDATE_VIDEO_COMMENT",
  UPDATE_IMAGE_COMMENT: "UPDATE_IMAGE_COMMENT",
  UPDATE_NOTE_COMMENT: "UPDATE_NOTE_COMMENT",
  UPDATE_IMAGE: "UPDATE_IMAGE",
};

export const ActionCreators = {
  clearErrors: () => {
    return { type: ActionTypes.CLEAR_ERRORS };
  },
  loginStart: (credentials) => {
    return { type: ActionTypes.LOGIN_START, payload: { credentials } };
  },
  loginSuccess: (token, refreshToken) => {
    return {
      type: ActionTypes.LOGIN_SUCCESS,
      payload: { token, refreshToken },
    };
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
  clearUserData: () => {
    return { type: ActionTypes.CLEAR_USER_DATA };
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
  loadUserVideoPageStart: (username, page) => {
    return {
      type: ActionTypes.LOAD_USER_VIDEO_PAGE_START,
      payload: { username, page },
    };
  },
  loadUserVideoPageSuccess: (videos, hasMoreVideos) => {
    return {
      type: ActionTypes.LOAD_USER_VIDEO_PAGE_SUCCESS,
      payload: { videos, hasMoreVideos },
    };
  },
  loadUserVideoPageError: (error) => {
    return { type: ActionTypes.LOAD_USER_VIDEO_PAGE_ERROR, error };
  },
  clearVideoData: () => {
    return { type: ActionTypes.CLEAR_VIDEO_DATA };
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
  loadUserImagePageStart: (username, page) => {
    return {
      type: ActionTypes.LOAD_USER_IMAGE_PAGE_START,
      payload: { username, page },
    };
  },
  loadUserImagePageSuccess: (images, hasMoreImages) => {
    return {
      type: ActionTypes.LOAD_USER_IMAGE_PAGE_SUCCESS,
      payload: { images, hasMoreImages },
    };
  },
  loadUserImagePageError: (error) => {
    return { type: ActionTypes.LOAD_USER_IMAGE_PAGE_ERROR, error };
  },
  clearImageData: () => {
    return { type: ActionTypes.CLEAR_IMAGE_DATA };
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
  loadUserNotePageStart: (username, page) => {
    return {
      type: ActionTypes.LOAD_USER_NOTE_PAGE_START,
      payload: { username, page },
    };
  },
  loadUserNotePageSuccess: (notes, hasMoreNotes) => {
    return {
      type: ActionTypes.LOAD_USER_NOTE_PAGE_SUCCESS,
      payload: { notes, hasMoreNotes },
    };
  },
  loadUserNotePageError: (error) => {
    return { type: ActionTypes.LOAD_USER_NOTE_PAGE_ERROR, error };
  },
  clearNoteData: () => {
    return { type: ActionTypes.CLEAR_NOTE_DATA };
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
  markNotificationsReadStart: () => {
    return { type: ActionTypes.MARK_NOTIFICATIONS_READ_START };
  },
  markNotificationsReadSuccess: () => {
    return { type: ActionTypes.MARK_NOTIFICATIONS_READ_SUCCESS };
  },
  markNotificationsReadError: (error) => {
    return { type: ActionTypes.MARK_NOTIFICATIONS_READ_ERROR, error };
  },
  addNotification: (notification) => {
    return { type: ActionTypes.ADD_NOTIFICATION, payload: { notification } };
  },
  newsfeedVideoUpdate: (video) => {
    return { type: ActionTypes.NEWSFEED_VIDEO_UPDATE, payload: { video } };
  },
  subscribeNewsfeedVideoItemUpdate: (videoId) => {
    return {
      type: ActionTypes.SUBSCRIBE_NEWSFEED_VIDEO_ITEM_UPDATES,
      payload: { videoId },
    };
  },
  newsfeedVideoItemUpdate: (video) => {
    return { type: ActionTypes.NEWSFEED_VIDEO_ITEM_UPDATE, payload: { video } };
  },
  newsfeedImageUpdate: (image) => {
    return { type: ActionTypes.NEWSFEED_IMAGE_UPDATE, payload: { image } };
  },
  subscribeNewsfeedImageItemUpdate: (imageId) => {
    return {
      type: ActionTypes.SUBSCRIBE_NEWSFEED_IMAGE_ITEM_UPDATES,
      payload: { imageId },
    };
  },
  newsfeedImageItemUpdate: (image) => {
    return { type: ActionTypes.NEWSFEED_IMAGE_ITEM_UPDATE, payload: { image } };
  },
  newsfeedNoteUpdate: (note) => {
    return { type: ActionTypes.NEWSFEED_NOTE_UPDATE, payload: { note } };
  },
  subscribeNewsfeedNoteItemUpdate: (noteId) => {
    return {
      type: ActionTypes.SUBSCRIBE_NEWSFEED_NOTE_ITEM_UPDATES,
      payload: { noteId },
    };
  },

  newsfeedNoteItemUpdate: (note) => {
    return { type: ActionTypes.NEWSFEED_NOTE_ITEM_UPDATE, payload: { note } };
  },
  loadNewsfeedVideoStart: () => {
    return { type: ActionTypes.LOAD_NEWSFEED_VIDEO_START };
  },
  loadNewsfeedVideoSuccess: (videos) => {
    return {
      type: ActionTypes.LOAD_NEWSFEED_VIDEO_SUCCESS,
      payload: { videos },
    };
  },
  loadNewsfeedVideoError: (error) => {
    return { type: ActionTypes.LOAD_NEWSFEED_VIDEO_ERROR, error };
  },
  loadNewsfeedImagesStart: () => {
    return { type: ActionTypes.LOAD_NEWSFEED_IMAGES_START };
  },
  loadNewsfeedImagesSuccess: (images) => {
    return {
      type: ActionTypes.LOAD_NEWSFEED_IMAGES_SUCCESS,
      payload: { images },
    };
  },
  loadNewsfeedImagesError: (error) => {
    return { type: ActionTypes.LOAD_NEWSFEED_IMAGES_ERROR, error };
  },
  loadNewsfeedNotesStart: () => {
    return { type: ActionTypes.LOAD_NEWSFEED_NOTES_START };
  },
  loadNewsfeedNotesSuccess: (notes) => {
    return {
      type: ActionTypes.LOAD_NEWSFEED_NOTES_SUCCESS,
      payload: { notes },
    };
  },
  loadNewsfeedVideoError: (error) => {
    return { type: ActionTypes.LOAD_NEWSFEED_NOTES_ERROR, error };
  },
  loadMoreNewsfeedVideo: () => {
    return { type: ActionTypes.LOAD_MORE_NEWSFEED_VIDEO };
  },
  loadMoreNewsfeedImages: () => {
    return { type: ActionTypes.LOAD_MORE_NEWSFEED_IMAGES };
  },
  loadMoreNewsfeedNotes: () => {
    return { type: ActionTypes.LOAD_MORE_NEWSFEED_NOTES };
  },
  loadUserPaymentInfoStart: () => {
    return { type: ActionTypes.LOAD_USER_PAYMENT_INFO_START };
  },
  loadUserPaymentInfoSuccess: (paymentData) => {
    return {
      type: ActionTypes.LOAD_USER_PAYMENT_INFO_SUCCESS,
      payload: { ...paymentData },
    };
  },
  loadUserPaymentInfoError: (error) => {
    return { type: ActionTypes.LOAD_USER_PAYMENT_INFO_ERROR, error };
  },
  subscribeToVideoItemUpdates: (videoId) => {
    return {
      type: ActionTypes.SUBSCRIBE_VIDEO_ITEM_UPDATES,
      payload: { videoId },
    };
  },
  videoItemUpdate: (video) => {
    return { type: ActionTypes.VIDEO_ITEM_UPDATE, payload: { video } };
  },
  subscribeToImageItemUpdates: (imageId) => {
    return {
      type: ActionTypes.SUBSCRIBE_IMAGE_ITEM_UPDATES,
      payload: { imageId },
    };
  },
  imageItemUpdate: (image) => {
    return { type: ActionTypes.IMAGE_ITEM_UPDATE, payload: { image } };
  },
  subscribeToNoteItemUpdates: (noteId) => {
    return {
      type: ActionTypes.SUBSCRIBE_NOTE_ITEM_UPDATES,
      payload: { noteId },
    };
  },
  noteItemUpdate: (note) => {
    return { type: ActionTypes.NOTE_ITEM_UPDATE, payload: { note } };
  },
  deleteComment: (type, _id) => {
    switch (type) {
      case "videoComment":
        return { type: ActionTypes.DELETE_VIDEO_COMMENT, payload: { _id } };
      case "imageComment":
        return { type: ActionTypes.DELETE_IMAGE_COMMENT, payload: { _id } };
      case "noteComment":
        return { type: ActionTypes.DELETE_NOTE_COMMENT, payload: { _id } };
    }
  },
  loadMoreComments: (type, _id) => {
    switch (type) {
      case "video":
        return {
          type: ActionTypes.LOAD_MORE_VIDEO_COMMENTS,
          payload: { videoId: _id },
        };
      case "image":
        return {
          type: ActionTypes.LOAD_MORE_IMAGE_COMMENTS,
          payload: { imageId: _id },
        };
      case "note":
        return {
          type: ActionTypes.LOAD_MORE_NOTE_COMMENTS,
          payload: { noteId: _id },
        };
    }
  },
  loadMoreCommentsSuccess: (type, items) => {
    switch (type) {
      case "video":
        return {
          type: ActionTypes.LOAD_MORE_VIDEO_COMMENTS_SUCCESS,
          payload: { items },
        };
      case "image":
        return {
          type: ActionTypes.LOAD_MORE_IMAGE_COMMENTS_SUCCESS,
          payload: { items },
        };
      case "note":
        return {
          type: ActionTypes.LOAD_MORE_NOTE_COMMENTS_SUCCESS,
          payload: { items },
        };
    }
  },
  updateComment: (type, _id, body) => {
    switch (type) {
      case "video":
        return {
          type: ActionTypes.UPDATE_VIDEO_COMMENT,
          payload: { _id, body },
        };
      case "image":
        return {
          type: ActionTypes.UPDATE_IMAGE_COMMENT,
          payload: { _id, body },
        };
      case "note":
        return {
          type: ActionTypes.UPDATE_NOTE_COMMENT,
          payload: { _id, body },
        };
    }
  },
  updateImage: (title, caption) => {
    return { type: ActionTypes.UPDATE_IMAGE, payload: { title, caption } };
  },
};
