import * as jwt_decode from "jwt-decode";
import { ActionTypes } from "../actions";
import axios from "axios";

import store from "../store";
import { ActionCreators } from "../actions";

import apolloClient from "../apollo";
import { parse } from "graphql";

import { removeNull } from "../utils/helpers";

const initialState = {
  notes: [],
  images: [],
  videos: [],

  videoSubscriptions: [],
  imageSubscriptions: [],
  noteSubscriptions: [],

  searchQuery: "",
};

const subscribeToNewsfeedVideoUpdates = () => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription NewsfeedVideos {
          newsfeedVideos {
            _id
            user {
              username
              profilePic
            }
            uploadedAt
            thumbUrl
            likeCount
            dislikeCount
            commentCount
            title
            caption
          }
        }
     `),
    })
    .subscribe({
      next({ data: { newsfeedVideos } }) {
        store.dispatch(ActionCreators.newsfeedVideoUpdate(newsfeedVideos));
      },
    });
};

const subscribeToNewsfeedVideoItemUpdates = (videoId) => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription NewsfeedVideoItem($videoId: String) {
          newsfeedVideoItem(videoId: $videoId) {
            _id
            likeCount
            dislikeCount
            commentCount
          }
        }
     `),
      variables: { videoId },
    })
    .subscribe({
      next({ data: { newsfeedVideoItem } }) {
        store.dispatch(
          ActionCreators.newsfeedVideoItemUpdate(newsfeedVideoItem)
        );
      },
    });
};

const subscribeToNewsfeedImageUpdates = () => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription NewsfeedImages {
          newsfeedImages {
            _id
            user {
              username
              profilePic
            }
            uploadedAt
            thumbUrl
            likeCount
            dislikeCount
            commentCount
          }
        }
     `),
    })
    .subscribe({
      next({ data: { newsfeedImages } }) {
        store.dispatch(ActionCreators.newsfeedImageUpdate(newsfeedImages));
      },
    });
};

const subscribeToNewsfeedImageItemUpdates = (imageId) => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription NewsfeedImageItem($imageId: String) {
          newsfeedImageItem(imageId: $imageId) {
            _id
            likeCount
            dislikeCount
            commentCount
          }
        }
     `),
      variables: { imageId },
    })
    .subscribe({
      next({ data: { newsfeedImageItem } }) {
        store.dispatch(
          ActionCreators.newsfeedImageItemUpdate(newsfeedImageItem)
        );
      },
    });
};

const subscribeToNewsfeedNoteUpdates = () => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription NewsfeedNotes {
          newsfeedNotes {
            _id
            user {
              username
              profilePic
            }
            uploadedAt
            likeCount
            dislikeCount
            commentCount
            caption
          }
        }
     `),
    })
    .subscribe({
      next({ data: { newsfeedNotes } }) {
        store.dispatch(ActionCreators.newsfeedNoteUpdate(newsfeedNotes));
      },
    });
};

const subscribeToNewsfeedNoteItemUpdates = (noteId) => {
  return apolloClient
    .subscribe({
      query: parse(`
        subscription NewsfeedNoteItem($noteId: String) {
          newsfeedNoteItem(noteId: $noteId) {
            _id
            likeCount
            dislikeCount
            commentCount
          }
        }
     `),
      variables: { noteId },
    })
    .subscribe({
      next({ data: { newsfeedNoteItem } }) {
        store.dispatch(ActionCreators.newsfeedNoteItemUpdate(newsfeedNoteItem));
      },
    });
};

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_ERRORS:
      return { ...state, error: null };
    case ActionTypes.NEWSFEED_VIDEO_UPDATE:
      return {
        ...state,
        videos: [action.payload.video, ...state.videos],
      };
    case ActionTypes.SUBSCRIBE_NEWSFEED_VIDEO_ITEM_UPDATES:
      const vidSub = subscribeToNewsfeedVideoItemUpdates(
        action.payload.videoId
      );
      return {
        ...state,
        videoSubscriptions: [...state.videoSubscriptions, vidSub],
      };
    case ActionTypes.SUBSCRIBE_NEWSFEED_IMAGE_ITEM_UPDATES:
      const imgSub = subscribeToNewsfeedImageItemUpdates(
        action.payload.imageId
      );
      return {
        ...state,
        imageSubscriptions: [...state.imageSubscriptions, imgSub],
      };
    case ActionTypes.SUBSCRIBE_NEWSFEED_NOTE_ITEM_UPDATES:
      const noteSub = subscribeToNewsfeedNoteItemUpdates(action.payload.noteId);
      return {
        ...state,
        noteSubscriptions: [...state.noteSubscriptions, noteSub],
      };
    case ActionTypes.NEWSFEED_VIDEO_ITEM_UPDATE:
      let existing = state.videos.findIndex(
        (v) => v._id == action.payload.video._id
      );
      let v = removeNull(action.payload.video);
      if (existing > -1) {
        let vids = [...state.videos];
        vids[existing] = { ...vids[existing], ...v };
        return {
          ...state,
          videos: vids,
        };
      }
      return state;
    case ActionTypes.NEWSFEED_IMAGE_UPDATE:
      return {
        ...state,
        images: [action.payload.image, ...state.images],
      };
    case ActionTypes.NEWSFEED_IMAGE_ITEM_UPDATE:
      existing = state.images.findIndex(
        (i) => i._id == action.payload.image._id
      );
      let i = removeNull(action.payload.image);
      if (existing > -1) {
        let imgs = [...state.images];
        imgs[existing] = { ...imgs[existing], ...i };
        return {
          ...state,
          images: imgs,
        };
      }
      return state;
    case ActionTypes.NEWSFEED_NOTE_UPDATE:
      return {
        ...state,
        notes: [action.payload.note, ...state.notes],
      };
    case ActionTypes.NEWSFEED_NOTE_ITEM_UPDATE:
      existing = state.notes.findIndex((n) => n._id == action.payload.note._id);
      let n = removeNull(action.payload.note);
      if (existing > -1) {
        let nts = [...state.notes];
        nts[existing] = { ...nts[existing], ...n };
        return {
          ...state,
          notes: nts,
        };
      }
      return state;
    case ActionTypes.LOAD_NEWSFEED_VIDEO_START:
      const vidSub2 = subscribeToNewsfeedVideoUpdates();

      return {
        ...state,
        videoSubscriptions: [...state.videoSubscriptions, vidSub2],
      };
    case ActionTypes.LOAD_VIDEO_SEARCH_RESULTS_SUCCESS:
    case ActionTypes.LOAD_NEWSFEED_VIDEO_SUCCESS:
      return {
        ...state,
        videos: [...state.videos, ...action.payload.videos],
      };
    case ActionTypes.LOAD_NEWSFEED_VIDEO_ERROR:
      return {
        ...state,
      };
    case ActionTypes.LOAD_NEWSFEED_IMAGES_START:
      /// will remove this (only runs in middleware eventually)
      const imgSub2 = subscribeToNewsfeedImageUpdates();

      return {
        ...state,
        imageSubscriptions: [...state.imageSubscriptions, imgSub2],
      };
    case ActionTypes.LOAD_IMAGE_SEARCH_RESULTS_SUCCESS:
    case ActionTypes.LOAD_NEWSFEED_IMAGES_SUCCESS:
      return {
        ...state,
        images: [...state.images, ...action.payload.images],
      };
    case ActionTypes.LOAD_IMAGE_SEARCH_RESULTS_ERROR:
    case ActionTypes.LOAD_NEWSFEED_IMAGES_ERROR:
      return {
        ...state,
      };
    case ActionTypes.LOAD_NEWSFEED_NOTES_START:
      /// will remove this (only runs in middleware eventually)
      const noteSub2 = subscribeToNewsfeedNoteUpdates();

      return {
        ...state,
        noteSubscriptions: [...state.noteSubscriptions, noteSub2],
      };
    case ActionTypes.LOAD_NOTE_SEARCH_RESULTS_SUCCESS:
    case ActionTypes.LOAD_NEWSFEED_NOTES_SUCCESS:
      return {
        ...state,
        notes: [...state.notes, ...action.payload.notes],
      };
    case ActionTypes.LOAD_NOTE_SEARCH_RESULTS_ERROR:
    case ActionTypes.LOAD_NEWSFEED_NOTES_ERROR:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default feedReducer;