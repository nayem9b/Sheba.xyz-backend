import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "./src/schema";
import { resolvers } from "./src/resolvers";
import express, { Request, Response } from "express";
import cors from "cors";
import { json } from "body-parser";

const prisma = new PrismaClient();

interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
}

async function startServer() {
  const app = express();
  
  // Setup CORS and JSON parsing
  app.use(cors());
  app.use(json());

  // Create Apollo Server
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
  });

  // Start the server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => ({
      prisma,
      req,
      res,
    }),
  });

  // Test route similar to the one in route.ts
  app.get("/api/test/health", (req, res) => {
    res.status(200).json({ status: "GraphQL service is healthy" });
  });

  // Test GraphQL query via REST endpoint
  app.get("/api/test/me", async (req, res) => {
    try {
      const result = await server.executeOperation({
        query: `
          query {
            me {
              id
              name
              email
            }
          }
        `,
      });
      
      if (result.body.kind === 'single' && result.body.singleResult.errors) {
        return res.status(400).json({ 
          errors: result.body.singleResult.errors 
        });
      }
      
      res.json(result.body.singleResult.data);
    } catch (error) {
      console.error('Error executing test query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  console.log(`🚀 GraphQL server ready at ${url}`);
  console.log(`🛠️  Test REST endpoints available at http://localhost:4000/api/test/*`);
}

startServer().catch((error) => {
  console.error('Failed to start GraphQL server:', error);
  process.exit(1);
});
