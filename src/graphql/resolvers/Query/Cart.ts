import prisma from "../../../shared/prisma";

export const Cart = {
  cartItems: async (parent: any, args: { userId: string }) => {
    return await prisma.myCart.findMany({
      where: {
        userId: args.userId,
      },
      include: {
        service: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
