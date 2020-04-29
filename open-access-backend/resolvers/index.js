import DB from "../database";

const resolvers = {
  Query: {
    user: async (parent, { username }, context, info) => {
      const user = await DB.User.findOne({ username });

      return user;
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

  User: {
    notes: async ({ username }, args, context, info) => {
      const notes = await DB.Note.find({ username }).select({
        body: 1,
        uploadedAt: 1,
        _id: 0,
      });
    },
    images: async ({ username }, args, context, info) => {
      const images = await DB.Image.find({ username }).select({
        url: 1,
        title: 1,
        caption: 1,
        uploadedAt: 1,
        _id: 0,
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
        _id: 0,
      });

      return videos;
    },
  },
};

export default resolvers;
