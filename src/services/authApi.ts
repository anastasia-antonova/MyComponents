import { UserInterface } from "@/types/UserInterface";
import axiosClient from "@/services/api";

export interface LoginUser {
  identifier: string;
  password: string;
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  jwt: string;
  user: UserInterface;
}
export const login = (payload: LoginUser) => {
  return axiosClient.post<LoginResponse>(`auth/local`, payload);
};

export const create = (payload: CreateUser) => {
  const data = {
    ...payload,
    role: 3,
  };
  return axiosClient.post(`users`, data);
};
