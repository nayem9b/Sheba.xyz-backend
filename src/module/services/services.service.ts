import { Services } from "@prisma/client";
import prisma from "../../shared/prisma";

export const addServiceToDB = async (data: Services): Promise<Services> => {
  const result = prisma.services.create({
    data,
  });
  return result;
};

export const getAllServiceFromDBService = async () => {
  const result = await prisma.services.findMany({});
  return result;
};

export const getSingleServiceByCategoryIDFromDB = async (id: string) => {
  const result = await prisma.services.findMany({
    where: {
      categoryId: id,
    },
  });
  return result;
};
