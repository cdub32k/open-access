import dotenv from "dotenv";
dotenv.config();

import multer from "multer";

const { Image } = require("../database");

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
    const image = await Image.create({
      username: req.username,
      url: `http://localhost:5000/img/${req.username}/${req.files["image"][0].filename}`,
      title: req.body.title,
      caption: req.body.caption,
    });

    return res.send({ image });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong" + error });
  }
});

export default router;
