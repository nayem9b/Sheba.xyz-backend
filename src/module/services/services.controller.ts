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
  getSingleServiceFromDB,
  getUpcomingServicesFromDB,
  getAvailableServicesFromDB,
} from "./services.service";
import pick from "../../shared/pick";
import { servicesFilterableFields } from "./services.constant";
import { paginationFields } from "../../constants/pagination";

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
    const filters = pick(req.query, servicesFilterableFields);
    const options = pick(req.query, paginationFields);
    const result = await getAllServiceFromDBService(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Services fetched successfully",
      meta: result.meta,
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
export const getUpcomingServiceController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getUpcomingServicesFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Upcoming Service fetched successfully",
      data: result,
    });
  }
);
export const getAvailableServiceController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAvailableServicesFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Available Service fetched successfully",
      data: result,
    });
  }
);

export const getSingleServiceController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleServiceFromDB(id);
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
