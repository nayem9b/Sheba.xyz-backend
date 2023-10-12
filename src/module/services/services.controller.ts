import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { decodedToken } from "../../helpers/jwtHelpers";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import {
  addServiceToDB,
  deleteServiceFromDB,
  getAllServiceFromDBService,
  getSingleServiceByCategoryIDFromDB,
  updateServiceFromDB,
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

export const updateServiceController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await updateServiceFromDB(id, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service updated successfully",
      data: result,
    });
  }
);

export const deleteServiceController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await deleteServiceFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service deleted successfully",
      data: result,
    });
  }
);
