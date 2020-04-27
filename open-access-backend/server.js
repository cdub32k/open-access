import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ApolloServer } from "apollo-server-express";

import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import jwt from "jsonwebtoken";

const stripe = require("stripe")(process.env.STRIPE_SK);

import authRouter from "./routes/auth";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRouter);

app.use("/payment/initiate", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2500,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
  });

  res.send({
    client_secret: paymentIntent.client_secret,
  });
});

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
