import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import {
  addContentToDB,
  deleteContentFromDB,
  getAllContentFromDB,
} from "./content.service";
export const addContentController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await addContentToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Content Posted successfully",
      data: result,
    });
  }
);

export const getAllContentsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllContentFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Contents Fetched successfully",
      data: result,
    });
  }
);

export const deleteContentController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await deleteContentFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Content deleted successfully",
      data: result,
    });
  }
);
