import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_BASE_URL;
const refreshURL = "/auth/api/token/refresh/";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const request = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const USER_INFO = JSON.parse(localStorage.getItem("USER_INFO"));
      let token = null;
      if (USER_INFO) {
        token = USER_INFO.token;
      }

      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
        // config.headers['Content-Type'] = 'application/json';
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.data && response.data.success) {
        toast.success(response.data.success);
      }

      return response;
    },
    async (error) => {
      console.log("Error========>", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      }
      const originalRequest = error.config;
      if (error.response.status === 403) {
        const USER_INFO = JSON.parse(localStorage.getItem("USER_INFO"));
        const refreshToken = USER_INFO.refresh;

        return axios
          .post(baseURL + refreshURL, {
            refresh: refreshToken,
          })
          .then((res) => {
            if (res.status === 200) {
              USER_INFO.token = res.data.access;
              USER_INFO.refresh = null;
              localStorage.setItem("USER_INFO", JSON.stringify(USER_INFO));

              originalRequest.headers["Authorization"] =
                "Bearer " + USER_INFO.token;

              return axios(originalRequest);
            }
          })
          .catch((error) => {
            console.log({ error });
            localStorage.removeItem("USER_INFO");
            toast.info("Token Expired. Redirecting to Login.");
            window.location.assign("/");
          });
      }

      return Promise.reject(error);
    }
  );

  return {
    get: (url) => {
      return axiosInstance.get(`${baseURL + url}`);
    },
    post: (url, data) => {
      return axiosInstance.post(`${baseURL + url}`, data);
    },

    put: (url, data) => {
      return axiosInstance.put(`${baseURL + url}`, data);
    },

    delete: (url) => {
      return axiosInstance.delete(`${baseURL + url}`);
    },
  };
};

export default request();
