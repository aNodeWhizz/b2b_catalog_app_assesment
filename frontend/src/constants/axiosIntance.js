import axios, { AxiosError } from "axios";

const axiosInstance = axios.create();

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error instanceof AxiosError && error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.replace("/login");
    }
    // Handle any errors here
    return Promise.reject(error);
  }
);

export default axiosInstance;
