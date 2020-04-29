import dotenv from "dotenv";
dotenv.config();

import multer from "multer";

const { Image } = require("../database");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/img/${req.username}`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage }).single("file");

router.post("/upload", upload, async (req, res) => {
  try {
    const image = await Image.create({
      username: req.username,
      url: `http://localhost:5000/img/${req.username}/${req.file.filename}`,
    });

    return res.send({ image });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong" + error });
  }
});

export default router;
