import DB from "../database";

const perPage = 8;

import {
  NOTIFICATION_SUBSCRIPTION_PREFIX,
  NEWSFEED_VIDEO_SUBSCRIPTION_PREFIX,
  NEWSFEED_IMAGE_SUBSCRIPTION_PREFIX,
  NEWSFEED_NOTE_SUBSCRIPTION_PREFIX,
  VIDEO_SUBSCRIPTION_PREFIX,
  IMAGE_SUBSCRIPTION_PREFIX,
  NOTE_SUBSCRIPTION_PREFIX,
} from "../constants";

const resolvers = {
  Query: {
    user: async (parent, { username }, { req: { authorized } }, info) => {
      if (!authorized) return null;

      const user = await DB.User.findOne({ username });

      return { ...user._doc };
    },
    video: async (
      parent,
      { id, cId },
      { req: { username, authorized } },
      info
    ) => {
      const video = await DB.Video.findOne({ _id: id });

      if (cId) {
        let comm = await DB.VideoComment.findOne({ _id: cId });
        comm = comm.toObject();
        comm.highlighted = true;
        while (comm.replyId) {
          let user = await DB.User.findOne({ username: comm.username });
          comm.user = {};
          comm.user.username = user.username;
          comm.user.profilePic = user.profilePic;
          let c = await DB.VideoComment.findOne({ _id: comm.replyId });
          c = c.toObject();
          c.replies = JSON.stringify([comm]);
          comm = c;
        }

        let comms = await DB.VideoComment.find({
          videoId: id,
          _id: { $ne: comm._id },
          replyId: null,
        })
          .sort({
            createdAt: -1,
          })
          .limit(9);
        video.comments = [comm, ...comms];
      }
      return video;
    },
    commentsSearch: async (
      parent,
      { username, page },
      { req: { authorized } },
      info
    ) => {
      if (!authorized) return null;
      if (!page) page = 0;

      let vidComms = await DB.VideoComment.find({ username });
      let imgComms = await DB.ImageComment.find({ username });
      let noteComms = await DB.NoteComment.find({ username });

      const comms = [...vidComms, ...imgComms, ...noteComms]
        .sort((a, b) =>
          new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
        )
        .slice(page * 10, page * 10 + 10);
      return { comments: comms };
    },
    videoSearch: async (
      parent,
      { username, searchText, page },
      { req: { authorized } },
      info
    ) => {
      if (!authorized) return null;

      const criteria = {};
      if (!page) page = 0;
      if (username) criteria.username = username;
      if (searchText) criteria.title = { $regex: searchText, $options: "i" };

      const totalCount = await DB.Video.find(criteria).countDocuments();
      const videos = await DB.Video.find(criteria)
        .sort({
          uploadedAt: -1,
        })
        .skip(page * perPage)
        .limit(perPage)
        .select({
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

      return {
        videos,
        hasMore: totalCount > page * perPage + perPage,
      };
    },
    imageSearch: async (
      parent,
      { username, searchText, page },
      { req: { authorized } },
      info
    ) => {
      if (!authorized) return null;

      const criteria = {};
      if (!page) page = 0;
      if (username) criteria.username = username;
      if (searchText) criteria.title = { $regex: searchText, $options: "i" };

      const totalCount = await DB.Image.find(criteria).countDocuments();
      const images = await DB.Image.find(criteria)
        .sort({
          uploadedAt: -1,
        })
        .skip(page * perPage)
        .limit(perPage)
        .select({
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

      return {
        images,
        hasMore: totalCount > page * perPage + perPage,
      };
    },
    noteSearch: async (
      parent,
      { username, searchText, page },
      { req: { authorized } },
      info
    ) => {
      if (!authorized) return null;

      const criteria = {};
      if (!page) page = 0;
      if (username) criteria.username = username;
      if (searchText) criteria.body = { $regex: searchText, $options: "i" };

      const totalCount = await DB.Note.find(criteria).countDocuments();
      const notes = await DB.Note.find(criteria)
        .sort({
          uploadedAt: -1,
        })
        .skip(page * perPage)
        .limit(perPage)
        .select({
          likeCount: 1,
          dislikeCount: 1,
          commentCount: 1,
          username: 1,
          body: 1,
          uploadedAt: 1,
          _id: 1,
        });

      return {
        notes,
        hasMore: totalCount > page * perPage + perPage,
      };
    },

    image: async (
      parent,
      { id, cId },
      { req: { username, authorized } },
      info
    ) => {
      if (!authorized) return null;

      const image = await DB.Image.findOne({ _id: id });

      if (cId) {
        let comm = await DB.ImageComment.findOne({ _id: cId });
        comm = comm.toObject();
        comm.highlighted = true;
        while (comm.replyId) {
          let user = await DB.User.findOne({ username: comm.username });
          comm.user = {};
          comm.user.username = user.username;
          comm.user.profilePic = user.profilePic;

          let c = await DB.ImageComment.findOne({ _id: comm.replyId });
          c = c.toObject();
          c.replies = JSON.stringify([comm]);
          comm = c;
        }

        let comms = await DB.ImageComment.find({
          imageId: id,
          _id: { $ne: comm._id },
          replyId: null,
        })
          .sort({
            createdAt: -1,
          })
          .limit(9);
        image.comments = [comm, ...comms];
      }

      return image;
    },
    note: async (
      parent,
      { id, cId },
      { req: { username, authorized } },
      info
    ) => {
      if (!authorized) return null;

      const note = await DB.Note.findOne({ _id: id });

      if (cId) {
        let comm = await DB.NoteComment.findOne({ _id: cId });
        comm = comm.toObject();
        comm.highlighted = true;
        while (comm.replyId) {
          let user = await DB.User.findOne({ username: comm.username });
          comm.user = {};
          comm.user.username = user.username;
          comm.user.profilePic = user.profilePic;
          let c = await DB.NoteComment.findOne({ _id: comm.replyId });
          c = c.toObject();
          c.replies = JSON.stringify([comm]);
          comm = c;
        }

        let comms = await DB.NoteComment.find({
          noteId: id,
          _id: { $ne: comm._id },
          replyId: null,
        })
          .sort({
            createdAt: -1,
          })
          .limit(9);
        note.comments = [comm, ...comms];
      }
      return note;
    },

    newsfeedVideos: async (
      parent,
      { lastOldest },
      { req: { username, authorized } },
      info
    ) => {
      if (!authorized) return null;

      const criteria = lastOldest ? { uploadedAt: { $lt: lastOldest } } : {};

      const videos = await DB.Video.find(criteria)
        .sort({
          uploadedAt: -1,
        })
        .limit(10);

      return videos;
    },
    newsfeedImages: async (
      parent,
      { lastOldest },
      { req: { username, authorized } },
      info
    ) => {
      if (!authorized) return null;

      const criteria = lastOldest ? { uploadedAt: { $lt: lastOldest } } : {};

      const images = await DB.Image.find(criteria)
        .sort({
          uploadedAt: -1,
        })
        .limit(10);

      return images;
    },
    newsfeedNotes: async (
      parent,
      { lastOldest },
      { req: { username, authorized } },
      info
    ) => {
      if (!authorized) return null;

      const criteria = lastOldest ? { uploadedAt: { $lt: lastOldest } } : {};

      const notes = await DB.Note.find(criteria)
        .sort({
          uploadedAt: -1,
        })
        .limit(10);

      return notes;
    },

    videoCommentReplies: async (parent, { commentId }) => {
      const replies = await DB.VideoComment.find({ replyId: commentId }).sort({
        createdAt: -1,
      });
      return replies;
    },
    imageCommentReplies: async (parent, { commentId }) => {
      const replies = await DB.ImageComment.find({ replyId: commentId }).sort({
        createdAt: -1,
      });
      return replies;
    },
    noteCommentReplies: async (parent, { commentId }) => {
      const replies = await DB.NoteComment.find({ replyId: commentId }).sort({
        createdAt: -1,
      });
      return replies;
    },
  },

  Mutation: {
    postNote: async (
      parent,
      { body },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

      const note = await DB.Note.create({
        body,
        username,
      });

      let profilePic = await DB.User.findOne({ username }).profilePic;

      note.user = { username, profilePic };
      pubsub.publish(NEWSFEED_NOTE_SUBSCRIPTION_PREFIX, {
        newsfeedNotes: note,
      });

      return note;
    },

    likeNote: async (
      parent,
      { id },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

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

          const notified = await DB.Notification.findOne({
            sender: username,
            targetId: note._id,
            type: "like",
          });
          if (!notified)
            DB.Notification.create({
              sender: username,
              receiver: note.username,
              type: "like",
              target: "note",
              targetId: note._id,
            });
        } else {
          await DB.NoteLike.deleteOne({ username, noteId: id });
          note.likeCount--;
          await note.save();
        }

        pubsub.publish(NEWSFEED_NOTE_SUBSCRIPTION_PREFIX + note._id, {
          newsfeedNoteItem: {
            _id: note._id,
            likeCount: note.likeCount,
            comments: [],
          },
        });
        pubsub.publish(NOTE_SUBSCRIPTION_PREFIX + note._id, {
          noteItem: {
            _id: note._id,
            likeCount: note.likeCount,
            comments: [],
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    dislikeNote: async (
      parent,
      { id },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

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

          const notified = await DB.Notification.findOne({
            sender: username,
            targetId: note._id,
            type: "dislike",
          });
          if (!notified)
            DB.Notification.create({
              sender: username,
              receiver: note.username,
              type: "dislike",
              target: "note",
              targetId: note._id,
            });
        } else {
          await DB.NoteDislike.deleteOne({ username, noteId: id });
          note.dislikeCount--;
          await note.save();
        }

        pubsub.publish(NEWSFEED_NOTE_SUBSCRIPTION_PREFIX + note._id, {
          newsfeedNoteItem: {
            _id: note.id,
            dislikeCount: note.dislikeCount,
            comments: [],
          },
        });
        pubsub.publish(NOTE_SUBSCRIPTION_PREFIX + note._id, {
          noteItem: {
            _id: note.id,
            dislikeCount: note.dislikeCount,
            comments: [],
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    commentNote: async (
      parent,
      { id, body, replyId },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

      try {
        const comment = await DB.NoteComment.create({
          username,
          noteId: id,
          body,
          replyId,
        });

        const note = await DB.Note.findOne({ _id: id });
        note.commentCount++;
        await note.save();

        if (!replyId)
          DB.Notification.create({
            sender: username,
            receiver: note.username,
            type: "comment",
            target: "note",
            targetId: note._id,
            commentId: comment._id,
            body,
          });

        if (replyId) {
          const comm = await DB.NoteComment.findOne({ _id: replyId });
          comm.replyCount++;
          await comm.save();
          DB.Notification.create({
            sender: username,
            receiver: comm.username,
            type: "reply",
            target: "note",
            targetId: note._id,
            commentId: comment._id,
            body,
          });
        }

        pubsub.publish(NEWSFEED_NOTE_SUBSCRIPTION_PREFIX + note._id, {
          newsfeedNoteItem: {
            _id: note._id,
            commentCount: note.commentCount,
            comments: [],
          },
        });
        pubsub.publish(NOTE_SUBSCRIPTION_PREFIX + note._id, {
          noteItem: {
            _id: note._id,
            commentCount: note.commentCount,
            comments: [comment],
          },
        });

        return comment._id;
      } catch (error) {
        return null;
      }
    },
    likeImage: async (
      parent,
      { id },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

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

          const notified = await DB.Notification.findOne({
            sender: username,
            targetId: image._id,
            type: "like",
          });
          if (!notified)
            DB.Notification.create({
              sender: username,
              receiver: image.username,
              type: "like",
              target: "image",
              targetId: image._id,
            });
        } else {
          await DB.ImageLike.deleteOne({ username, imageId: id });
          image.likeCount--;
          await image.save();
        }

        pubsub.publish(NEWSFEED_IMAGE_SUBSCRIPTION_PREFIX + image._id, {
          newsfeedImageItem: {
            _id: image._id,
            likeCount: image.likeCount,
            comments: [],
          },
        });
        pubsub.publish(IMAGE_SUBSCRIPTION_PREFIX + image._id, {
          imageItem: {
            _id: image._id,
            likeCount: image.likeCount,
            comments: [],
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    dislikeImage: async (
      parent,
      { id },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

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

          const notified = await DB.Notification.findOne({
            sender: username,
            targetId: image._id,
            type: "dislike",
          });
          if (!notified)
            DB.Notification.create({
              sender: username,
              receiver: image.username,
              type: "dislike",
              target: "image",
              targetId: image._id,
            });
        } else {
          await DB.ImageDislike.deleteOne({ username, imageId: id });
          image.dislikeCount--;
          await image.save();
        }

        pubsub.publish(NEWSFEED_IMAGE_SUBSCRIPTION_PREFIX + image._id, {
          newsfeedImageItem: {
            _id: image._id,
            dislikeCount: image.dislikeCount,
            comments: [],
          },
        });
        pubsub.publish(IMAGE_SUBSCRIPTION_PREFIX + image._id, {
          imageItem: {
            _id: image._id,
            dislikeCount: image.dislikeCount,
            comments: [],
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    commentImage: async (
      parent,
      { id, body, replyId },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

      try {
        const comment = await DB.ImageComment.create({
          username,
          imageId: id,
          body,
          replyId,
        });

        const image = await DB.Image.findOne({ _id: id });
        image.commentCount++;
        await image.save();

        if (!replyId)
          DB.Notification.create({
            sender: username,
            receiver: image.username,
            type: "comment",
            target: "image",
            targetId: image._id,
            commentId: comment._id,
            body,
          });

        if (replyId) {
          const comm = await DB.ImageComment.findOne({ _id: replyId });
          comm.replyCount++;
          await comm.save();
          DB.Notification.create({
            sender: username,
            receiver: comm.username,
            type: "reply",
            target: "image",
            targetId: image._id,
            commentId: comment._id,
            body,
          });
        }

        pubsub.publish(NEWSFEED_IMAGE_SUBSCRIPTION_PREFIX + image._id, {
          newsfeedImageItem: {
            _id: image._id,
            commentCount: image.commentCount,
            comments: [],
          },
        });
        pubsub.publish(IMAGE_SUBSCRIPTION_PREFIX + image._id, {
          imageItem: {
            _id: image._id,
            commentCount: image.commentCount,
            comments: [comment],
          },
        });

        return comment._id;
      } catch (error) {
        return null;
      }
    },
    likeVideo: async (
      parent,
      { id },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

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

          const notified = await DB.Notification.findOne({
            sender: username,
            targetId: video._id,
            type: "like",
          });
          if (!notified)
            DB.Notification.create({
              sender: username,
              receiver: video.username,
              type: "like",
              target: "video",
              targetId: video._id,
            });
        } else {
          await DB.VideoLike.deleteOne({ username, videoId: id });
          video.likeCount--;
          await video.save();
        }

        pubsub.publish(NEWSFEED_VIDEO_SUBSCRIPTION_PREFIX + video._id, {
          newsfeedVideoItem: {
            _id: video._id,
            likeCount: video.likeCount,
            comments: [],
          },
        });
        pubsub.publish(VIDEO_SUBSCRIPTION_PREFIX + video._id, {
          videoItem: {
            _id: video._id,
            likeCount: video.likeCount,
            comments: [],
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    dislikeVideo: async (
      parent,
      { id },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

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

          const notified = await DB.Notification.findOne({
            sender: username,
            targetId: video._id,
            type: "dislike",
          });
          if (!notified)
            DB.Notification.create({
              sender: username,
              receiver: video.username,
              type: "dislike",
              target: "video",
              targetId: video._id,
            });
        } else {
          await DB.VideoDislike.deleteOne({ username, videoId: id });
          video.dislikeCount--;
          await video.save();
        }

        pubsub.publish(NEWSFEED_VIDEO_SUBSCRIPTION_PREFIX + video._id, {
          newsfeedVideoItem: {
            _id: video._id,
            dislikeCount: video.dislikeCount,
            comments: [],
          },
        });
        pubsub.publish(VIDEO_SUBSCRIPTION_PREFIX + video._id, {
          videoItem: {
            _id: video._id,
            dislikeCount: video.dislikeCount,
            comments: [],
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    viewVideo: async (
      parent,
      { id },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

      try {
        const viewed = await DB.VideoView.findOne({ username, videoId: id });

        if (viewed) return true;

        await DB.VideoView.create({
          username,
          videoId: id,
        });

        const video = await DB.Video.findOne({ _id: id });
        video.viewCount = video.viewCount + 1;
        await video.save();

        pubsub.publish(VIDEO_SUBSCRIPTION_PREFIX + video._id, {
          videoItem: {
            _id: video._id,
            viewCount: video.viewCount,
            comments: [],
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    commentVideo: async (
      parent,
      { id, body, replyId },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

      try {
        const comment = await DB.VideoComment.create({
          username,
          videoId: id,
          body,
          replyId,
        });

        const video = await DB.Video.findOne({ _id: id });
        video.commentCount++;
        await video.save();

        if (!replyId)
          DB.Notification.create({
            sender: username,
            receiver: video.username,
            type: "comment",
            target: "video",
            targetId: video._id,
            commentId: comment._id,
            body,
          });

        if (replyId) {
          const comm = await DB.VideoComment.findOne({ _id: replyId });
          comm.replyCount++;
          await comm.save();
          DB.Notification.create({
            sender: username,
            receiver: comm.username,
            type: "reply",
            target: "video",
            targetId: video._id,
            commentId: comment._id,
            body,
          });
        }

        pubsub.publish(NEWSFEED_VIDEO_SUBSCRIPTION_PREFIX + video._id, {
          newsfeedVideoItem: {
            _id: video._id,
            commentCount: video.commentCount,
            comments: [],
          },
        });
        pubsub.publish(VIDEO_SUBSCRIPTION_PREFIX + video._id, {
          videoItem: {
            _id: video._id,
            commentCount: video.commentCount,
            comments: [comment],
          },
        });

        return comment._id;
      } catch (error) {
        return error;
      }
    },
    likeVideoComment: async (
      parent,
      { videoId, commentId },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

      try {
        const liked = await DB.VideoCommentLike.findOne({
          username,
          commentId,
        });
        const videoComment = await DB.VideoComment.findOne({ _id: commentId });
        if (!liked) {
          await DB.VideoCommentLike.create({
            username,
            videoId,
            commentId,
          });
          videoComment.likeCount++;
          await videoComment.save();
        } else {
          await DB.VideoCommentLike.deleteOne({ username, commentId });
          videoComment.likeCount--;
          await videoComment.save();
        }

        pubsub.publish(VIDEO_SUBSCRIPTION_PREFIX + videoId, {
          videoItem: {
            _id: videoId,
            comments: [{ _id: commentId, likeCount: videoComment.likeCount }],
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    dislikeVideoComment: async (
      parent,
      { videoId, commentId },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

      try {
        const disliked = await DB.VideoCommentDislike.findOne({
          username,
          commentId,
        });
        const videoComment = await DB.VideoComment.findOne({ _id: commentId });
        if (!disliked) {
          await DB.VideoCommentDislike.create({
            username,
            videoId,
            commentId,
          });
          videoComment.dislikeCount++;
          await videoComment.save();
        } else {
          await DB.VideoCommentDislike.deleteOne({ username, commentId });
          videoComment.dislikeCount--;
          await videoComment.save();
        }

        pubsub.publish(VIDEO_SUBSCRIPTION_PREFIX + videoId, {
          videoItem: {
            _id: videoId,
            comments: [
              { _id: commentId, dislikeCount: videoComment.dislikeCount },
            ],
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    likeNoteComment: async (
      parent,
      { noteId, commentId },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

      try {
        const liked = await DB.NoteCommentLike.findOne({
          username,
          commentId,
        });
        const noteComment = await DB.NoteComment.findOne({ _id: commentId });
        if (!liked) {
          await DB.NoteCommentLike.create({
            username,
            noteId,
            commentId,
          });
          noteComment.likeCount++;
          await noteComment.save();
        } else {
          await DB.NoteCommentLike.deleteOne({ username, commentId });
          noteComment.likeCount--;
          await noteComment.save();
        }

        pubsub.publish(NOTE_SUBSCRIPTION_PREFIX + noteId, {
          noteItem: {
            _id: noteId,
            comments: [{ _id: commentId, likeCount: noteComment.likeCount }],
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    dislikeNoteComment: async (
      parent,
      { noteId, commentId },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

      try {
        const disliked = await DB.NoteCommentDislike.findOne({
          username,
          commentId,
        });
        const noteComment = await DB.NoteComment.findOne({ _id: commentId });
        if (!disliked) {
          await DB.NoteCommentDislike.create({
            username,
            noteId,
            commentId,
          });
          noteComment.dislikeCount++;
          await noteComment.save();
        } else {
          await DB.NoteCommentDislike.deleteOne({ username, commentId });
          noteComment.dislikeCount--;
          await noteComment.save();
        }

        pubsub.publish(NOTE_SUBSCRIPTION_PREFIX + noteId, {
          noteItem: {
            _id: noteId,
            comments: [
              { _id: commentId, dislikeCount: noteComment.dislikeCount },
            ],
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    likeImageComment: async (
      parent,
      { imageId, commentId },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

      try {
        const liked = await DB.ImageCommentLike.findOne({
          username,
          commentId,
        });
        const imageComment = await DB.ImageComment.findOne({ _id: commentId });
        if (!liked) {
          await DB.ImageCommentLike.create({
            username,
            imageId,
            commentId,
          });
          imageComment.likeCount++;
          await imageComment.save();
        } else {
          await DB.ImageCommentLike.deleteOne({ username, commentId });
          imageComment.likeCount--;
          await imageComment.save();
        }

        pubsub.publish(IMAGE_SUBSCRIPTION_PREFIX + imageId, {
          imageItem: {
            _id: imageId,
            comments: [{ _id: commentId, likeCount: imageComment.likeCount }],
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    dislikeImageComment: async (
      parent,
      { imageId, commentId },
      { req: { username, authorized }, pubsub },
      info
    ) => {
      if (!authorized) return null;

      try {
        const disliked = await DB.ImageCommentDislike.findOne({
          username,
          commentId,
        });
        const imageComment = await DB.ImageComment.findOne({ _id: commentId });
        if (!disliked) {
          await DB.ImageCommentDislike.create({
            username,
            imageId,
            commentId,
          });
          imageComment.dislikeCount++;
          await imageComment.save();
        } else {
          await DB.ImageCommentDislike.deleteOne({ username, commentId });
          imageComment.dislikeCount--;
          await imageComment.save();
        }

        pubsub.publish(IMAGE_SUBSCRIPTION_PREFIX + imageId, {
          imageItem: {
            _id: imageId,
            comments: [
              { _id: commentId, dislikeCount: imageComment.dislikeCount },
            ],
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    markNotificationsRead: async (
      parent,
      { ids },
      { req: { username, authorized } },
      info
    ) => {
      if (!authorized) return null;

      try {
        await DB.Notification.updateMany(
          { _id: { $in: ids } },
          { read: true, readAt: Date.now() }
        );
        return true;
      } catch (e) {
        return false;
      }
    },
  },

  Note: {
    user: async ({ username }, args, context, info) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
    liked: async ({ _id, username }, args, context, info) => {
      const liked = await DB.NoteLike.findOne({ username, noteId: _id });
      return !!liked;
    },
    disliked: async ({ _id, username }, args, context, info) => {
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
    comments: async ({ _id, comments }, { lastOldest }, context, info) => {
      if (comments) return comments;

      const criteria = lastOldest
        ? { createdAt: { $lt: lastOldest }, replyId: null }
        : { replyId: null };

      const c = await DB.NoteComment.find({ noteId: _id, ...criteria })
        .sort({
          createdAt: -1,
        })
        .limit(10);
      return c;
    },
  },

  NoteComment: {
    user: async ({ username }, args, context) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
    liked: async ({ _id, username }, args, context, info) => {
      const liked = await DB.NoteCommentLike.findOne({
        username,
        commentId: _id,
      });
      return !!liked;
    },
    disliked: async ({ _id, username }, args, context, info) => {
      const disliked = await DB.NoteCommentDislike.findOne({
        username,
        commentId: _id,
      });

      return !!disliked;
    },
    note: async ({ noteId }, args, context) => {
      return await DB.Note.findOne({ _id: noteId });
    },
  },

  Image: {
    user: async ({ username }, args, context, info) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
    liked: async ({ _id, username }, args, context, info) => {
      const liked = await DB.ImageLike.findOne({ username, imageId: _id });
      return !!liked;
    },
    disliked: async ({ _id, username }, args, context, info) => {
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
    comments: async ({ _id, comments }, { lastOldest }, context, info) => {
      if (comments) return comments;

      const criteria = lastOldest
        ? { createdAt: { $lt: lastOldest }, replyId: null }
        : { replyId: null };

      const c = await DB.ImageComment.find({ imageId: _id, ...criteria })
        .sort({
          createdAt: -1,
        })
        .limit(10);
      return c;
    },

    thumbUrl: async ({ url }, args, context, info) => {
      return url;
    },
  },

  ImageComment: {
    user: async ({ username }, args, context) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
    liked: async ({ _id, username }, args, context, info) => {
      const liked = await DB.ImageCommentLike.findOne({
        username,
        commentId: _id,
      });
      return !!liked;
    },
    disliked: async ({ _id, username }, args, context, info) => {
      const disliked = await DB.ImageCommentDislike.findOne({
        username,
        commentId: _id,
      });

      return !!disliked;
    },
    image: async ({ imageId }, args, context) => {
      return await DB.Image.findOne({ _id: imageId });
    },
  },

  Video: {
    user: async ({ username }, args, context, info) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
    liked: async ({ _id, username }, args, context, info) => {
      const liked = await DB.VideoLike.findOne({ username, videoId: _id });
      return !!liked;
    },
    disliked: async ({ _id, username }, args, context, info) => {
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
    comments: async ({ _id, comments }, { lastOldest }, context, info) => {
      if (comments) return comments;

      const criteria = lastOldest
        ? { createdAt: { $lt: lastOldest }, replyId: null }
        : { replyId: null };

      const c = await DB.VideoComment.find({ videoId: _id, ...criteria })
        .sort({
          createdAt: -1,
        })
        .limit(10);
      return c;
    },
  },

  VideoComment: {
    user: async ({ username }, args, context) => {
      const user = await DB.User.findOne({ username });
      return user;
    },
    liked: async ({ _id, username }, args, context, info) => {
      const liked = await DB.VideoCommentLike.findOne({
        username,
        commentId: _id,
      });
      return !!liked;
    },
    disliked: async ({ _id, username }, args, context, info) => {
      const disliked = await DB.VideoCommentDislike.findOne({
        username,
        commentId: _id,
      });

      return !!disliked;
    },
    video: async ({ videoId }, args, context) => {
      let vid = await DB.Video.findOne({ _id: videoId });
      return vid;
    },
  },
  AnyComment: {
    __resolveType(obj, context, info) {
      if (obj.videoId) return "VideoComment";
      if (obj.imageId) return "ImageComment";
      if (obj.noteId) return "NoteComment";
    },
  },
  UserResponse: {
    notifications: async (
      parent,
      args,
      { req: { username, authorized } },
      info
    ) => {
      if (!authorized) return null;

      const notifications = await DB.Notification.find({
        receiver: username,
      })
        .sort({
          createdAt: -1,
        })
        .limit(1000);
      return notifications;
    },
    comments: async (
      { username, commentPage },
      args,
      { req: { authorized } },
      info
    ) => {
      if (!authorized) return null;

      if (!commentPage) commentPage = 0;

      let vidComms = await DB.VideoComment.find({ username });
      let imgComms = await DB.ImageComment.find({ username });
      let noteComms = await DB.NoteComment.find({ username });

      const comms = [...vidComms, ...imgComms, ...noteComms]
        .sort((a, b) =>
          new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
        )
        .slice(commentPage * 10, commentPage * 10 + 10);
      return comms;
    },
    commentCount: async ({ username }, args, { req: { authorized } }, info) => {
      if (!authorized) return null;
      let totalCount = 0;
      totalCount += await DB.VideoComment.find({ username }).countDocuments();
      totalCount += await DB.ImageComment.find({ username }).countDocuments();
      totalCount += await DB.NoteComment.find({ username }).countDocuments();

      return totalCount;
    },
    videoCount: async ({ username }, args, { req: { authorized } }, info) => {
      if (!authorized) return null;

      return await DB.Video.find({ username }).countDocuments();
    },
    imageCount: async ({ username }, args, { req: { authorized } }, info) => {
      if (!authorized) return null;

      return await DB.Image.find({ username }).countDocuments();
    },
    noteCount: async ({ username }, args, { req: { authorized } }, info) => {
      if (!authorized) return null;

      return await DB.Note.find({ username }).countDocuments();
    },
    notes: async (
      { username, notePage },
      args,
      { req: { authorized } },
      info
    ) => {
      if (!authorized) return null;

      if (!notePage) notePage = 0;

      const notes = await DB.Note.find({ username })
        .sort({
          uploadedAt: -1,
        })
        .skip(notePage * perPage)
        .limit(perPage)
        .select({
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
    images: async (
      { username, imgPage },
      args,
      { req: { authorized } },
      info
    ) => {
      if (!authorized) return null;

      if (!imgPage) imgPage = 0;

      const images = await DB.Image.find({ username })
        .sort({
          uploadedAt: -1,
        })
        .skip(imgPage * perPage)
        .limit(perPage)
        .select({
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
    videos: async (
      { username, vidPage },
      args,
      { req: { authorized } },
      info
    ) => {
      if (!authorized) return null;

      if (!vidPage) vidPage = 0;

      const videos = await DB.Video.find({ username })
        .sort({
          uploadedAt: -1,
        })
        .skip(vidPage * perPage)
        .limit(perPage)
        .select({
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
    charges: async ({ username }, args, { req: { authorized } }) => {
      //if (!authorized) return null;

      const charges = await DB.Charge.find({ username });
      return charges;
    },
    subscriptions: async ({ username }, args, { req: { authorized } }) => {
      //if (!authorized) return null;

      const subs = await DB.Subscription.find({ username });
      return subs;
    },
  },
  Subscription: {
    notifications: {
      subscribe: (parent, { username }, { pubsub }, info) => {
        return pubsub.asyncIterator(
          NOTIFICATION_SUBSCRIPTION_PREFIX + username
        );
      },
    },
    newsfeedVideos: {
      subscribe: (parent, args, { pubsub }, info) => {
        return pubsub.asyncIterator(NEWSFEED_VIDEO_SUBSCRIPTION_PREFIX);
      },
    },
    newsfeedVideoItem: {
      subscribe: (parent, { videoId }, { pubsub }, info) => {
        return pubsub.asyncIterator(
          NEWSFEED_VIDEO_SUBSCRIPTION_PREFIX + videoId
        );
      },
    },
    videoItem: {
      subscribe: (parent, { videoId }, { pubsub }, info) => {
        return pubsub.asyncIterator(VIDEO_SUBSCRIPTION_PREFIX + videoId);
      },
    },
    newsfeedImages: {
      subscribe: (parent, args, { pubsub }, info) => {
        return pubsub.asyncIterator(NEWSFEED_IMAGE_SUBSCRIPTION_PREFIX);
      },
    },
    newsfeedImageItem: {
      subscribe: (parent, { imageId }, { pubsub }, info) => {
        return pubsub.asyncIterator(
          NEWSFEED_IMAGE_SUBSCRIPTION_PREFIX + imageId
        );
      },
    },
    imageItem: {
      subscribe: (parent, { imageId }, { pubsub }, info) => {
        return pubsub.asyncIterator(IMAGE_SUBSCRIPTION_PREFIX + imageId);
      },
    },
    newsfeedNotes: {
      subscribe: (parent, args, { pubsub }, info) => {
        return pubsub.asyncIterator(NEWSFEED_NOTE_SUBSCRIPTION_PREFIX);
      },
    },
    newsfeedNoteItem: {
      subscribe: (parent, { noteId }, { pubsub }, info) => {
        return pubsub.asyncIterator(NEWSFEED_NOTE_SUBSCRIPTION_PREFIX + noteId);
      },
    },
    noteItem: {
      subscribe: (parent, { noteId }, { pubsub }, info) => {
        return pubsub.asyncIterator(NOTE_SUBSCRIPTION_PREFIX + noteId);
      },
    },
  },
};

export default resolvers;
