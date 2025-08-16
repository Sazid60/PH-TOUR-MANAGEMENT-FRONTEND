import config from "@/config";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
  // headers :{
  //    Authorization: "Mmamah Token"
  // }
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

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
//   function onFulfilled(response) {

//     //     This runs after you get a response from the server.

//     // Common uses:

//     // Transform or format the data before it reaches your code.

//     // Handle common error statuses (like redirect to login if 401 Unauthorized).

//     // Retry failed requests automatically.

//     // In your code, it currently just returns the response or error unchanged.
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     console.log("Axios", response);
//     return response;
//   },
//   function onRejected(error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor

let isRefreshing = false

let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = []


const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(null)
    }
  })

  pendingQueue = []
}

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Res Success!")
    return response
  },

  async (error) => {

    const originalRequest = error.config as AxiosRequestConfig & {_retry: boolean};
    console.log(originalRequest)

    console.log("Request Failed", error.response)

    if (error.response.status === 500 && error.response.data.message === "jwt expired" && !originalRequest._retry) {
      console.log("Your Token Is Expired")

      originalRequest._retry = true

      if (isRefreshing) {
        // before refreshing start store the requests
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject })
        }).then(() => axiosInstance(originalRequest)).catch(error => Promise.reject(error))
      }

      isRefreshing = true

      try {
        const res = await axiosInstance.post("/auth/refresh-token")
        console.log("New Token Arrived", res)

        processQueue(null)

        return axiosInstance(originalRequest)
      } catch (error) {
        console.log(error)


        processQueue(error)

        return Promise.reject(error)
      } finally{
        isRefreshing = false
      }
    }

    // for everything
    return Promise.reject(error)
  }
);