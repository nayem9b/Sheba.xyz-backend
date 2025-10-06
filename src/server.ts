import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import app from "./app";
import config from "./config";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { typeDefs } from "./graphql/schema";
// import { resolvers } from "./graphql/resolvers";
import { initKafka, gracefulKafkaShutdown } from "./messaging/kafka";

export const prisma = new PrismaClient();
interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
}

const main = async () => {
  // Initialize Kafka
  try {
    await initKafka();
  } catch (error) {
    console.error('❌ Failed to initialize Kafka:', error);
    console.log('⚠️  Continuing without Kafka - events will not be published');
  }

  const httpServer = createServer(app);
  
  // const server = new ApolloServer({
  //   typeDefs,
  //   resolvers,
  //   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // });

  // await server.start();

  // Apply GraphQL middleware to Express app
  // app.use(
  //   '/graphql',
  //   expressMiddleware(server, {
  //     context: async ({ req }): Promise<Context> => {
  //       return {
  //         prisma,
  //       };
  //     },
  //   })
  // );

  // Start the server
  httpServer.listen(config.port, () => {
    console.log(`🚀 Server is running on port ${config.port}`);
    // console.log(`🚀 GraphQL API is available at http://localhost:${config.port}/graphql`);
  });
};

main();

// Graceful shutdown handlers
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  await gracefulKafkaShutdown();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  await gracefulKafkaShutdown();
  process.exit(0);
});
