import axios, { HeadersDefaults } from "axios";
import { getAccessTokenFromRefreshToken } from "./authEndPoints";

interface ExtendedHeaderDefaults extends HeadersDefaults {
  Authorization: string;
}

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5001/bulletin-be82d/us-central1"
      : "https://us-central1-bulletin-be82d.cloudfunctions.net",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance?.interceptors.response.use(
  (response) => response,
  async function (error) {
    const failedRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh");

      return axios
        .post(getAccessTokenFromRefreshToken, {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        })
        .then((resp) => {
          console.log("data at interceptor is: ", resp);
          localStorage.setItem("access", resp.data.access_token);
          if (resp.data.refresh_token) {
            localStorage.setItem("refresh", resp.data.refresh_token);
          }

          axiosInstance.defaults.headers = {
            Authorization: "Bearer " + resp.data.access_token,
          } as ExtendedHeaderDefaults;

          failedRequest.headers["Authorization"] =
            "Bearer " + resp.data.access_token;

          return axiosInstance(failedRequest);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
