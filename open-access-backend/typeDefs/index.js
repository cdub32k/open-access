import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    user(username: String!): User
    video(id: String!): Video
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
    _id: String
    body: String
  }

  type Image {
    _id: String
    url: String
    title: String
    caption: String
    uploadedAt: Date
  }

  type Video {
    _id: String
    url: String
    thumbUrl: String
    title: String
    caption: String
    views: Int
    uploadedAt: Date
  }
`;

export default typeDefs;
