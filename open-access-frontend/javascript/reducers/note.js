import { ActionTypes } from "../actions";

const initialState = {
  error: null,
  user: {},
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    case ActionTypes.GET_NOTE_INFO_SUCCESS:
      return { ...state, ...action.payload.noteData };
    case ActionTypes.GET_NOTE_INFO_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default noteReducer;
