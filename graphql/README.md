# Sheba GraphQL Service

This is a standalone GraphQL microservice for the Sheba.xyz platform.

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Prisma setup with database connection

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the Prisma schema from the main project and generate the client:
   ```bash
   cp ../prisma/schema.prisma ./
   npx prisma generate
   ```

3. Set up environment variables (create a `.env` file):
   ```env
   DATABASE_URL="your_database_connection_string"
   PORT=4000
   ```

### Running the Server

- Development mode:
  ```bash
  npm run dev
  ```

- Production mode:
  ```bash
  npm run build
  npm start
  ```

## API Endpoints

### GraphQL
- `POST /` - Main GraphQL endpoint
- `GET /` - GraphQL Playground

### REST (for testing)
- `GET /api/test/health` - Health check
- `GET /api/test/me` - Test GraphQL query endpoint

## Project Structure

- `server.ts` - Main server file
- `schema.ts` - GraphQL schema definitions
- `resolvers/` - GraphQL resolvers
- `prisma/` - Database models and migrations

## Development

- The server will automatically reload when you make changes in development mode.
- Make sure to format your code before committing.

## License

This project is licensed under the MIT License.
