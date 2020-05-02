import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    user(username: String!): User
    video(id: String!): Video
    image(id: String!): Image
    note(id: String!): Note
  }

  type Mutation {
    postNote(body: String!): Note
    likeVideo(id: String!): Boolean
    dislikeVideo(id: String!): Boolean
    viewVideo(id: String!): Boolean
    commentVideo(id: String!, body: String!): Boolean
  }

  scalar Date

  type User {
    profilePic: String
    username: String
    email: String
    displayName: String
    phoneNumber: String
    country: String
    city: String
    state: String
    bio: String
    joinedAt: Date
    notes: [Note]
    images: [Image]
    videos: [Video]
  }

  type VideoLike {
    user: User
    Video: Video
    createdAt: Date
  }

  type VideoDislike {
    user: User
    Video: Video
    createdAt: Date
  }

  type VideoView {
    user: User
    Video: Video
    createdAt: Date
  }

  type VideoComment {
    user: User
    Video: Video
    body: String
    createdAt: Date
  }

  type Note {
    user: User
    _id: String
    body: String
    likeCount: Int
    dislikeCount: Int
    commentCount: Int
    uploadedAt: Date
  }

  type Image {
    user: User
    _id: String
    url: String
    title: String
    caption: String
    likeCount: Int
    dislikeCount: Int
    commentCount: Int
    uploadedAt: Date
  }

  type Video {
    user: User
    _id: String
    url: String
    thumbUrl: String
    title: String
    caption: String
    viewCount: Int
    likeCount: Int
    dislikeCount: Int
    commentCount: Int
    uploadedAt: Date
    likes: [VideoLike]
    dislikes: [VideoDislike]
    views: [VideoView]
    comments: [VideoComment]
  }
`;

export default typeDefs;
