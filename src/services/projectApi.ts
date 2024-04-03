import { axiosClient } from "@/services/api";
import { ProjectInterface } from "@/types/ProjectInterface";

// /api/projects

export const getProjectItem = (id: number) => {
  return axiosClient.get(`projects/${id}`);
};

export const createProjectItem = (data: any) => {
  return axiosClient.post("/projects", { data });
};

export const editProjectItem = (id: number, data: any) => {
  return axiosClient.put(`projects/${id}`, { data });
};

export const deleteProjectItem = (id: number) => {
  return axiosClient.delete(`projects/${id}`);
};

export const getProjectList = () => {
  return axiosClient.get(`/projects`);
};
