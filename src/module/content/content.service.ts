import { Content } from "@prisma/client";
import prisma from "../../shared/prisma";
export const addContentToDB = async (data: Content): Promise<Content> => {
  const result = prisma.content.create({
    data,
  });
  return result;
};

export const getAllContentFromDB = async () => {
  const result = prisma.content.findMany({});
  return result;
};
