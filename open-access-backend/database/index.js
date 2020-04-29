import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/user";
import Charge from "./models/charge";
import Subscription from "./models/subcription";
import Video from "./models/video";
import Image from "./models/image";
import Note from "./models/note";

dotenv.config();

class Database {
  constructor() {
    this._connect();
    this.User = User;
    this.Charge = Charge;
    this.Subscription = Subscription;
    this.Video = Video;
    this.Image = Image;
    this.Note = Note;
  }

  _connect() {
    mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }

  disconnect() {
    mongoose
      .disconnect()
      .then(() => {
        console.log("Database disconnected successfully");
      })
      .catch((err) => {
        console.error("Error while disconnecting from database");
      });
  }
}

module.exports = new Database();
