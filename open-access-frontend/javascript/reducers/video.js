import { ActionTypes } from "../actions";

const initialState = {
  error: null,
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    case ActionTypes.GET_VIDEO_INFO_SUCCESS:
      return { ...state, ...action.payload.videoData };
    case ActionTypes.GET_VIDEO_INFO_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default videoReducer;
