/* eslint-disable no-undef */
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    access_secret: process.env.ACCESS_SECRET,
    refresh_secret: process.env.REFRESH_SECRET,
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
