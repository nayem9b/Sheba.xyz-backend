import prisma from "../../../shared/prisma";

export const Content = {
  contents: async () => {
    return await prisma.content.findMany({
      orderBy: {
        id: "desc",
      },
    });
  },

  content: async (parent: any, args: { id: string }) => {
    return await prisma.content.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};
