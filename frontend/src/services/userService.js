import http from "./httpService";
import { uri } from "../config.json";

const apiEndpoint = uri + "/api/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
    major: user.major,
    class: user.class,
  });
}
