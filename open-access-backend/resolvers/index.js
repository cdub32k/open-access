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
  },

  User: {
    notes: async ({ username }, args, context, info) => {
      const notes = await DB.Note.find({ username }).select({
        body: 1,
        uploadedAt: 1,
        _id: 1,
      });

      return notes;
    },
    images: async ({ username }, args, context, info) => {
      const images = await DB.Image.find({ username }).select({
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
        url: 1,
        thumbUrl: 1,
        title: 1,
        caption: 1,
        views: 1,
        uploadedAt: 1,
        _id: 1,
      });

      return videos;
    },
  },
};

export default resolvers;
