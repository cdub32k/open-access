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

const subscribeToVideoItemUpdates = (videoId) => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription VideoItem($videoId: String) {
          videoItem(videoId: $videoId) {
            _id
            likeCount
            dislikeCount
            commentCount
            viewCount
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
      variables: { videoId },
    })
    .subscribe({
      next({ data: { videoItem } }) {
        store.dispatch(ActionCreators.videoItemUpdate(videoItem));
      },
    });
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    case ActionTypes.VIDEO_LOADING:
      return { ...state, loading: true };
    case ActionTypes.GET_VIDEO_INFO_SUCCESS:
      return { ...state, ...action.payload.videoData, loading: false };
    case ActionTypes.GET_VIDEO_INFO_ERROR:
      return { ...state, error: action.error, loading: false };
    case ActionTypes.RECORD_VIDEO_VIEW_SUCCESS:
      return { ...state };
    case ActionTypes.RECORD_VIDEO_VIEW_ERROR:
      return { ...state };
    case ActionTypes.LIKE_VIDEO_SUCCESS:
      return { ...state, liked: !state.liked };
    case ActionTypes.LIKE_VIDEO_ERROR:
      return { ...state };
    case ActionTypes.DISLIKE_VIDEO_SUCCESS:
      return { ...state, disliked: !state.disliked };
    case ActionTypes.DISLIKE_VIDEO_ERROR:
      return { ...state };
    case ActionTypes.POST_VIDEO_COMMENT_SUCCESS:
      return { ...state };
    case ActionTypes.POST_VIDEO_COMMENT_ERROR:
      return { ...state, error: action.error };
    case ActionTypes.CLEAR_VIDEO_DATA:
      return { ...initialState };
    case ActionTypes.SUBSCRIBE_VIDEO_ITEM_UPDATES:
      const subscription = subscribeToVideoItemUpdates(action.payload.videoId);
      return { ...state, subscription };
    case ActionTypes.VIDEO_ITEM_UPDATE:
      let v = removeNull(action.payload.video);
      if (v.comments && v.comments.length)
        v.comments = [...v.comments, ...state.comments];
      else delete v["comments"];
      return { ...state, ...v };
    case ActionTypes.DELETE_VIDEO_COMMENT:
      let fComments = state.comments.filter((c) => c._id != action.payload._id);
      return {
        ...state,
        commentCount: state.commentCount - 1,
        comments: fComments,
      };
    case ActionTypes.LOAD_MORE_VIDEO_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, ...action.payload.items],
      };
    default:
      return state;
  }
};

export default videoReducer;
