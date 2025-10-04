import prisma from "../../../shared/prisma";

export const Feedback = {
  feedbacks: async () => {
    return await prisma.feedback.findMany({
      orderBy: {
        id: "desc",
      },
    });
  },

  feedback: async (parent: any, args: { id: string }) => {
    return await prisma.feedback.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};
