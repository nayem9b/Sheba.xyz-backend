import { Category } from "@prisma/client";
import prisma from "../../shared/prisma";

export const addCategoryToDB = async (data: Category): Promise<Category> => {
  const result = prisma.category.create({
    data,
  });
  return result;
};

export const getAllCategoryFromDBService = async () => {
  const result = await prisma.category.findMany({});
  return result;
};