# Blog App

## Requirements

- Users can post
- Users can see posts
- User Authentication
- Users can see their profile

## Tables

- Users

  - id
  - name
  - email
  - password
  - cratedAt
  - updatedAt

- Profiles

  - id
  - userId
  - bio
  - createdAt
  - updatedAt

- Posts

  - id
  - title
  - content
  - authorId
  - createdAt
  - updatedAt
  - published
  - publishedAt

## Technologies

- graphql
- typescript
- postgresql
- prisma
