import axios from "axios";
import { apiInstance } from "./index.js";

const api = apiInstance();

function listArticle(param, success, fail) {
  api.get(`/board/list`, { params: param }).then(success).catch(fail);
}

function writeArticle(formData, success, fail) {
  axios.post('http://192.168.212.64:9999/board/regist', formData).then(success).catch(fail);
}

function getArticle(noticeId, success, fail) {
  api.get(`/board/detail/${noticeId}`).then(success).catch(fail);
}
function getArticleImg(article, success, fail) {
  api.get(`/board/detailImg/${article.saveFolder}/${article.originalFile}/${article.saveFile}`).then(success).catch(fail);
}
function modifyArticle(formData, success, fail) {
  api.put('http://192.168.212.64:9999/board/modify', formData).then(success).catch(fail);
}

function deleteArticle(noticeId, success, fail) {
  api.delete(`/board/${noticeId}`).then(success).catch(fail);
}

export { listArticle, writeArticle, getArticle, modifyArticle, deleteArticle, getArticleImg };
