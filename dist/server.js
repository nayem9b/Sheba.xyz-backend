"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
// interface Context {
//   prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
// }
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize Kafka
    // try {
    //   await initKafka();
    // } catch (error) {
    //   console.error('❌ Failed to initialize Kafka:', error);
    //   console.log('⚠️  Continuing without Kafka - events will not be published');
    // }
    const httpServer = (0, http_1.createServer)(app_1.default);
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
    httpServer.listen(config_1.default.port, () => {
        console.log(`🚀 Server is running on port ${config_1.default.port}`);
        // console.log(`🚀 GraphQL API is available at http://localhost:${config.port}/graphql`);
    });
});
main();
// // Graceful shutdown handlers
// process.on('SIGINT', async () => {
//   console.log('\n🛑 Received SIGINT, shutting down gracefully...');
//   await gracefulKafkaShutdown();
//   process.exit(0);
// });
// process.on('SIGTERM', async () => {
//   console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
//   await gracefulKafkaShutdown();
//   process.exit(0);
// });
