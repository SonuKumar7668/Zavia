import axios from "axios";

const BASE_URL = "https://zavia-3iv6.onrender.com/"; // e.g. http://192.168.1.10:5000

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const registerUser = async (name, email, password) => {
  const response = await api.post("/user/register", { name, email, password });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post("/user/login", { email, password });
  return response.data; // { success: "true", token }
};

export const getProfile = async (token) => {
  const response = await api.get("/user/profile", {
    headers: { Authorization: token },
  });
  return response.data.user;
};

export const getJobs = async (token, filters = {}) => {
  const query = new URLSearchParams({
    location: filters.location || "",
    jobType: filters.jobType || "",
  }).toString();

  const response = await api.get(`/jobs?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.jobs;
};

export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data.job;
};

export const applyForJob = async (token, jobId) => {
  const response = await api.post(`/jobs/apply`, { jobId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const saveJob = async (token, jobId) => {
  const response = await api.post(`/jobs/save`, { jobId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getFeaturedJobs = async (token) => {
  const response = await api.get("/jobs?limit=3", {
    headers: { Authorization: token},
  });
  return response.data.jobs?.slice(0, 3) ?? [];
};