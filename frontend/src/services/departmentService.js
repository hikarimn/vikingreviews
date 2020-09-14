import http from "./httpService";
import { uri } from "../config.json";

const apiEndpoint = uri + "/api/departments";
const key = "departments";

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

async function getById(id) {
  if (localStorage.departments) {
    return JSON.parse(localStorage.departments).find(
      (department) => department._id === id
    );
  }
  const { data } = await http.get(`${apiEndpoint}/${id}`);
  return data;
}

export default { getAll, getById };
