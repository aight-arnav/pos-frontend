import axios from "axios";
import toast from "react-hot-toast";
import { ErrorParser } from "../errors/ErrorParser";
import { ErrorFormatter } from "../errors/ErrorFormatter";

const ApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POS_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = ErrorParser(error)
    const message = ErrorFormatter(apiError);
    toast.error(message);
    console.error(error.response?.data);
    return Promise.reject(error);
  }
);

const MultipartApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POS_API_URL,
  withCredentials: true
})

MultipartApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = ErrorParser(error)
    const message = ErrorFormatter(apiError);
    toast.error(message);
    console.error(error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export { ApiClient, MultipartApiClient };
