export const Feedback = {
  feedbacks: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.feedback.findMany({
      orderBy: {
        id: "desc",
      },
    });
  },

  feedback: async (parent: any, args: { id: string }, { prisma }: any) => {
    return await prisma.feedback.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};
