import { axiosClient } from "@/services/api";

export const getLeadList = () => {
  return axiosClient.get(`/leads`);
};
