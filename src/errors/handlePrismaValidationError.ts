import { Prisma } from "@prisma/client";
import { IGenericErrorResponse } from "../interface/common";

export default function handlePrismaValidationError(
  error: Prisma.PrismaClientValidationError
): IGenericErrorResponse {
  const statusCode = 400;
  const message = "ValidationError";
  const errorMessages = [
    {
      path: "",
      message: error.message,
    },
  ];

  return {
    statusCode,
    message,
    errorMessages,
  };
}
