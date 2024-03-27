import { axiosClient } from "@/services/api";
import { UserInterface } from "@/types/UserInterface";

export const getUser = () => {
  return axiosClient.get(`users/me/`);
};

export const changeUser = (id: number, data: Partial<UserInterface>) => {
  return axiosClient.put(`users/${id}`, data);
};
