import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    #prettier-ignore
    user(username: String!): UserResponse
    #prettier-ignore
    videoSearch(username: String, query: String, hashtag: String, page: Int, lastOldest: Date): VideoSearchResponse
    #prettier-ignore
    imageSearch(username: String, query: String, hashtag: String, page: Int, lastOldest: Date): ImageSearchResponse
    #prettier-ignore
    noteSearch(username: String, query: String, hashtag: String, page: Int, lastOldest: Date): NoteSearchResponse
    #prettier-ignore
    commentsSearch(username: String, query: String, page: Int): CommentSearchResponse
    #prettier-ignore
    likesSearch(username: String, query: String, page: Int): AnyLikeSearchResponse
    #prettier-ignore
    dislikesSearch(username: String, query: String, page: Int): AnyDislikeSearchResponse

    video(id: String!, cId: String): Video
    image(id: String!, cId: String): Image
    note(id: String!, cId: String): Note

    notifications: [Notification]
    newsfeedVideos(lastOldest: Date): [Video]
    newsfeedImages(lastOldest: Date): [Image]
    newsfeedNotes(lastOldest: Date): [Note]

    videoCommentReplies(commentId: String!): [VideoComment]
    imageCommentReplies(commentId: String!): [ImageComment]
    noteCommentReplies(commentId: String!): [NoteComment]
  }

  type UserResponse {
    notifications: [Notification]
    active: Boolean
    activeUntil: Date
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
    charges: [Charge]
    subscriptions: [MoSub]
    comments: [AnyComment]
    videoCount: Int
    imageCount: Int
    noteCount: Int
    commentCount: Int
    likeCount: Int
    dislikeCount: Int
    likes: [AnyLike]
    dislikes: [AnyDislike]
  }

  union AnyComment = VideoComment | ImageComment | NoteComment
  union AnyLike = VideoLike | ImageLike | NoteLike
  union AnyDislike = VideoDislike | ImageDislike | NoteDislike

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

  type CommentSearchResponse {
    comments: [AnyComment]
    hasMore: Boolean
  }

  type AnyLikeSearchResponse {
    likes: [AnyLike]
    hasMore: Boolean
  }
  type AnyDislikeSearchResponse {
    dislikes: [AnyDislike]
    hasMore: Boolean
  }

  type Mutation {
    postNote(caption: String!): Note
    likeVideo(id: String!): Boolean
    dislikeVideo(id: String!): Boolean
    viewVideo(id: String!): Boolean
    commentVideo(id: String!, body: String!, replyId: String): String
    likeImage(id: String!): Boolean
    dislikeImage(id: String!): Boolean
    commentImage(id: String!, body: String!, replyId: String): String
    likeNote(id: String!): Boolean
    dislikeNote(id: String!): Boolean
    commentNote(id: String!, body: String!, replyId: String): String
    markNotificationsRead(ids: [String]!): Boolean

    likeVideoComment(videoId: String!, commentId: String!): String
    dislikeVideoComment(videoId: String!, commentId: String!): String
    likeImageComment(imageId: String!, commentId: String!): String
    dislikeImageComment(imageId: String!, commentId: String!): String
    likeNoteComment(noteId: String!, commentId: String!): String
    dislikeNoteComment(noteId: String!, commentId: String!): String
  }

  scalar Date

  type User {
    active: Boolean
    activeUntil: Date
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

  type Charge {
    _id: String
    amount: Int
    refunded: Boolean
    createdAt: Date
    stripePaymentIntentId: String
  }

  type MoSub {
    _id: String
    amount: Int
    terminated: Boolean
    terminatedAt: Date
    createdAt: Date
  }

  type VideoLike {
    _id: String
    user: User
    video: Video
    createdAt: Date
  }

  type VideoDislike {
    _id: String
    user: User
    video: Video
    createdAt: Date
  }

  type VideoView {
    _id: String
    user: User
    video: Video
    createdAt: Date
  }

  type VideoComment {
    _id: String
    user: User
    video: Video
    body: String
    createdAt: Date
    replies: String
    replyCount: Int
    replyId: String
    likeCount: Int
    dislikeCount: Int
    liked: Boolean
    disliked: Boolean
    highlighted: Boolean
  }

  type ImageLike {
    _id: String
    user: User
    image: Image
    createdAt: Date
  }

  type ImageDislike {
    _id: String
    user: User
    image: Image
    createdAt: Date
  }

  type ImageComment {
    _id: String
    user: User
    image: Image
    body: String
    createdAt: Date
    replies: String
    replyCount: Int
    replyId: String
    likeCount: Int
    dislikeCount: Int
    liked: Boolean
    disliked: Boolean
    highlighted: Boolean
  }

  type NoteLike {
    _id: String
    user: User
    note: Note
    createdAt: Date
  }

  type NoteDislike {
    _id: String
    user: User
    note: Note
    createdAt: Date
  }

  type NoteComment {
    _id: String
    user: User
    note: Note
    body: String
    createdAt: Date
    replies: String
    replyCount: Int
    replyId: String
    likeCount: Int
    dislikeCount: Int
    liked: Boolean
    disliked: Boolean
    highlighted: Boolean
  }

  type Note {
    user: User
    _id: String
    caption: String
    likeCount: Int
    dislikeCount: Int
    commentCount: Int
    uploadedAt: Date
    likes: [NoteLike]
    dislikes: [NoteDislike]
    comments(lastOldest: Date): [NoteComment]
    liked: Boolean
    disliked: Boolean
  }

  type Image {
    user: User
    _id: String
    url: String
    thumbUrl: String
    title: String
    caption: String
    likeCount: Int
    dislikeCount: Int
    commentCount: Int
    uploadedAt: Date
    likes: [ImageLike]
    dislikes: [ImageDislike]
    comments(lastOldest: Date): [ImageComment]
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
    comments(lastOldest: Date): [VideoComment]
    liked: Boolean
    disliked: Boolean
  }

  type Notification {
    _id: String
    type: String
    target: String
    targetId: String
    sender: String
    body: String
    read: Boolean
    createdAt: Date
    commentId: String
  }

  type Subscription {
    notifications(username: String!): Notification
    newsfeedVideos: Video
    newsfeedVideoItem(videoId: String): Video
    videoItem(videoId: String): Video
    newsfeedImages: Image
    newsfeedImageItem(imageId: String): Video
    imageItem(imageId: String): Image
    newsfeedNotes: Note
    newsfeedNoteItem(noteId: String): Video
    noteItem(noteId: String): Note
  }
`;

export default typeDefs;
