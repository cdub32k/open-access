import DB from "../database";

const resolvers = {
  Query: {
    user: async (parent, { username }, context, info) => {
      const user = await DB.User.findOne({ username });

      return user;
    },
    video: async (parent, { id }, context, info) => {
      const video = await DB.Video.findOne({ _id: id });
      return video;
    },
    image: async (parent, { id }, context, info) => {
      const image = await DB.Image.findOne({ _id: id });
      return image;
    },
    note: async (parent, { id }, context, info) => {
      const note = await DB.Note.findOne({ _id: id });
      return note;
    },
  },

  Mutation: {
    postNote: async (
      parent,
      { body },
      { req: { username, authorized } },
      info
    ) => {
      if (!authorized) return null;

      const note = await DB.Note.create({
        body,
        username,
      });

      return note;
    },
    likeVideo: async (
      parent,
      { id },
      { req: { username, authorized } },
      info
    ) => {
      const liked = await DB.VideoLike.create({
        username,
        videoId: id,
      });
      return !!liked;
    },
    dislikeVideo: async (
      parent,
      { id },
      { req: { username, authorized } },
      info
    ) => {
      const dislike = await DB.VideoDislike.create({
        username,
        videoId: id,
      });
      return !!dislike;
    },
    viewVideo: async (
      parent,
      { id },
      { req: { username, authorized } },
      info
    ) => {
      const viewed = await DB.VideoView.findOne({ username, videoId: id });

      if (viewed) return true;

      const view = await DB.VideoView.create({
        username,
        videoId: id,
      });
      return !!view;
    },
    commentVideo: async (
      parent,
      { id, body },
      { req: { username, authorized } },
      info
    ) => {
      const comment = await DB.VideoComment.create({
        username,
        videoId: id,
        body,
      });
      return !!comment;
    },
  },

  Note: {
    user: async ({ username }, args, context, info) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
  },

  Image: {
    user: async ({ username }, args, context, info) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
  },

  Video: {
    user: async ({ username }, args, context, info) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
    likes: async ({ _id }, args, context, info) => {
      const likes = await DB.VideoLike.find({ videoId: _id });
      return likes;
    },
    dislikes: async ({ _id }, args, context, info) => {
      const dislikes = await DB.VideoDislike.find({ videoId: _id });
      return dislikes;
    },
    views: async ({ _id }, args, context, info) => {
      const views = await DB.VideoView.find({ videoId: _id });
      return views;
    },
    comments: async ({ _id }, args, context, info) => {
      const comments = await DB.VideoComment.find({ videoId: _id });
      return comments;
    },
  },

  User: {
    notes: async ({ username }, args, context, info) => {
      const notes = await DB.Note.find({ username }).select({
        likeCount: 1,
        dislikeCount: 1,
        commentCount: 1,
        username: 1,
        body: 1,
        uploadedAt: 1,
        _id: 1,
      });

      return notes;
    },
    images: async ({ username }, args, context, info) => {
      const images = await DB.Image.find({ username }).select({
        likeCount: 1,
        dislikeCount: 1,
        commentCount: 1,
        username: 1,
        url: 1,
        title: 1,
        caption: 1,
        uploadedAt: 1,
        _id: 1,
      });

      return images;
    },
    videos: async ({ username }, args, context, info) => {
      const videos = await DB.Video.find({ username }).select({
        likeCount: 1,
        dislikeCount: 1,
        commentCount: 1,
        username: 1,
        url: 1,
        thumbUrl: 1,
        title: 1,
        caption: 1,
        viewCount: 1,
        uploadedAt: 1,
        _id: 1,
      });

      return videos;
    },
  },
};

export default resolvers;
