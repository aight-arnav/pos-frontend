import { ApiError } from "@/lib/types/Error";

export const ErrorFormatter = (error: ApiError): string => {
  if (error.fieldErrors) {
    return Object.values(error.fieldErrors).join(", ");
  }

  return error.message;
};