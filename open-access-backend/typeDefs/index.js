import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    user(username: String!): User
  }

  type Mutation {
    postNote(body: String): Note
  }

  type User {
    username: String
    email: String
    notes: [Note]
    images: [Image]
    videos: [Video]
  }

  scalar Date

  type Note {
    body: String
  }

  type Image {
    url: String
    title: String
    caption: String
    uploadedAt: Date
  }

  type Video {
    url: String
    thumbUrl: String
    title: String
    caption: String
    views: Int
    uploadedAt: Date
  }
`;

export default typeDefs;
