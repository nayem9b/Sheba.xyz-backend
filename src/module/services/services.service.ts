import { Prisma, Services } from "@prisma/client";
import prisma from "../../shared/prisma";

import { IPaginationOptions } from "../../constants/pagination";
import { IGenericResponse } from "../../interface/common";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { IServicesFilter, serviceSearchableFields } from "./services.constant";
import { publishServiceCreated } from "../../messaging/publishers/serviceCreatedPublisher";

export const addServiceToDB = async (data: Services): Promise<Services> => {
  const result = await prisma.services.create({
    data,
  });
  
  // Publish Kafka event (non-blocking)
  publishServiceCreated(result).catch((err) => 
    console.error('Kafka publish failed:', err)
  );
  
  return result;
};

export const getAllServiceFromDBService = async (
  filters: IServicesFilter
): Promise<Services[]> => {
  // const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filtersData } = filters;
  console.log(searchTerm, filtersData);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map((key) => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ServicesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  console.log(JSON.stringify(andConditions));
  console.log(JSON.stringify(whereConditions));

  const result = await prisma.services.findMany({
    where: whereConditions,
    include: {
      category: true,
    },
  });
  const total: number = await prisma.services.count({
    where: whereConditions,
  });
  return result;
};

export const getSingleServiceByCategoryIDFromDB = async (id: string) => {
  const result = await prisma.services.findMany({
    where: {
      categoryId: id,
    },
    include: {
      category: true,
    },
  });
  return result;
};
export const getSingleServiceFromDB = async (id: string) => {
  const result = await prisma.services.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      ReviewAndRating: true,
    },
  });
  return result;
};

export const getUpcomingServicesFromDB = async () => {
  const result = await prisma.services.findMany({
    where: {
      status: "upcoming",
    },
    include: {
      category: true,
    },
  });
  return result;
};

export const getAvailableServicesFromDB = async () => {
  const result = await prisma.services.findMany({
    where: {
      status: "available",
    },
    include: {
      category: true,
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
