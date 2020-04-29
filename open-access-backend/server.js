import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ApolloServer } from "apollo-server-express";

import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import jwt from "jsonwebtoken";

import authRouter from "./routes/auth";
import paymentRouter from "./routes/payment";
import videoRouter from "./routes/video";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const verifyTokenMiddleware = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ error: "Forbidden" });
  }

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded.username) {
      return res.status(403).send({ error: "Forbidden" });
    }
    req.authorized = true;
    req.username = decoded.username;
    req.email = decoded.email;
    return next();
  });
};

app.use("/auth", authRouter);

app.use("/payment", verifyTokenMiddleware, paymentRouter);

app.use("/videos", verifyTokenMiddleware, videoRouter);

app.use(express.static("public"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    let token = req.headers["authorization"];
    if (!token) {
      req.authorized = false;
    }

    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || !decoded.username) {
        req.authorized = false;
      }
      req.authorized = true;
      req.username = decoded.username;
    });

    return { req };
  },
});
server.applyMiddleware({ app, path: "/api" });

app.listen({ port: process.env.PORT }, () =>
  console.log(
    `Server reading at http://localhost:5000\nGraphql server at path ${server.graphqlPath}`
  )
);
