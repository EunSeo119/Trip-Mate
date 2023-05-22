import { apiInstance } from "./index.js";
import axios from 'axios';

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userId, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userId}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/user/logout`).then(success).catch(fail);
}
function updateUserById(params, success, fail) {
  console.log(params);
  axios.put('http://localhost:9999/user/modify', params).then(success).catch(fail);
}
export { login, findById, tokenRegeneration, logout, updateUserById };
