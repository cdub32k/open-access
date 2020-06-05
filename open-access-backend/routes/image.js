import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import multer from "multer";
import pubsub from "../PubSub";
import { NEWSFEED_IMAGE_SUBSCRIPTION_PREFIX } from "../constants";

const {
  Image,
  ImageLike,
  ImageDislike,
  ImageComment,
  User,
} = require("../database");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `public/img/${req.username}`;
    cb(null, path);
  },
  filename: (req, file, cb) => {
    var filename = file.originalname;
    var fileExtension = filename.split(".")[filename.split(".").length - 1];
    cb(null, Date.now() + "." + fileExtension);
  },
});

const upload = multer({ storage }).fields([{ name: "image", maxCount: 1 }]);

router.post("/upload", upload, async (req, res) => {
  try {
    const username = req.username;
    const image = await Image.create({
      username,
      url: `http://localhost:5000/img/${req.username}/${req.files["image"][0].filename}`,
      title: req.body.title,
      caption: req.body.caption,
    });

    let profilePic = await User.findOne({ username }).profilePic;

    let user = { username, profilePic };
    image.user = user;
    pubsub.publish(NEWSFEED_IMAGE_SUBSCRIPTION_PREFIX, {
      newsfeedImages: image,
    });

    return res.send({ image });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong" + error });
  }
});

const profStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `public/img/${req.username}`;
    cb(null, path);
  },
  filename: (req, file, cb) => {
    var filename = file.originalname;
    var fileExtension = filename.split(".")[filename.split(".").length - 1];
    cb(null, "profile." + fileExtension);
  },
});

const profUpload = multer({ storage: profStorage }).fields([
  { name: "image", maxCount: 1 },
]);

router.post("/profile/upload", profUpload, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.username });
    user.profilePic = `http://localhost:5000/img/${req.username}/${req.files["image"][0].filename}`;
    await user.save();

    res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong" + error });
  }
});

router.delete("/comments/:id", async (req, res) => {
  try {
    const iComment = await ImageComment.findOne({ _id: req.params.id });
    if (iComment) {
      await Image.updateOne(
        { _id: iComment.imageId },
        { $inc: { commentCount: -1 } }
      );
      await iComment.delete();
    }
    return res.status(200).send(true);
  } catch (e) {
    res.status(500).send({ error: "Something went wrong" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id });

    fs.unlink(`public/${image.url.split("5000/")[1]}`);
    //fs.unlink(`public/${image.thumbUrl.split("5000/")[1]}`);

    await ImageLike.deleteMany({ imageId: image._id });
    await ImageDislike.deleteMany({ imageId: image._id });
    await ImageComment.deleteMany({ imageId: image._id });
    await image.delete();

    return res.status(200).send(true);
  } catch (e) {
    res.status(500).send({ error: "Something went wrong" });
  }
});

export default router;
