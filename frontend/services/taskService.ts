import API from "./api";
import { Task } from "../types/task";

export const getTasks = async (params?: Record<string, any>) => {
  const res = await API.get("/tasks", { params });
  return res.data;
};

export const createTask = async (data: Partial<Task>) => {
  const res = await API.post("/tasks", data);
  return res.data;
};

export const updateTask = async (id: any, data: Partial<Task>) => {
  const res = await API.patch(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: any) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};

// Renamed from toggleTask to toggleTaskStatus to match Dashboard imports
export const toggleTaskStatus = async (id: any) => {
  const res = await API.patch(`/tasks/${id}/toggle`);
  return res.data;
};