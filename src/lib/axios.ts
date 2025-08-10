import config from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  // This runs before each HTTP request leaves your app.
  //     Common uses:

  // Add authentication tokens to headers.

  // Set Content - Type or other default headers.

  // Log requests for debugging.

  // In your code, it currently just passes the config unchanged — but you could modify it.
  function (config) {
    // Do something before request is sent
    console.log("Axios", config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function onFulfilled(response) {

    //     This runs after you get a response from the server.

    // Common uses:

    // Transform or format the data before it reaches your code.

    // Handle common error statuses (like redirect to login if 401 Unauthorized).

    // Retry failed requests automatically.

    // In your code, it currently just returns the response or error unchanged.
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Axios", response);
    return response;
  },
  function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);