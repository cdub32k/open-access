import dotenv from "dotenv";
dotenv.config();

import multer from "multer";

const { Video } = require("../database");

const router = require("express").Router();

router.get("/user/:username", async (req, res) => {
  try {
    const videos = await Video.find({ username: req.params.username }).select({
      url: 1,
      uploadedAt: 1,
      _id: 0,
    });

    res.send({ videos });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/videos/${req.username}`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage }).single("file");

router.post("/upload", upload, async (req, res) => {
  try {
    const video = await Video.create({
      username: req.username,
      url: `http://localhost:5000/vid/${req.username}/${req.file.filename}`,
    });

    return res.send({ video });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong" + error });
  }
});

export default router;
