import prisma from "../../../shared/prisma";
import { Services } from "./Services";
import { Bookings } from "./Bookings";
import { Reviews } from "./Reviews";
import { Cart } from "./Cart";
import { Content } from "./Content";
import { Feedback } from "./Feedback";

export const Query = {
  // User queries
  users: async () => {
    return await prisma.user.findMany();
  },

  user: async (parent: any, args: { id: string }) => {
    return await prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });
  },

  // Category queries
  categories: async () => {
    return await prisma.category.findMany();
  },

  category: async (parent: any, args: { id: string }) => {
    return await prisma.category.findUnique({
      where: {
        id: args.id,
      },
    });
  },

  // Service queries
  ...Services,

  // Booking queries
  ...Bookings,

  // Review queries
  ...Reviews,

  // Cart queries
  ...Cart,

  // Content queries
  ...Content,

  // Feedback queries
  ...Feedback,

  // Legacy queries
  profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: Number(args.userId),
      },
    });
  },

  posts: async (parent: any, args: any, { prisma }: any) => {
    console.log("post");
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
};
