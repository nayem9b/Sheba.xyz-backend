export const Content = {
  contents: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.content.findMany({
      orderBy: {
        id: "desc",
      },
    });
  },

  content: async (parent: any, args: { id: string }, { prisma }: any) => {
    return await prisma.content.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};
