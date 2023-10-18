import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import {
  getAllUsersFromDB,
  loginUserToDB,
  signUpUserTODB,
  getSingleUserFromDB,
  deleteUserFromDB,
} from "./user.service";

export const signUpUserController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await signUpUserTODB(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User CREATED successfully !",
      data: result,
    });
  }
);

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await loginUserToDB(loginData);
  console.log(result?.accessToken, result?.refreshToken);
  const accessToken = result?.accessToken;

  const refreshToken = result?.refreshToken;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: accessToken,
  });
});

export const getAllUsersController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllUsersFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users fetched successfully !",
      data: result,
    });
  }
);
export const getSingleUserController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await getSingleUserFromDB(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User fetched successfully !",
      data: result,
    });
  }
);

export const deleteUserController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await deleteUserFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  }
);
