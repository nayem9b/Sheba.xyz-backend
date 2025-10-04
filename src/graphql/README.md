# GraphQL API Documentation

This directory contains the GraphQL schema, resolvers, and example queries for the Sheba service platform.

## Structure

```
src/graphql/
├── schema.ts                    # GraphQL type definitions
├── resolvers/
│   ├── index.ts                # Main resolvers export
│   └── Query/
│       ├── Query.ts            # Main query resolver
│       ├── Services.ts         # Service-related queries
│       ├── Bookings.ts         # Booking-related queries
│       ├── Reviews.ts          # Review and rating queries
│       ├── Cart.ts             # Shopping cart queries
│       ├── Content.ts          # Content/blog queries
│       └── Feedback.ts         # Feedback queries
├── queries/
│   └── exampleQueries.graphql   # Example GraphQL queries
└── README.md                   # This file
```

## Available Queries

### Users
- `users` - Get all users
- `user(id: ID!)` - Get a specific user by ID

### Categories
- `categories` - Get all categories
- `category(id: ID!)` - Get a specific category by ID

### Services
- `services` - Get all services
- `service(id: ID!)` - Get a specific service by ID
- `servicesByCategory(categoryId: ID!)` - Get services by category

### Bookings
- `bookings` - Get all bookings
- `userBookings(userId: ID!)` - Get bookings for a specific user
- `booking(id: ID!)` - Get a specific booking by ID

### Reviews & Ratings
- `reviews` - Get all reviews
- `serviceReviews(serviceId: ID!)` - Get reviews for a specific service

### Shopping Cart
- `cartItems(userId: ID!)` - Get cart items for a specific user

### Content
- `contents` - Get all content/blog posts
- `content(id: ID!)` - Get a specific content by ID

### Feedback
- `feedbacks` - Get all feedback
- `feedback(id: ID!)` - Get a specific feedback by ID

## Example Usage

### Get all services with their categories and reviews:
```graphql
query GetAllServices {
  services {
    id
    name
    price
    details
    image
    rating
    location
    status
    category {
      id
      title
      image
    }
    ReviewAndRating {
      id
      review
      rating
      userImage
      userId
      createdAt
    }
  }
}
```

### Get user bookings with service details:
```graphql
query GetUserBookings($userId: ID!) {
  userBookings(userId: $userId) {
    id
    status
    email
    name
    time
    date
    createdAt
    service {
      id
      name
      price
      category {
        title
      }
    }
  }
}
```

### Get services by category:
```graphql
query GetServicesByCategory($categoryId: ID!) {
  servicesByCategory(categoryId: $categoryId) {
    id
    name
    price
    details
    image
    rating
    location
    status
  }
}
```

## Data Types

### User
- `id: ID!`
- `name: String!`
- `email: String!`
- `role: Role!` (superadmin, admin, customer)
- `contactNo: String`
- `address: String`
- `profileImg: String!`

### Services
- `id: ID!`
- `name: String!`
- `price: Int!`
- `details: String!`
- `image: String!`
- `categoryId: String!`
- `rating: String!`
- `location: Location!`
- `status: ServiceStatus!` (available, upcoming)

### Booking
- `id: ID!`
- `userId: String!`
- `status: Status!` (pending, delivered, canceled, accepted, rejected)
- `email: String!`
- `name: String!`
- `zip: String!`
- `street: String!`
- `contactNo: Int!`
- `time: String!`
- `date: String!`
- `createdAt: String!`
- `updatedAt: String!`

### ReviewAndRating
- `id: ID!`
- `review: String!`
- `rating: Int!`
- `userImage: String!`
- `userId: String!`
- `createdAt: String!`

## Enums

### Location
- Dhaka, Rangpur, Rajshahi, Khulna, Barishal, Chittagong, Chattagram, Sylhet, Mymensingh

### ServiceStatus
- available, upcoming

### Status (Booking)
- pending, delivered, canceled, accepted, rejected

### Role
- superadmin, admin, customer

## Notes

- All queries return data in descending order by creation date where applicable
- Service queries include related category, reviews, bookings, and cart information
- Booking queries include related service and category information
- Review queries include related service and category information
- All resolvers use Prisma ORM for database operations
- The API supports complex nested queries with proper relationships
