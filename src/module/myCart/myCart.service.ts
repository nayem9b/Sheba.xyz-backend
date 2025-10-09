import { MyCart } from "@prisma/client";
import prisma from "../../shared/prisma";
import "dotenv/config";

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

export const deleteCartFromDB = async (id: string) => {
  const result = await prisma.myCart.delete({
    where: {
      id,
    },
  });
  return result;
};
// export const clerkTesting = async () => {
//   const userList = await clerk?.users.getUserList();
//   console.log(userList);
// };

// async function getUsersList(): Promise<Clerk.User[]> {
//   const clerk = new Clerk({
//     secretKey: process.env.CLERK_SECRET_KEY,
//   });

//   const userList = await clerk.users.getUserList();

//   return userList;
// }

// const userList = clerk.users.getUserList({});
