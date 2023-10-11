import { User } from "@prisma/client";
import prisma from "../../shared/prisma";

export const signUpUserTODB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data: data,
  });
  return result;
};
