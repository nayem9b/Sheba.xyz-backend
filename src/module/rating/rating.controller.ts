import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import {
  addServiceToDB,
  getAllServiceFromDBService,
} from "../services/services.service";
import {
  addRatingToDB,
  getAllReviewsFromDBService,
  getSpecificServiceReviewFromDB,
} from "./rating.service";
export const postRating = catchAsync(async (req: Request, res: Response) => {
  const result = await addRatingToDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rating added successfully",
    data: result,
  });
});

export const getAllReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllReviewsFromDBService();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Reviews fetched successfully",
      data: result,
    });
  }
);
export const getReviewByServiceIdController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSpecificServiceReviewFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Specific Service Review fetched successfully",
      data: result,
    });
  }
);
