import { checkRes } from "./api";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.developer.li"
    : "http://localhost:3001";

export const register = ({ email, password, name, avatar }) => {
  return fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(checkRes);
};

export const login = ({ email, password }) => {
  return fetch(`${baseURL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkRes);
};

export function getToken() {
  return localStorage.getItem("jwt");
}

export function setToken(token) {
  return localStorage.setItem("jwt", token);
}

export const checkToken = (token) => {
  return fetch(`${baseURL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
};

export const editProfile = ({ name, avatar }) => {
  return fetch(`${baseURL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkRes);
};
