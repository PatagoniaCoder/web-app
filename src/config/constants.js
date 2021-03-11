import axios from "axios";

import { API_VERSION, ENDPOINTS, ENV, TIME } from "./env.js";

const { API } = ENDPOINTS;
export const URL = API[ENV];
export const API_URL = `${URL}/${API_VERSION}/api`;
export const BASEURL = API_URL;
export const HEADERS = ({ token, expToken, contentType = null }) => {
  const headers = new Headers();
  headers.append("cache-control", "no-cache");
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Credentials", true);
  headers.append(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  headers.append(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  if (contentType) {
    headers.append("Content-Type", contentType);
  } else {
    headers.append("Content-Type", "application/json");
  }
  headers.append("Authorization", token);
  headers.append("Exptoken", expToken);
  return headers;
};

export const api = axios.create({
  baseURL: API_URL,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
