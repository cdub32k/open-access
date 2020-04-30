import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import multer from "multer";

const { Video } = require("../database");

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
    const video = await Video.create({
      username: req.username,
      url: `http://localhost:5000/vid/${req.username}/${req.files["video"][0].filename}`,
      thumbUrl: `http://localhost:5000/vid/${req.username}/${req.files["thumb"][0].filename}`,
      title: req.body.title,
      caption: req.body.caption,
    });

    return res.send({ video });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong" + error });
  }
});

export default router;
