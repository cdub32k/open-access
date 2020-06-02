import dotenv from "dotenv";
dotenv.config();

import multer from "multer";
import pubsub from "../PubSub";
import { NEWSFEED_IMAGE_SUBSCRIPTION_PREFIX } from "../constants";

const { Image, User } = require("../database");

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

export default router;
