import { Booking, ReviewAndRating } from "@prisma/client";
import prisma from "../../shared/prisma";
export const addBookingToDB = async (data: Booking): Promise<Booking> => {
  const result = prisma.booking.create({
    data,
    include: {
      service: true,
    },
  });
  return result;
};
