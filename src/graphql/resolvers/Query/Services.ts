export const Services = {
  services: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.services.findMany({
      include: {
        category: true,
        ReviewAndRating: true,
        Booking: true,
        MyCart: true,
      },
    });
  },

  service: async (parent: any, args: { id: string }, { prisma }: any) => {
    return await prisma.services.findUnique({
      where: {
        id: args.id,
      },
      include: {
        category: true,
        ReviewAndRating: true,
        Booking: true,
        MyCart: true,
      },
    });
  },

  servicesByCategory: async (parent: any, args: { categoryId: string }, { prisma }: any) => {
    return await prisma.services.findMany({
      where: {
        categoryId: args.categoryId,
      },
      include: {
        category: true,
        ReviewAndRating: true,
        Booking: true,
        MyCart: true,
      },
    });
  },
};
