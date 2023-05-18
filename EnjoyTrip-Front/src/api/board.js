import { apiInstance } from "./index.js";
import axios from 'axios';

const api = apiInstance();

function listArticle(param, success, fail) {
  api.get(`/board/list`, { params: param }).then(success).catch(fail);
}

function writeArticle(formData, success, fail) {
  axios.post('http://localhost:9999/board/regist', formData).then(success).catch(fail);
}

function getArticle(noticeId, success, fail) {
  api.get(`/board/detail/${noticeId}`).then(success).catch(fail);
}
function getArticleImg(article, success, fail) {
  api.get(`/board/detailImg/${article.saveFolder}/${article.originalFile}/${article.saveFile}`).then(success).catch(fail);
}
function modifyArticle(article, success, fail) {
  api.put(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(noticeId, success, fail) {
  api.delete(`/board/${noticeId}`).then(success).catch(fail);
}

export { listArticle, writeArticle, getArticle, modifyArticle, deleteArticle, getArticleImg };
