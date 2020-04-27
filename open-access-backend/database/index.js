import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User";

dotenv.config();

class Database {
  constructor() {
    this._connect();
    this.User = User;
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
    mongoose.disconnect();
  }
}

module.exports = new Database();
