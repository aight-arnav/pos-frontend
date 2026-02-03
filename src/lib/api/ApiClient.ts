import axios from "axios";
import { extractErrorMessage } from "../error";
import toast from "react-hot-toast";

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
    const message = extractErrorMessage(error);
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
    const message = extractErrorMessage(error);
    toast.error(message);
    console.error(error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export { ApiClient, MultipartApiClient };
