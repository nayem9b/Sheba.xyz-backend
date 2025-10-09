"use strict";
// import { z } from "zod";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // Using environment variables directly from the OS
// const envVarsZodSchema = z.object({
//   NODE_ENV: z.string(),
//   PORT: z
//     .string()
//     .default("3000")
//     .refine((val) => Number(val)),
//   DATABASE_URL: z.string(),
//   JWT_SECRET: z.string(),
//   STORE_ID: z.string(),
//   STORE_PASS: z.string(),
//   SSL_BASE_PAYMENT_URL: z.string(),
//   SSL_BASE_VALIDATION_URL: z.string(),
//   ACCESS_SECRET: z.string(),
//   REFRESH_SECRET: z.string(),
//   JWT_ACCESS_EXPIRES_IN: z.string(),
//   JWT_REFRESH_EXPIRES_IN: z.string(),
//   AWS_ACCESS_ID: z.string(),
//   AWS_ACCESS_KEY: z.string(),
// });
// // Parse environment variables with zod
// const envVars = envVarsZodSchema.parse(process.env);
// export default {
//   env: envVars.NODE_ENV,
//   port: envVars.PORT,
//   database_url: envVars.DATABASE_URL,
//   jwt: {
//     access_secret: envVars.ACCESS_SECRET,
//     refresh_secret: envVars.REFRESH_SECRET,
//     access_expires_in: envVars.JWT_ACCESS_EXPIRES_IN,
//     refresh_expires_in: envVars.JWT_REFRESH_EXPIRES_IN,
//   },
//   AWS_ACCESS_ID: envVars.AWS_ACCESS_ID,
//   AWS_ACCESS_KEY: envVars.AWS_ACCESS_KEY,
//   ssl: {
//     storeId: envVars.STORE_ID,
//     storePass: envVars.STORE_PASS,
//     sslPaymentUrl: envVars.SSL_BASE_PAYMENT_URL,
//     sslValidationUrl: envVars.SSL_BASE_VALIDATION_URL,
//   },
// };
/* eslint-disable no-undef */
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const zod_1 = require("zod");
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
const envVarsZodSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.string(),
    PORT: zod_1.z
        .string()
        .default("3000")
        .refine((val) => Number(val)),
    DATABASE_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    STORE_ID: zod_1.z.string(),
    STORE_PASS: zod_1.z.string(),
    SSL_BASE_PAYMENT_URL: zod_1.z.string(),
    SSL_BASE_VALIDATION_URL: zod_1.z.string(),
    ACCESS_SECRET: zod_1.z.string(),
    REFRESH_SECRET: zod_1.z.string(),
    JWT_ACCESS_EXPIRES_IN: zod_1.z.string(),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string(),
    AWS_ACCESS_ID: zod_1.z.string(),
    AWS_ACCESS_KEY: zod_1.z.string(),
    KAFKA_CLIENT_ID: zod_1.z.string().default("sheba-server"),
    KAFKA_BROKERS: zod_1.z.string().default("localhost:29092"),
    KAFKA_SERVICES_CREATED_TOPIC: zod_1.z.string().default("services.created.v1"),
});
const envVars = envVarsZodSchema.parse(process.env);
exports.default = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    database_url: envVars.DATABASE_URL,
    jwt: {
        access_secret: envVars.ACCESS_SECRET,
        refresh_secret: envVars.REFRESH_SECRET,
        access_expires_in: envVars.JWT_ACCESS_EXPIRES_IN,
        refresh_expires_in: envVars.JWT_REFRESH_EXPIRES_IN,
    },
    AWS_ACCESS_ID: envVars.AWS_ACCESS_ID,
    AWS_ACCESS_KEY: envVars.AWS_ACCESS_KEY,
    ssl: {
        storeId: envVars.STORE_ID,
        storePass: envVars.STORE_PASS,
        sslPaymentUrl: envVars.SSL_BASE_PAYMENT_URL,
        sslValidationUrl: envVars.SSL_BASE_VALIDATION_URL,
    },
    kafka: {
        clientId: envVars.KAFKA_CLIENT_ID,
        brokers: envVars.KAFKA_BROKERS.split(','),
        topics: {
            serviceCreated: envVars.KAFKA_SERVICES_CREATED_TOPIC,
        },
    },
};
