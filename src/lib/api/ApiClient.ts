import axios from "axios";

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
    console.error("API Error:", error.response?.data || error.message);
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
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export { ApiClient, MultipartApiClient };
