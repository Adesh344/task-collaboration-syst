import api from "./api";

export const createTaskAPI = (data) => api.post("/tasks", data);
export const getTasksAPI = (params) => api.get("/tasks", { params });
export const getTaskByIdAPI = (id) => api.get(`/tasks/${id}`);
export const updateTaskAPI = (id, data) => api.patch(`/tasks/${id}`, data);
export const deleteTaskAPI = (id) => api.delete(`/tasks/${id}`);
export const getAnalyticsAPI = () => api.get("/analytics/summary");