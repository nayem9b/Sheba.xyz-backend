export const Cart = {
  cartItems: async (parent: any, args: { userId: string }, { prisma }: any) => {
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
