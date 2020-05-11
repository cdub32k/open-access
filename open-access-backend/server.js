import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import pubsub from "./PubSub";

import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import jwt from "jsonwebtoken";

import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import paymentRouter from "./routes/payment";
import imageRouter from "./routes/image";
import videoRouter from "./routes/video";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const app = express();

app.use(
  cors({
    origin: "http://localhost:9000",
    credentials: true,
  })
);
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

app.use("/users", verifyTokenMiddleware, userRouter);

app.use("/payment", verifyTokenMiddleware, paymentRouter);

app.use("/images", verifyTokenMiddleware, imageRouter);

app.use("/videos", verifyTokenMiddleware, videoRouter);

app.use(express.static("public"));

const gqlServer = new ApolloServer({
  cors: false,
  typeDefs,
  resolvers,
  subscriptions: {
    path: "/subs",
  },
  context: async ({ req, connection }) => {
    try {
      if (connection) return { ...connection.context, pubsub };

      let token = req.headers["authorization"];
      if (!token) {
        req.authorized = false;
        return { req };
      }

      token = token.replace("Bearer ", "");
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded.username) {
        req.authorized = false;
        return { req };
      }

      req.authorized = true;
      req.username = decoded.username;
      return { req, pubsub };
    } catch (e) {
      req.authorized = false;
      return { req };
    }
  },
});

gqlServer.applyMiddleware({
  app,
  path: "/api",
  cors: false,
});

const httpServer = createServer(app);
gqlServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: process.env.PORT }, () => {
  console.log(
    `Graphql Server reading at http://localhost:${process.env.PORT}${gqlServer.graphqlPath}`
  );
  console.log(
    `Subscriptions ready at ws://localhost:${process.env.PORT}${gqlServer.subscriptionsPath}`
  );
});
