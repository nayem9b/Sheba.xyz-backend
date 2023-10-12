import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { decodedToken } from "../../helpers/jwtHelpers";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { addServiceToDB } from "./services.service";

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
