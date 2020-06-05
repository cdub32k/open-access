import { ActionTypes } from "../actions";

import store from "../store";
import { ActionCreators } from "../actions";
import apolloClient from "../apollo";
import { parse } from "graphql";

import { removeNull } from "../utils/helpers";

const initialState = {
  error: null,
  user: {},
  loading: true,
  comments: [],
};

const subscribeToNoteItemUpdates = (noteId) => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription NoteItem($noteId: String) {
          noteItem(noteId: $noteId) {
            _id
            likeCount
            dislikeCount
            commentCount
            comments {
              _id
              user {
                username
                profilePic
              }
              body
              createdAt
            }
          }
        }
     `),
      variables: { noteId },
    })
    .subscribe({
      next({ data: { noteItem } }) {
        store.dispatch(ActionCreators.noteItemUpdate(noteItem));
      },
    });
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
      return { ...state, liked: !state.liked };
    case ActionTypes.LIKE_NOTE_ERROR:
      return { ...state };
    case ActionTypes.DISLIKE_NOTE_SUCCESS:
      return { ...state, disliked: !state.disliked };
    case ActionTypes.DISLIKE_NOTE_ERROR:
      return { ...state };
    case ActionTypes.POST_NOTE_COMMENT_SUCCESS:
      return { ...state };
    case ActionTypes.POST_NOTE_COMMENT_ERROR:
      return { ...state, error: action.error };
    case ActionTypes.CLEAR_NOTE_DATA:
      return { ...initialState };
    case ActionTypes.SUBSCRIBE_NOTE_ITEM_UPDATES:
      const subscription = subscribeToNoteItemUpdates(action.payload.noteId);
      return { ...state, subscription };
    case ActionTypes.NOTE_ITEM_UPDATE:
      let n = removeNull(action.payload.note);
      if (n.comments && n.comments.length)
        n.comments = [...n.comments, ...state.comments];
      else delete n["comments"];
      return { ...state, ...n };
    case ActionTypes.DELETE_NOTE_COMMENT:
      let fComments = state.comments.filter((c) => c._id != action.payload._id);
      return {
        ...state,
        commentCount: state.commentCount - 1,
        comments: fComments,
      };
    case ActionTypes.LOAD_MORE_NOTE_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, ...action.payload.items],
      };
    default:
      return state;
  }
};

export default noteReducer;
