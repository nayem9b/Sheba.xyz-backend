import prisma from "../../../shared/prisma";

export const Query = {
  category: async () => {
    return await prisma.category.findMany({})
  },
  profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: Number(args.userId),
      },
    });
  },
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
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
