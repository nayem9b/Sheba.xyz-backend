/* eslint-disable no-undef */
import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const envVarsZodSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z
    .string()
    .default("3000")
    .refine((val) => Number(val)),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  STORE_ID: z.string(),
  STORE_PASS: z.string(),
  SSL_BASE_PAYMENT_URL: z.string(),
  SSL_BASE_VALIDATION_URL: z.string(),
  ACCESS_SECRET: z.string(),
  REFRESH_SECRET: z.string(),
  JWT_ACCESS_EXPIRES_IN: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),
  AWS_ACCESS_ID: z.string(),
  AWS_ACCESS_KEY: z.string(),
});

const envVars = envVarsZodSchema.parse(process.env);

export default {
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
