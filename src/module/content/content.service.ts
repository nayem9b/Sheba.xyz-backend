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

export const deleteContentFromDB = async (id: string) => {
  const result = await prisma.content.delete({
    where: {
      id,
    },
  });
  return result;
};
