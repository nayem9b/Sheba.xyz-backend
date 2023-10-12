import { Services } from "@prisma/client";
import prisma from "../../shared/prisma";

export const addServiceToDB = async (data: Services): Promise<Services> => {
  const result = prisma.services.create({
    data,
  });
  return result;
};

export const getAllServiceFromDBService = async () => {
  const result = await prisma.services.findMany({
    include: {
      category: true,
    },
  });
  return result;
};

export const getSingleServiceByCategoryIDFromDB = async (id: string) => {
  const result = await prisma.services.findMany({
    where: {
      categoryId: id,
    },
  });
  return result;
};

export const updateServiceFromDB = async (
  id: string,
  payload: Partial<Services>
) => {
  const result = await prisma.services.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

export const deleteServiceFromDB = async (id: string) => {
  const deleteReview = await prisma.reviewAndRating.deleteMany({
    where: {
      servicesId: id,
    },
  });

  const deleteBooking = await prisma.booking.deleteMany({
    where: {
      servicesId: id,
    },
  });
  if (!!deleteReview || !!deleteBooking) {
    const result = await prisma.services.delete({
      where: {
        id,
      },
    });
    return result;
  }
};
