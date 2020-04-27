import dotenv from "dotenv";
dotenv.config();

const router = require("express").Router();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../database/models/User";

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw new res.status(404).send({ error: "User not found." });
    const passwordIsValid = bcrypt.compareSync(password, user.passwordHash);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).send({ auth: true, token });
  } catch (err) {
    return res.status(500).send({ error: "Something went wrong." });
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    //TODO validate email,username,password

    const { password, email, username } = req.body;
    const passwordHash = bcrypt.hashSync(password, 8);
    const user = await User.create({
      email,
      username,
      passwordHash,
    });

    if (!user) res.status(500).send({ error: "Error while creating user." });

    return res.status(200).send({ user });
  } catch (err) {
    return res.status(500).send({ error: "Something went wrong." });
  }
});

export default router;
