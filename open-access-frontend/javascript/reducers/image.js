import { ActionTypes } from "../actions";

const initialState = {
  error: null,
  user: {},
  loading: false,
  comments: [],
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    case ActionTypes.IMAGE_LOADING:
      return { ...state, loading: true };
    case ActionTypes.GET_IMAGE_INFO_SUCCESS:
      return { ...state, ...action.payload.imageData, loading: false };
    case ActionTypes.GET_IMAGE_INFO_ERROR:
      return { ...state, error: action.error, loading: false };
    case ActionTypes.LIKE_IMAGE_SUCCESS:
      let newCount = state.liked ? state.likeCount - 1 : state.likeCount + 1;
      return { ...state, liked: !state.liked, likeCount: newCount };
      return { ...state };
    case ActionTypes.LIKE_IMAGE_ERROR:
      return { ...state };
    case ActionTypes.DISLIKE_IMAGE_SUCCESS:
      newCount = state.disliked
        ? state.dislikeCount - 1
        : state.dislikeCount + 1;
      return { ...state, disliked: !state.disliked, dislikeCount: newCount };
      return { ...state };
    case ActionTypes.DISLIKE_IMAGE_ERROR:
      return { ...state };
    case ActionTypes.POST_IMAGE_COMMENT_SUCCESS:
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
    case ActionTypes.POST_IMAGE_COMMENT_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default imageReducer;
