import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { addCategoryToDB } from "../category/category.service";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import { addBookingToDB, getBookingByUseridFromDB } from "./booking.service";
import { getSingleServiceByCategoryIDFromDB } from "../services/services.service";
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
