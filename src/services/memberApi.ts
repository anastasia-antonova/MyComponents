import { axiosClient } from "@/services/api";

export const getMemberList = () => {
  return axiosClient.get(`/members`);
};
