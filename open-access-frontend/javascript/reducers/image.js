import { ActionTypes } from "../actions";

const initialState = {
  error: null,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    case ActionTypes.GET_IMAGE_INFO_SUCCESS:
      return { ...state, ...action.payload.imageData };
    case ActionTypes.GET_IMAGE_INFO_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default imageReducer;
