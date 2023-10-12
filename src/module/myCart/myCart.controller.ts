import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import {addCartToDB, getMyCartByUseridFromDB} from './myCart.service';
import { getBookingByUseridFromDB } from "../booking/booking.service";

export const addTOCartController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await addCartToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product added to cart",
      data: result,
    });
  }
);

export const getMyCartByUserIdController = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await getMyCartByUseridFromDB(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Cart Services fetched successfully",
      data: result,
    });
  }
);
