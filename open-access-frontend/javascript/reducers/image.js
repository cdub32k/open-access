import { ActionTypes } from "../actions";

const initialState = {
  error: null,
  user: {},
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    case ActionTypes.GET_IMAGE_INFO_SUCCESS:
      return { ...state, ...action.payload.imageData };
    case ActionTypes.GET_IMAGE_INFO_ERROR:
      return { ...state, error: action.error };
    case ActionTypes.LIKE_IMAGE_SUCCESS:
      return { ...state };
    case ActionTypes.LIKE_IMAGE_ERROR:
      return { ...state };
    case ActionTypes.DISLIKE_IMAGE_SUCCESS:
      return { ...state };
    case ActionTypes.DISLIKE_IMAGE_ERROR:
      return { ...state };
    default:
      return state;
  }
};

export default imageReducer;
