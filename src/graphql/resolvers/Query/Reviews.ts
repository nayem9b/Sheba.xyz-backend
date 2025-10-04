export const Reviews = {
  reviews: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.reviewAndRating.findMany({
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

  serviceReviews: async (parent: any, args: { serviceId: string }, { prisma }: any) => {
    return await prisma.reviewAndRating.findMany({
      where: {
        servicesId: args.serviceId,
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
