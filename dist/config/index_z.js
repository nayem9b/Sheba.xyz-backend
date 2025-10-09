"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
};
