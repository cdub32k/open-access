import { ActionTypes } from "../actions";

const initialState = {
  error: null,
  user: {},
  loading: false,
  comments: [],
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
      let newCount = state.liked ? state.likeCount - 1 : state.likeCount + 1;
      return { ...state, liked: !state.liked, likeCount: newCount };
    case ActionTypes.LIKE_VIDEO_ERROR:
      return { ...state };
    case ActionTypes.DISLIKE_VIDEO_SUCCESS:
      newCount = state.disliked
        ? state.dislikeCount - 1
        : state.dislikeCount + 1;
      return { ...state, disliked: !state.disliked, dislikeCount: newCount };
    case ActionTypes.DISLIKE_VIDEO_ERROR:
      return { ...state };
    case ActionTypes.POST_VIDEO_COMMENT_SUCCESS:
      const newComment = {
        _id: action.payload.commentId,
        body: action.payload.body,
        user: {
          username: action.payload.username,
          profilePic: action.payload.profilePic,
        },
      };
      return {
        ...state,
        comments: [newComment, ...state.comments],
        commentCount: state.commentCount + 1,
      };
    case ActionTypes.POST_VIDEO_COMMENT_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default videoReducer;
