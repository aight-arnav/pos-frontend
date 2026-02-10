import { AxiosError } from "axios";
import { ApiError } from "@/lib/types/Error";

export const ErrorParser = (error: unknown) : ApiError => {
  if (!(error as AxiosError).isAxiosError) {
    return {
      message: "Something went wrong",
      raw: error,
    };
  }

  const axiosError = error as AxiosError<ApiError>;
  const data = axiosError.response?.data;

  // Validation errors (your payload)
  if (data?.fieldErrors) {
    return {
      status: data.status,
      message: data.message || "Validation failed",
      fieldErrors: data.fieldErrors,
      raw: data,
    };
  }

  // Generic backend error
  if (data?.message) {
    return {
      status: data.status,
      message: data.message,
      raw: data,
    };
  }

  // Network / unknown
  return {
    status: axiosError.response?.status,
    message: axiosError.message || "Network error",
    raw: error,
  };
}