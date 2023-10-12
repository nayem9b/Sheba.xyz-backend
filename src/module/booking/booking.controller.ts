import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { addCategoryToDB } from "../category/category.service";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import {
  addBookingToDB,
  getBookingByUseridFromDB,
  deleteBookingFromDB,
  getAllBookingsFromDB,
  updateBookingFromDB,
} from "./booking.service";
import {
  getSingleServiceByCategoryIDFromDB,
  deleteServiceFromDB,
  updateServiceFromDB,
} from "../services/services.service";
export const addBookingController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await addBookingToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "booking created successfully",
      data: result,
    });
  }
);

export const getBookingByUserIdController = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await getBookingByUseridFromDB(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User booked Services fetched successfully",
      data: result,
    });
  }
);
export const getAllBookingController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllBookingsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Bookings fetched successfully",
      data: result,
    });
  }
);

export const updateBookingController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await updateBookingFromDB(id, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  }
);

export const deleteBookingController = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const result = await deleteBookingFromDB(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking deleted successfully",
      data: result,
    });
  }
);
