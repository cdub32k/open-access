import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import multer from "multer";
import pubsub from "../PubSub";
import { NEWSFEED_VIDEO_SUBSCRIPTION_PREFIX } from "../constants";

const {
  Video,
  VideoView,
  VideoLike,
  VideoDislike,
  VideoComment,
  User,
} = require("../database");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `public/vid/${req.username}`;
    cb(null, path);
  },
  filename: (req, file, cb) => {
    var filename = file.originalname;
    var fileExtension = filename.split(".")[filename.split(".").length - 1];
    cb(null, Date.now() + "." + fileExtension);
  },
});
const upload = multer({ storage }).fields([
  { name: "video", maxCount: 1 },
  { name: "thumb", maxCount: 1 },
]);

router.post("/upload", upload, async (req, res) => {
  try {
    const username = req.username;

    const video = await Video.create({
      username,
      url: `http://localhost:5000/vid/${req.username}/${req.files["video"][0].filename}`,
      thumbUrl: `http://localhost:5000/vid/${req.username}/${req.files["thumb"][0].filename}`,
      title: req.body.title,
      caption: req.body.caption,
    });

    let profilePic = await User.findOne({ username }).profilePic;

    let user = { username, profilePic };
    video.user = user;
    pubsub.publish(NEWSFEED_VIDEO_SUBSCRIPTION_PREFIX, {
      newsfeedVideos: video,
    });

    return res.send({ video });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong" });
  }
});

router.delete("/comments/:id", async (req, res) => {
  try {
    const vComment = await VideoComment.findOne({ _id: req.params.id });
    if (vComment) {
      await Video.updateOne(
        { _id: vComment.videoId },
        { $inc: { commentCount: -1 } }
      );
      await vComment.delete();
    }

    return res.status(200).send(true);
  } catch (e) {
    res.status(500).send({ error: "Something went wrong" + e });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const video = await Video.findOne({ _id: req.params.id });

    fs.unlink(`public/${video.url.split("5000/")[1]}`);
    fs.unlink(`public/${video.thumbUrl.split("5000/")[1]}`);

    await VideoLike.deleteMany({ videoId: video._id });
    await VideoDislike.deleteMany({ videoId: video._id });
    await VideoComment.deleteMany({ videoId: video._id });
    await VideoView.deleteMany({ videoId: video._id });
    await video.delete();

    return res.status(200).send(true);
  } catch (e) {
    res.status(500).send({ error: "Something went wrong" });
  }
});

export default router;
