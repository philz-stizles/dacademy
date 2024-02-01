import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    courses: [Course]
    course: Course
    instructors: [Instructor]
  }

  enum Role {
    USER
    AUTHOR
    ADMIN
  }

  type User {
    id: ID
    email: String!
    name: String
    role: Role
    student: Student
    instructor: Instructor
    messages: [Message]
    notifications: [Notification]
    settings: [Setting]
    createdAt: String
    updatedAt: String
  }

  type Student {
    id: ID
    user: User
    wishlist: [WishList]
    cart: [Cart]
    transactions: [Transaction]
    createdAt: String
    updatedAt: String
  }

  type Instructor {
    id: ID
    user: User
    courses: [Course]
    createdAt: String
    updatedAt: String
  }

  type Course {
    id: ID
    isPublished: Boolean
    title: String!
    slug: String!
    link: String
    coverImage: String
    description: String
    price: Float
    rating: Int
    author: Instructor
    category: Category
    wsl: [Wsl]
    chapters: [Chapter]
    attachments: [Attachment]
    transactions: [Transaction]
    createdAt: String
    updatedAt: String
  }

  type Wsl {
    id: ID
    isPublished: Boolean
    name: String
    description: String
    course: Course
    createdAt: String
    updatedAt: String
  }

  type Attachment {
    id: ID
    name: String
    url: String
    course: Course
    createdAt: String
    updatedAt: String
  }

  type Chapter {
    id: String
    title: String
    description: String
    videoUrl: String
    position: Int
    isPublished: Boolean
    isFree: Boolean
    muxData: MuxData
    course: Course
    userProgress: [UserProgress]
    createdAt: String
    updatedAt: String
  }

  type MuxData {
    id: ID
    assetId: String
    playbackId: String
    chapter: Chapter
  }

  type UserProgress {
    id: ID
    userId: String
    chapter: Chapter
    isCompleted: Boolean
    createdAt: String
    updatedAt: String
  }

  type Category {
    id: ID
    isPublished: Boolean
    title: String
    description: String
    courses: [Course]
    subCategories: [SubCategory]
    createdAt: String
    updatedAt: String
  }

  type SubCategory {
    id: ID
    isPublished: Boolean
    title: String
    description: String
    category: Category
    createdAt: String
    updatedAt: String
  }

  type WishList {
    id: ID
    student: Student
    createdAt: String
    updatedAt: String
  }

  type Cart {
    id: ID
    student: Student
    createdAt: String
    updatedAt: String
  }

  type Transaction {
    id: ID
    userId: ID
    student: Student
    course: Course
    createdAt: String
    updatedAt: String
  }

  type StripeCustomer {
    id: ID
    userId: ID
    stripeCustomerId: ID
    createdAt: String
    updatedAt: String
  }

  type Message {
    id: ID
    user: User
    createdAt: String
    updatedAt: String
  }

  type Notification {
    id: ID
    user: User
    createdAt: String
    updatedAt: String
  }

  type Setting {
    id: ID
    user: User
    createdAt: String
    updatedAt: String
  }
`;

export default typeDefs;
