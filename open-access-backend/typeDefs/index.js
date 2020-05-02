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
    likeImage(id: String!): Boolean
    dislikeImage(id: String!): Boolean
    commentImage(id: String!, body: String!): Boolean
    likeNote(id: String!): Boolean
    dislikeNote(id: String!): Boolean
    commentNote(id: String!, body: String!): Boolean
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

  type ImageLike {
    user: User
    Image: Image
    createdAt: Date
  }

  type ImageDislike {
    user: User
    Image: Image
    createdAt: Date
  }

  type ImageComment {
    user: User
    Image: Image
    body: String
    createdAt: Date
  }

  type NoteLike {
    user: User
    Note: Note
    createdAt: Date
  }

  type NoteDislike {
    user: User
    Note: Note
    createdAt: Date
  }

  type NoteComment {
    user: User
    Note: Note
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
    likes: [NoteLike]
    dislikes: [NoteDislike]
    comments: [NoteComment]
    liked: Boolean
    disliked: Boolean
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
    likes: [ImageLike]
    dislikes: [ImageDislike]
    comments: [ImageComment]
    liked: Boolean
    disliked: Boolean
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
    liked: Boolean
    disliked: Boolean
  }
`;

export default typeDefs;
