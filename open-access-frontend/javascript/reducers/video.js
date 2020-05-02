import { ActionTypes } from "../actions";

const initialState = {
  error: null,
  user: {},
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    case ActionTypes.GET_VIDEO_INFO_SUCCESS:
      return { ...state, ...action.payload.videoData };
    case ActionTypes.GET_VIDEO_INFO_ERROR:
      return { ...state, error: action.error };
    case ActionTypes.RECORD_VIDEO_VIEW_SUCCESS:
      return { ...state };
    case ActionTypes.RECORD_VIDEO_VIEW_ERROR:
      return { ...state };
    case ActionTypes.LIKE_VIDEO_SUCCESS:
      return { ...state };
    case ActionTypes.LIKE_VIDEO_ERROR:
      return { ...state };
    case ActionTypes.DISLIKE_VIDEO_SUCCESS:
      return { ...state };
    case ActionTypes.DISLIKE_VIDEO_ERROR:
      return { ...state };
    default:
      return state;
  }
};

export default videoReducer;
