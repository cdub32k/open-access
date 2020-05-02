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
    likeNote: async (
      parent,
      { id },
      { req: { username, authorized } },
      info
    ) => {
      try {
        const liked = await DB.NoteLike.findOne({ username, noteId: id });
        const note = await DB.Note.findOne({ _id: id });
        if (!liked) {
          await DB.NoteLike.create({
            username,
            noteId: id,
          });
          note.likeCount++;
          await note.save();
        } else {
          await DB.NoteLike.deleteOne({ username, noteId: id });
          note.likeCount--;
          await note.save();
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    dislikeNote: async (
      parent,
      { id },
      { req: { username, authorized } },
      info
    ) => {
      try {
        const disliked = await DB.NoteDislike.findOne({
          username,
          noteId: id,
        });
        const note = await DB.Note.findOne({ _id: id });

        if (!disliked) {
          await DB.NoteDislike.create({
            username,
            noteId: id,
          });
          note.dislikeCount++;
          await note.save();
        } else {
          await DB.NoteDislike.deleteOne({ username, noteId: id });
          note.dislikeCount--;
          await note.save();
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    commentNote: async (
      parent,
      { id, body },
      { req: { username, authorized } },
      info
    ) => {
      try {
        const comment = await DB.NoteComment.create({
          username,
          noteId: id,
          body,
        });

        const note = await DB.Note.findOne({ _id: id });
        note.commentCount++;
        await note.save();

        return true;
      } catch (error) {
        return false;
      }
    },
    likeImage: async (
      parent,
      { id },
      { req: { username, authorized } },
      info
    ) => {
      try {
        const liked = await DB.ImageLike.findOne({ username, imageId: id });
        const image = await DB.Image.findOne({ _id: id });
        if (!liked) {
          await DB.ImageLike.create({
            username,
            imageId: id,
          });
          image.likeCount++;
          await image.save();
        } else {
          await DB.ImageLike.deleteOne({ username, imageId: id });
          image.likeCount--;
          await image.save();
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    dislikeImage: async (
      parent,
      { id },
      { req: { username, authorized } },
      info
    ) => {
      try {
        const disliked = await DB.ImageDislike.findOne({
          username,
          imageId: id,
        });
        const image = await DB.Image.findOne({ _id: id });

        if (!disliked) {
          await DB.ImageDislike.create({
            username,
            imageId: id,
          });
          image.dislikeCount++;
          await image.save();
        } else {
          await DB.ImageDislike.deleteOne({ username, imageId: id });
          image.dislikeCount--;
          await image.save();
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    commentImage: async (
      parent,
      { id, body },
      { req: { username, authorized } },
      info
    ) => {
      try {
        const comment = await DB.ImageComment.create({
          username,
          imageId: id,
          body,
        });

        const image = await DB.Image.findOne({ _id: id });
        image.commentCount++;
        await image.save();

        return true;
      } catch (error) {
        return false;
      }
    },
    likeVideo: async (
      parent,
      { id },
      { req: { username, authorized } },
      info
    ) => {
      try {
        const liked = await DB.VideoLike.findOne({ username, videoId: id });
        const video = await DB.Video.findOne({ _id: id });
        if (!liked) {
          await DB.VideoLike.create({
            username,
            videoId: id,
          });
          video.likeCount++;
          await video.save();
        } else {
          await DB.VideoLike.deleteOne({ username, videoId: id });
          video.likeCount--;
          await video.save();
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    dislikeVideo: async (
      parent,
      { id },
      { req: { username, authorized } },
      info
    ) => {
      try {
        const disliked = await DB.VideoDislike.findOne({
          username,
          videoId: id,
        });
        const video = await DB.Video.findOne({ _id: id });

        if (!disliked) {
          await DB.VideoDislike.create({
            username,
            videoId: id,
          });
          video.dislikeCount++;
          await video.save();
        } else {
          await DB.VideoDislike.deleteOne({ username, videoId: id });
          video.dislikeCount--;
          await video.save();
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    viewVideo: async (
      parent,
      { id },
      { req: { username, authorized } },
      info
    ) => {
      try {
        const viewed = await DB.VideoView.findOne({ username, videoId: id });

        if (viewed) return true;

        await DB.VideoView.create({
          username,
          videoId: id,
        });
        return true;
      } catch (error) {
        return false;
      }
    },
    commentVideo: async (
      parent,
      { id, body },
      { req: { username, authorized } },
      info
    ) => {
      try {
        const comment = await DB.VideoComment.create({
          username,
          videoId: id,
          body,
        });

        const video = await DB.Video.findOne({ _id: id });
        video.commentCount++;
        await video.save();

        return true;
      } catch (error) {
        return false;
      }
    },
  },

  Note: {
    user: async ({ username }, args, context, info) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
    liked: async ({ _id }, args, { req: { username } }, info) => {
      const liked = await DB.NoteLike.findOne({ username, noteId: _id });
      return !!liked;
    },
    disliked: async ({ _id }, args, { req: { username } }, info) => {
      const disliked = await DB.NoteDislike.findOne({ username, noteId: _id });
      return !!disliked;
    },
    likes: async ({ _id }, args, context, info) => {
      const likes = await DB.NoteLike.find({ noteId: _id });
      return likes;
    },
    dislikes: async ({ _id }, args, context, info) => {
      const dislikes = await DB.NoteDislike.find({ noteId: _id });
      return dislikes;
    },
    comments: async ({ _id }, args, context, info) => {
      const comments = await DB.NoteComment.find({ noteId: _id }).sort({
        createdAt: -1,
      });
      return comments;
    },
  },

  NoteComment: {
    user: async ({ username }) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
  },

  Image: {
    user: async ({ username }, args, context, info) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
    liked: async ({ _id }, args, { req: { username } }, info) => {
      const liked = await DB.ImageLike.findOne({ username, imageId: _id });
      return !!liked;
    },
    disliked: async ({ _id }, args, { req: { username } }, info) => {
      const disliked = await DB.ImageDislike.findOne({
        username,
        imageId: _id,
      });
      return !!disliked;
    },
    likes: async ({ _id }, args, context, info) => {
      const likes = await DB.ImageLike.find({ imageId: _id });
      return likes;
    },
    dislikes: async ({ _id }, args, context, info) => {
      const dislikes = await DB.ImageDislike.find({ imageId: _id });
      return dislikes;
    },
    comments: async ({ _id }, args, context, info) => {
      const comments = await DB.ImageComment.find({ imageId: _id }).sort({
        createdAt: -1,
      });
      return comments;
    },
  },

  ImageComment: {
    user: async ({ username }) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
  },

  Video: {
    user: async ({ username }, args, context, info) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
    liked: async ({ _id }, args, { req: { username } }, info) => {
      const liked = await DB.VideoLike.findOne({ username, videoId: _id });
      return !!liked;
    },
    disliked: async ({ _id }, args, { req: { username } }, info) => {
      const disliked = await DB.VideoDislike.findOne({
        username,
        videoId: _id,
      });

      return !!disliked;
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
      const comments = await DB.VideoComment.find({ videoId: _id }).sort({
        createdAt: -1,
      });
      return comments;
    },
  },

  VideoComment: {
    user: async ({ username }) => {
      const user = await DB.User.findOne({ username });
      return user;
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
