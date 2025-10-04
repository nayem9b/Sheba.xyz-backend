import prisma from "../../../shared/prisma";

export const Services = {
  services: async () => {
    return await prisma.services.findMany({
      include: {
        category: true,
        ReviewAndRating: true,
        Booking: true,
        MyCart: true,
      },
    });
  },

  service: async (parent: any, args: { id: string }) => {
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

  servicesByCategory: async (parent: any, args: { categoryId: string }) => {
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
