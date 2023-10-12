import { Feedback } from "@prisma/client";
import prisma from "../../shared/prisma";

export const addFeedbackToDB = async (data: Feedback): Promise<Feedback> => {
  const result = prisma.feedback.create({
    data,
  });
  return result;
};
export const getAllFeedbackFromDB = async () => {
  const result = prisma.feedback.findMany({});
  return result;
};
