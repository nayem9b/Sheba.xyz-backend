import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { addServiceToDB } from "../services/services.service";
import { addRatingToDB } from "./rating.service";
export const postRating = catchAsync(async (req: Request, res: Response) => {
  const result = await addRatingToDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rating added successfully",
    data: result,
  });
});
