import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    user(username: String!): User
    video(id: String!): Video
    image(id: String!): Image
    note(id: String!): Note
  }

  type Mutation {
    postNote(body: String): Note
  }

  type User {
    profilePic: String
    username: String
    email: String
    phoneNumber: String
    country: String
    city: String
    state: String
    bio: String
    notes: [Note]
    images: [Image]
    videos: [Video]
  }

  scalar Date

  type Note {
    user: User
    _id: String
    body: String
    uploadedAt: Date
  }

  type Image {
    user: User
    _id: String
    url: String
    title: String
    caption: String
    uploadedAt: Date
  }

  type Video {
    user: User
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
