import { Booking} from "@prisma/client";
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

export const getBookingByUseridFromDB = async (id: string) => {
  const result = await prisma.booking.findMany({
    where: {
      userId: id,
    },
    include: {
      service: true,
    },
  });
  return result;
};

export const getBookingByidFromDB = async (id: string) => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      service: true,
    },
  });
  return result;
};

export const getAllBookingsFromDB = async () => {
  const result = await prisma.booking.findMany({
    include: {
      service: {
        include: {
          category: true,
        },
      },
    },
  });
  return result;
};

export const getAllPendingBookingsFromDB = async () => {
  const result = await prisma.booking.findMany({
    where: {
      status: "pending",
    },
  });
  return result;
};

export const getAllDeliveredBookingsFromDB = async () => {
  const result = await prisma.booking.findMany({
    where: {
      status: "delivered",
    },
  });
  return result;
};

export const getAllCanceledBookingsFromDB = async () => {
  const result = await prisma.booking.findMany({
    where: {
      status: "canceled",
    },
  });
  return result;
};
export const getAllRejectedBookingsFromDB = async () => {
  const result = await prisma.booking.findMany({
    where: {
      status: "rejected",
    },
  });
  return result;
};

export const updateBookingFromDB = async (
  id: string,
  payload: Partial<Booking>
) => {
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
    include: {
      service: true,
    },
  });
  return result;
};

export const deleteBookingFromDB = async (id: string) => {
  console.log(id);
  const result = await prisma.booking.delete({
    where: {
      id,
    },
  });
  return result;
};
