# 🚀 Sheba GraphQL API Integration Guide

## Overview
Your GraphQL API is now fully integrated with your Express server and ready to use! Here's how to access and test it.

## 🎯 API Endpoints

### Main Endpoints
- **GraphQL API**: `http://localhost:3000/graphql`
- **API Info**: `http://localhost:3000/api/graphql`
- **Health Check**: `http://localhost:3000/health`
- **Test Page**: `http://localhost:3000/graphql-test.html`

### REST API (Existing)
- **Base API**: `http://localhost:3000/api/v1/`
- **Metrics**: `http://localhost:3000/metrics`

## 🚀 Quick Start

### 1. Start the Server
```bash
cd /home/nayems/Desktop/Sheba/server
npm run dev
```

### 2. Seed Sample Data
```bash
npm run seed
```

### 3. Test the API
Open your browser and go to: `http://localhost:3000/graphql-test.html`

## 📡 How to Use GraphQL API

### Method 1: Browser Test Page
1. Go to `http://localhost:3000/graphql-test.html`
2. Click the test buttons to run different queries
3. View results in real-time

### Method 2: Direct GraphQL Playground
1. Go to `http://localhost:3000/graphql`
2. Use the GraphQL Playground interface
3. Write and execute queries directly

### Method 3: cURL/Postman
```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "query { users { id name email role } }"}'
```

## 🔍 Available Queries

### Users
```graphql
query {
  users {
    id
    name
    email
    role
    contactNo
    address
    profileImg
  }
}
```

### Categories
```graphql
query {
  categories {
    id
    title
    image
  }
}
```

### Services
```graphql
query {
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
    }
  }
}
```

### Bookings
```graphql
query {
  bookings {
    id
    userId
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

### Reviews
```graphql
query {
  reviews {
    id
    review
    rating
    userImage
    userId
    createdAt
    service {
      id
      name
      category {
        title
      }
    }
  }
}
```

### Content
```graphql
query {
  contents {
    id
    heading
    image
    content
  }
}
```

### Feedback
```graphql
query {
  feedbacks {
    id
    email
    feedback
  }
}
```

## 🎯 Complex Queries

### Get Dashboard Data
```graphql
query {
  users {
    id
    name
    email
    role
  }
  categories {
    id
    title
    image
  }
  services {
    id
    name
    price
    rating
    category {
      title
    }
  }
  bookings {
    id
    status
    service {
      name
    }
  }
}
```

### Get Services by Category
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

### Get User Bookings
```graphql
query GetUserBookings($userId: ID!) {
  userBookings(userId: $userId) {
    id
    status
    email
    name
    time
    date
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

## 🛠️ Integration with Frontend

### JavaScript/React Example
```javascript
const GRAPHQL_ENDPOINT = 'http://localhost:3000/graphql';

async function fetchUsers() {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          users {
            id
            name
            email
            role
          }
        }
      `
    })
  });
  
  const data = await response.json();
  return data.data.users;
}
```

### Apollo Client Setup
```javascript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

## 📊 Sample Data

After running `npm run seed`, you'll have:
- **2 Users**: John Doe (customer), Admin User (admin)
- **2 Categories**: Home Cleaning, Plumbing
- **2 Services**: Deep House Cleaning, Pipe Repair Service
- **1 Booking**: Sample booking for house cleaning
- **1 Review**: 5-star review for cleaning service
- **1 Content**: Blog post about home cleaning
- **1 Feedback**: Customer feedback

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   sudo lsof -ti:3000 | xargs kill -9
   ```

2. **Database Connection Issues**
   ```bash
   # Check database connection
   npx prisma db push
   ```

3. **No Data Returned**
   ```bash
   # Seed sample data
   npm run seed
   ```

4. **GraphQL Playground Not Loading**
   - Make sure server is running on port 3000
   - Check browser console for errors
   - Try accessing `http://localhost:3000/graphql` directly

## 📈 Performance Tips

1. **Use Specific Fields**: Only request the fields you need
2. **Batch Queries**: Combine multiple queries in one request
3. **Use Variables**: For dynamic queries with parameters
4. **Implement Caching**: Use Apollo Client caching for better performance

## 🔐 Security Considerations

1. **Authentication**: Add JWT middleware for protected routes
2. **Rate Limiting**: Implement rate limiting for API endpoints
3. **Input Validation**: Validate all GraphQL inputs
4. **CORS**: Configure CORS properly for production

## 📝 Next Steps

1. **Add Authentication**: Implement JWT-based auth
2. **Add Mutations**: Create, update, delete operations
3. **Add Subscriptions**: Real-time updates
4. **Add Pagination**: For large datasets
5. **Add Filtering**: Search and filter capabilities
6. **Add Caching**: Redis or in-memory caching
7. **Add Monitoring**: Logging and metrics

## 🎉 Success!

Your GraphQL API is now fully integrated and ready to use! You can:

- ✅ Query all your data through GraphQL
- ✅ Use the browser test page for quick testing
- ✅ Integrate with your frontend applications
- ✅ Access both REST and GraphQL APIs on the same server
- ✅ Scale your API with proper caching and optimization

Happy coding! 🚀
