import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import { addFeedbackToDB, getAllFeedbackFromDB } from "./feedback.service";

export const addFeedbackController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await addFeedbackToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Feedback Posted successfully",
      data: result,
    });
  }
);
export const getAllFeedbackController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllFeedbackFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Feedback Fetched successfully",
      data: result,
    });
  }
);
