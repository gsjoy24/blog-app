const typeDefs = `
  type Query {
    me: User
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }

  type User {
    id: ID!
    email: String!
    name: String
    createdAt: String!
    updatedAt: String!
    role: Role!
    posts: [Post!]!
    profile: Profile
  }

  type Profile {
    id: ID!
    bio: String
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    author: User!
    publishedAt: String
    createdAt: String!
    updatedAt: String!
  }
    }
`;

export default typeDefs;
