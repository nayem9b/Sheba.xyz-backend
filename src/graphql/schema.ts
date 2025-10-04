export const typeDefs = `#graphql
    type Query {
        me: User
        users: [User]
        user(id: ID!): User
        categories: [Category]
        category(id: ID!): Category
        services: [Services]
        service(id: ID!): Services
        servicesByCategory(categoryId: ID!): [Services]
        bookings: [Booking]
        userBookings(userId: ID!): [Booking]
        booking(id: ID!): Booking
        reviews: [ReviewAndRating]
        serviceReviews(serviceId: ID!): [ReviewAndRating]
        cartItems(userId: ID!): [MyCart]
        contents: [Content]
        content(id: ID!): Content
        feedbacks: [Feedback]
        feedback(id: ID!): Feedback
        posts: [Post]
        profile(userId: ID!): Profile
    }

    type Mutation {
        signup(
            name: String!,
            email: String!,
            password: String!
            bio: String
        ): AuthPayload,
        
        signin(
            email: String!
            password: String!
        ): AuthPayload,

        addPost(post: PostInput!): PostPayload,
        updatePost(postId: ID!, post: PostInput!): PostPayload,
        deletePost(postId: ID!): PostPayload,
        publishPost(postId: ID!): PostPayload
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        author: User
        createdAt: String!
        published: Boolean!
    }

    type Category {
    id: ID!
    title: String!
    image: String!
    Services: [Services!]!
    }

type Services {
  id: ID!
  name: String!
  price: Int!
  details: String!
  image: String!
  categoryId: String!
  rating: String!
  location: Location! 
  status: ServiceStatus!
  category: Category!
  ReviewAndRating: [ReviewAndRating!]!
  Booking: [Booking!]!
  MyCart: [MyCart!]!
}

enum Location {
  Dhaka
  Rangpur
  Rajshahi
  Khulna
  Barishal
  Chittagong
  Chattagram
  Sylhet
  Mymensingh
}

enum ServiceStatus {
  available
  upcoming
}


type Booking {
  id: ID!
  userId: String!
  status: Status!
  service: Services!
  servicesId: String!
  email: String!
  name: String!
  zip: String!
  street: String!
  contactNo: Int!
  time: String!
  date: String!
  createdAt: String!
  updatedAt: String!
}

enum Status {
  pending
  delivered
  canceled
  accepted
  rejected
}

type MyCart {
  id: ID!
  userId: String!
  servicesId: String!
  createdAt: String!
  service: Services!
}

type ReviewAndRating {
  id: ID!
  review: String!
  rating: Int!
  service: Services!
  servicesId: String!
  userImage: String!
  userId: String!
  createdAt: String!
}



    type User {
        id: ID!
        name: String!
        email: String!
        role: Role!
        contactNo: String
        address: String
        profileImg: String!
        createdAt: String!
        posts: [Post]
        bookings: [Booking]
        cartItems: [MyCart]
    }

    type Content {
        id: ID!
        heading: String!
        image: String!
        content: String!
    }

    type Feedback {
        id: ID!
        email: String!
        feedback: String!
    }

    enum Role {
        superadmin
        admin
        customer
    }

    type Profile {
        id: ID!
        bio: String!
        createdAt: String!
        user: User!
    }

    type AuthPayload {
        userError: String
        token: String
    }

    type PostPayload {
        userError: String
        post: Post
    }

    input PostInput {
        title: String
        content: String
    }
`;
