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

const subscribeToImageItemUpdates = (imageId) => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription ImageItem($imageId: String) {
          imageItem(imageId: $imageId) {
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
      variables: { imageId },
    })
    .subscribe({
      next({ data: { imageItem } }) {
        store.dispatch(ActionCreators.imageItemUpdate(imageItem));
      },
    });
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    case ActionTypes.IMAGE_LOADING:
      return { ...state, loading: true };
    case ActionTypes.GET_IMAGE_INFO_SUCCESS:
      let hasMoreComments = true;
      if (action.payload.imageData.comments.length < 10)
        hasMoreComments = false;
      return {
        ...state,
        ...action.payload.imageData,
        hasMoreComments,
        loading: false,
      };
    case ActionTypes.GET_IMAGE_INFO_ERROR:
      return { ...state, error: action.error, loading: false };
    case ActionTypes.LIKE_IMAGE_SUCCESS:
      return { ...state, liked: !state.liked };
    case ActionTypes.LIKE_IMAGE_ERROR:
      return { ...state };
    case ActionTypes.DISLIKE_IMAGE_SUCCESS:
      return { ...state, disliked: !state.disliked };
    case ActionTypes.DISLIKE_IMAGE_ERROR:
      return { ...state };
    case ActionTypes.POST_IMAGE_COMMENT_SUCCESS:
      return { ...state };
    case ActionTypes.POST_IMAGE_COMMENT_ERROR:
      return { ...state, error: action.error };
    case ActionTypes.CLEAR_IMAGE_DATA:
      return { ...initialState };
    case ActionTypes.SUBSCRIBE_IMAGE_ITEM_UPDATES:
      const subscription = subscribeToImageItemUpdates(action.payload.imageId);
      return { ...state, subscription };
    case ActionTypes.IMAGE_ITEM_UPDATE:
      let i = removeNull(action.payload.image);
      if (i.comments && i.comments.length)
        i.comments = [...i.comments, ...state.comments];
      else delete i["comments"];
      return { ...state, ...i };
    case ActionTypes.DELETE_IMAGE_COMMENT:
      let fComments = state.comments.filter((c) => c._id != action.payload._id);
      return {
        ...state,
        commentCount: state.commentCount - 1,
        comments: fComments,
      };
    case ActionTypes.LOAD_MORE_IMAGE_COMMENTS_SUCCESS:
      hasMoreComments = true;
      if (action.payload.items.length < 10) hasMoreComments = false;
      return {
        ...state,
        comments: [...state.comments, ...action.payload.items],
        hasMoreComments,
      };
    case ActionTypes.UPDATE_IMAGE_COMMENT:
      let nComments = [...state.comments];
      nComments[nComments.findIndex((c) => c._id == action.payload._id)].body =
        action.payload.body;
      return { ...state, comments: nComments };
    case ActionTypes.UPDATE_IMAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default imageReducer;
