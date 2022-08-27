import axiosInstance from "./axiosInstance";
const { getToken, getRefreshToken, setToken } = require("./token.service");

const setup = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();

      token && (config.headers.Authorization = `Bearer ${token}`);

      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;

      if (!originalConfig.url.includes("/auth/login" && error.response)) {
        // Access Token was expired
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const { data } = await axiosInstance.post("/auth/refresh-token", {
              refreshToken: getRefreshToken(),
            });

            const { token } = data;

            setToken(token);

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setup;
