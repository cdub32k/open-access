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
              likeCount
              dislikeCount
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
      if (action.payload.noteData.comments.length < 4) hasMoreComments = false;
      if (
        action.payload.noteData.comments[0] &&
        action.payload.noteData.comments[0].replies
      ) {
        let comm = action.payload.noteData.comments[0];

        while (comm.replies) {
          comm.replies = JSON.parse(comm.replies);
          comm = comm.replies[0];
        }
      }
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
          let parent = findComment(nComments, reply.replyId);
          parent.replies
            ? (parent.replies = [reply, ...parent.replies])
            : (parent.replies = [reply]);
          parent.replyCount++;
          i.comments = nComments;
        } else if (
          (i.comments[0].likeCount || i.comments[0].likeCount === 0) &&
          !i.comments[0].body
        ) {
          let c = i.comments[0];

          let nComments = [...state.comments];
          let comm = findComment(nComments, c._id);
          comm.likeCount = c.likeCount;
          i.comments = nComments;
        } else if (
          (i.comments[0].dislikeCount || i.comments[0].dislikeCount === 0) &&
          !i.comments[0].body
        ) {
          let c = i.comments[0];

          let nComments = [...state.comments];
          let comm = findComment(nComments, c._id);
          comm.dislikeCount = c.dislikeCount;
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
      if (action.payload.items.length < 4) hasMoreComments = false;
      return {
        ...state,
        comments: [...state.comments, ...action.payload.items],
        hasMoreComments,
      };
    case ActionTypes.UPDATE_NOTE_COMMENT:
      let nComments = [...state.comments];
      let c = findComment(nComments, action.payload._id);
      c.body = action.payload.body;
      return { ...state, comments: nComments };
    case ActionTypes.GET_NOTE_COMMENT_REPLIES_SUCCESS:
      nComments = [...state.comments];
      let parent = findComment(nComments, action.payload._id);
      parent.replies = action.payload.replies;

      return { ...state, comments: nComments };
    case ActionTypes.LIKE_NOTE_COMMENT_SUCCESS:
      nComments = [...state.comments];
      c = findComment(nComments, action.payload._id);
      c.liked = !c.liked;
      return { ...state, comments: nComments };
    case ActionTypes.DISLIKE_NOTE_COMMENT_SUCCESS:
      nComments = [...state.comments];
      c = findComment(nComments, action.payload._id);
      c.disliked = !c.disliked;
      return { ...state, comments: nComments };
    default:
      return state;
  }
};

export default noteReducer;
