import prisma from "../../../shared/prisma";

export const Reviews = {
  reviews: async () => {
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

  serviceReviews: async (parent: any, args: { serviceId: string }) => {
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
