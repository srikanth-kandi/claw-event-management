import axios from "axios";

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const requestHandler = async (request) => {
  const token = localStorage.getItem("jwt") || "";
  request.headers["Authorization"] = "Bearer " + token;
  return request;
};

apiAuth.interceptors.request.use(async (request) => requestHandler(request));

export default apiAuth;
