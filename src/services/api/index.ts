import axios from "axios";
import router from "@/router";
import { useUserStore } from "@/store/user";
import { addToast } from "@/composables/toaster";
import { ToasterTypes } from "@/constants/toasterTypes";

interface Subscriber {
  (token: string): void;
}

const baseURL = process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : ``;
export const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use(
  (request) => {
    const userStore = useUserStore();
    if (request.headers && userStore.accessToken) {
      request.headers.Authorization = `Bearer ${userStore.accessToken}`;
    }
    return request;
  },
  (error) => {
    const parsedError = JSON.parse(JSON.stringify(error));
    if (parsedError.message) {
      addToast({
        status: ToasterTypes.error,
        message: parsedError.message,
      });
      return error;
    }
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
