import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import {
  addCategoryToDB,
  getAllCategoryFromDBService,
} from "./category.service";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";

export const addCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.body);
    const result = await addCategoryToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "category created successfully",
      data: result,
    });
  }
);

export const getAllCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllCategoryFromDBService();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "category fetched successfully",
      data: result,
    });
  }
);
