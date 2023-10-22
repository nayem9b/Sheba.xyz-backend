import { User } from "@prisma/client";
import prisma from "../../shared/prisma";
import httpStatus from "http-status";
import { createToken } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

export const signUpUserTODB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data: data,
  });
  return result;
};

export const loginUserToDB = async (payload: User) => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findFirstOrThrow({
    where: {
      email: email,
      password: password,
    },
  });

  if (!isUserExist) {
    httpStatus.NOT_FOUND, "User does not exist";
  } else {
    const { id: userId, role } = isUserExist;
    const accessToken: any | undefined = createToken(
      { userId, role },
      config.jwt.access_secret as Secret,
      config.jwt.access_expires_in as string
    );
    const refreshToken: any | undefined = createToken(
      { userId, role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );

    return {
      accessToken,
      refreshToken,
    };
  }
};

export const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany({});
  return result;
};

export const getSingleUserFromDB = async (userId: string) => {
  const result = await prisma.user.findFirst({
    where: {
      userId: userId,
    },
  });

  return result;
};

export const getSingleDBUserFromDB = async (id: string) => {
  const result = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return result;
};

export const deleteUserFromDB = async (id: string) => {
  console.log(id);
  const result = await prisma.user.deleteMany({
    where: {
      userId: id,
    },
  });
  return result;
};

export const updateUserFromDB = async (id: string, payload: Partial<User>) => {
  const result = await prisma.user.updateMany({
    where: {
      userId: id,
    },
    data: payload,
  });
  return result;
};
