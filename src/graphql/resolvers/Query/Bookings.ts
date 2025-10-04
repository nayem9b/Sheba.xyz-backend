export const Bookings = {
  bookings: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.booking.findMany({
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

  userBookings: async (parent: any, args: { userId: string }, { prisma }: any) => {
    return await prisma.booking.findMany({
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

  booking: async (parent: any, args: { id: string }, { prisma }: any) => {
    return await prisma.booking.findUnique({
      where: {
        id: args.id,
      },
      include: {
        service: {
          include: {
            category: true,
          },
        },
      },
    });
  },
};
