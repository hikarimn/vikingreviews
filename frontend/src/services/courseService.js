import http from "./httpService";
import { uri } from "../config.json";

const apiEndpoint = uri + "/api/courses";
const key = "courses";

async function getAll(clear) {
  if (clear) localStorage.removeItem(key);
  else {
    const cached = localStorage.getItem(key);
    if (cached) return JSON.parse(cached);
  }
  const { data } = await http.get(apiEndpoint);
  localStorage.setItem(key, JSON.stringify(data));
  return data;
}

async function getByDepartment(id) {
  const { data } = await http.get(`${apiEndpoint}/department=${id}`);
  return data;
}

export default { getAll, getByDepartment };
