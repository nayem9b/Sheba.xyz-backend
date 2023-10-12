import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { decodedToken } from "../../helpers/jwtHelpers";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import {
  addServiceToDB,
  getAllServiceFromDBService,
  getSingleServiceByCategoryIDFromDB,
} from "./services.service";

export const postService = catchAsync(async (req: Request, res: Response) => {
  // const decodedToken = (token: string) => {
  //   return jwtDecode(token);
  // };
  //   const userinfo = decodedToken(req.headers.authorization as string);
  const result = await addServiceToDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

export const getAllServiceController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllServiceFromDBService();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Services fetched successfully",
      data: result,
    });
  }
);
export const getServiceByCategoryIdController = catchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const result = await getSingleServiceByCategoryIDFromDB(categoryId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Service fetched successfully",
      data: result,
    });
  }
);
