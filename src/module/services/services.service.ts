import { Services } from "@prisma/client";
import prisma from "../../shared/prisma";

export const addServiceToDB = async (data: Services): Promise<Services> => {
  const result = prisma.services.create({
    data,
  });
  return result;
};
