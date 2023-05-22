import { apiInstance } from "./index.js";
// import axios from 'axios';

const api = apiInstance();

function listPlan(param, success, fail) {
  api.get(`/plan/list`, { params: param }).then(success).catch(fail);
}

// function writeArticle(formData, success, fail) {
//   axios.post('http://localhost:9999/board/regist', formData).then(success).catch(fail);
// }

// function getArticle(noticeId, success, fail) {
//   api.get(`/board/detail/${noticeId}`).then(success).catch(fail);
// }
// function getArticleImg(article, success, fail) {
//   api.get(`/board/detailImg/${article.saveFolder}/${article.originalFile}/${article.saveFile}`).then(success).catch(fail);
// }
// function modifyArticle(formData, success, fail) {
//   axios.put('http://localhost:9999/board/modify', formData).then(success).catch(fail);
// }

// function deleteArticle(noticeId, success, fail) {
//   api.delete(`/board/${noticeId}`).then(success).catch(fail);
// }

export { listPlan };