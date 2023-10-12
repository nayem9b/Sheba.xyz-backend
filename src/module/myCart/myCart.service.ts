import { MyCart } from "@prisma/client";
import prisma from "../../shared/prisma";

export const addCartToDB = async (data: MyCart): Promise<MyCart> => {
  const result = prisma.myCart.create({
    data,
  });
  return result;
};

export const getMyCartByUseridFromDB = async (id: string) => {
  const result = await prisma.myCart.findMany({
    where: {
      userId: id,
    },
    include: {
      service: true,
    },
  });
  return result;
};
