import { ActionTypes } from "../actions";

import store from "../store";
import { ActionCreators } from "../actions";
import apolloClient from "../apollo";
import { parse } from "graphql";

import {
  removeNull,
  findComment,
  findAndDeleteComment,
} from "../utils/helpers";

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
              replyId
              replyCount
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
      let hasMoreComments = true;
      if (action.payload.noteData.comments.length < 10) hasMoreComments = false;
      return {
        ...state,
        ...action.payload.noteData,
        hasMoreComments,
        loading: false,
      };
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
      let i = removeNull(action.payload.note);
      if (i.comments && i.comments.length) {
        if (i.comments[0].replyId) {
          let reply = i.comments[0];

          let nComments = [...state.comments];
          let parent;
          for (let i = 0; i < nComments.length; i++) {
            let found = findComment(nComments[i], reply.replyId);
            if (found) {
              parent = found;
              break;
            }
          }
          parent.replies
            ? (parent.replies = [reply, ...parent.replies])
            : (parent.replies = [reply]);
          parent.replyCount++;
          i.comments = nComments;
        } else i.comments = [...i.comments, ...state.comments];
      } else delete i["comments"];
      return { ...state, ...i };
    case ActionTypes.DELETE_NOTE_COMMENT:
      let fComments = findAndDeleteComment(
        [...state.comments],
        action.payload._id
      );

      return {
        ...state,
        commentCount: action.payload.commentCount,
        comments: fComments,
      };
    case ActionTypes.LOAD_MORE_NOTE_COMMENTS_SUCCESS:
      hasMoreComments = true;
      if (action.payload.items.length < 10) hasMoreComments = false;
      return {
        ...state,
        comments: [...state.comments, ...action.payload.items],
        hasMoreComments,
      };
    case ActionTypes.UPDATE_NOTE_COMMENT:
      let nComments = [...state.comments];
      let c;
      for (let i = 0; i < nComments.length; i++) {
        let found = findComment(nComments[i], action.payload._id);
        if (found) {
          c = found;
          break;
        }
      }
      c.body = action.payload.body;
      return { ...state, comments: nComments };
    case ActionTypes.GET_NOTE_COMMENT_REPLIES_SUCCESS:
      let parent;
      nComments = [...state.comments];
      for (let i = 0; i < nComments.length; i++) {
        let found = findComment(nComments[i], action.payload._id);
        if (found) {
          parent = found;
          break;
        }
      }
      parent.replies = action.payload.replies;

      return { ...state, comments: nComments };
    default:
      return state;
  }
};

export default noteReducer;
