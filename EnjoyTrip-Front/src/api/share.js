import { apiInstance } from "./index.js";
// import axios from 'axios';

const api = apiInstance();

function listPlan(success, fail) {
  api.get(`/plan/list`).then(success).catch(fail);
}

function listPlanTop6(success, fail) {
  api.get(`/plan/list/top6`).then(success).catch(fail);
}

// function writeArticle(formData, success, fail) {
//   axios.post('http://localhost:9999/board/regist', formData).then(success).catch(fail);
// }

function getPlan(planId, success, fail) {
  api.get(`/plan/detail/${planId}`).then(success).catch(fail);
}
// function getArticleImg(article, success, fail) {
//   api.get(`/board/detailImg/${article.saveFolder}/${article.originalFile}/${article.saveFile}`).then(success).catch(fail);
// }
// function modifyArticle(formData, success, fail) {
//   axios.put('http://localhost:9999/board/modify', formData).then(success).catch(fail);
// }

// function deleteArticle(noticeId, success, fail) {
//   api.delete(`/board/${noticeId}`).then(success).catch(fail);
// }

export { listPlan, getPlan, listPlanTop6 };
