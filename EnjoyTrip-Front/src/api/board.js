import { apiInstance } from "./index.js";
import axios from 'axios';

const api = apiInstance();

function listArticle(param, success, fail) {
  api.get(`/board/list`, { params: param }).then(success).catch(fail);
}

function writeArticle(formData, success, fail) {
  axios.post('http://localhost:9999/board/regist', formData).then(success).catch(fail);
}

function getArticle(articleno, success, fail) {
  api.get(`/board/detail/${articleno}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api.put(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(articleno, success, fail) {
  api.delete(`/board/${articleno}`).then(success).catch(fail);
}

export { listArticle, writeArticle, getArticle, modifyArticle, deleteArticle };
