import { SERVER_HOST, SERVER_PORT } from "../env";

const API_HOST = SERVER_HOST;
const API_PORT = SERVER_PORT;

const baseApi = `http://${API_HOST}:${API_PORT}/apis/v1`;

export const loginApi = baseApi + "/login";
export const userApi = baseApi + "/user";
export const exerciseApi = baseApi + "/exercise";
