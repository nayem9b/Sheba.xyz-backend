import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import { signUpUserTODB } from "./user.service";

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
