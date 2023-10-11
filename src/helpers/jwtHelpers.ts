import { JwtPayload, Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";

export const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const decodedToken = (token: string) => {
  return jwtDecode(token);
};
