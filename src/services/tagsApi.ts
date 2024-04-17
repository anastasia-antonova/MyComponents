import { axiosClient } from "@/services/api";

export const getTagsList = () => {
  return axiosClient.get(`/tags`);
};
