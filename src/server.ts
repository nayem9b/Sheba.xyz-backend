import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import app from "./app";
import config from "./config";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

export const prisma = new PrismaClient();
interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
}

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<Context> => {
      return {
        prisma,
      };
    },
  });
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port} `);
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();
// async function bootstrap() {
// app.listen(config.port, () => {
//   console.log(`Server is running on port ${config.port} `);
// });
// }

// bootstrap();
