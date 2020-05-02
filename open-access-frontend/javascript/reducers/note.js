import { ActionTypes } from "../actions";

const initialState = {
  error: null,
  user: {},
  loading: false,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    case ActionTypes.NOTE_LOADING:
      return { ...state, loading: true };
    case ActionTypes.GET_NOTE_INFO_SUCCESS:
      return { ...state, ...action.payload.noteData, loading: false };
    case ActionTypes.GET_NOTE_INFO_ERROR:
      return { ...state, error: action.error, loading: false };
    case ActionTypes.LIKE_NOTE_SUCCESS:
      let newCount = state.liked ? state.likeCount - 1 : state.likeCount + 1;
      return { ...state, liked: !state.liked, likeCount: newCount };
      return { ...state };
    case ActionTypes.LIKE_NOTE_ERROR:
      return { ...state };
    case ActionTypes.DISLIKE_NOTE_SUCCESS:
      newCount = state.disliked
        ? state.dislikeCount - 1
        : state.dislikeCount + 1;
      return { ...state, disliked: !state.disliked, dislikeCount: newCount };
      return { ...state };
    case ActionTypes.DISLIKE_NOTE_ERROR:
      return { ...state };
    default:
      return state;
  }
};

export default noteReducer;
