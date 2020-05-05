import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    #prettier-ignore
    user(username: String!, vidPage: Int, imgPage: Int, notePage: Int ): UserResponse
    #prettier-ignore
    videoSearch(username: String, searchText: String, page: Int): VideoSearchResponse
    #prettier-ignore
    imageSearch(username: String, searchText: String, page: Int): ImageSearchResponse
    #prettier-ignore
    noteSearch(username: String, searchText: String, page: Int): NoteSearchResponse
    video(id: String!): Video
    image(id: String!): Image
    note(id: String!): Note
  }

  type UserResponse {
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
    vidPage: Int
    imgPage: Int
    notePage: Int
    hasMoreVideos: Boolean
    hasMoreImages: Boolean
    hasMoreNotes: Boolean
  }

  type VideoSearchResponse {
    videos: [Video]
    hasMore: Boolean
  }
  type ImageSearchResponse {
    images: [Image]
    hasMore: Boolean
  }
  type NoteSearchResponse {
    notes: [Note]
    hasMore: Boolean
  }

  type Mutation {
    postNote(body: String!): Note
    likeVideo(id: String!): Boolean
    dislikeVideo(id: String!): Boolean
    viewVideo(id: String!): Boolean
    commentVideo(id: String!, body: String!): String
    likeImage(id: String!): Boolean
    dislikeImage(id: String!): Boolean
    commentImage(id: String!, body: String!): String
    likeNote(id: String!): Boolean
    dislikeNote(id: String!): Boolean
    commentNote(id: String!, body: String!): String
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
    _id: String
    user: User
    Video: Video
    createdAt: Date
  }

  type VideoDislike {
    _id: String
    user: User
    Video: Video
    createdAt: Date
  }

  type VideoView {
    _id: String
    user: User
    Video: Video
    createdAt: Date
  }

  type VideoComment {
    _id: String
    user: User
    Video: Video
    body: String
    createdAt: Date
  }

  type ImageLike {
    _id: String
    user: User
    Image: Image
    createdAt: Date
  }

  type ImageDislike {
    _id: String
    user: User
    Image: Image
    createdAt: Date
  }

  type ImageComment {
    _id: String
    user: User
    Image: Image
    body: String
    createdAt: Date
  }

  type NoteLike {
    _id: String
    user: User
    Note: Note
    createdAt: Date
  }

  type NoteDislike {
    _id: String
    user: User
    Note: Note
    createdAt: Date
  }

  type NoteComment {
    _id: String
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
