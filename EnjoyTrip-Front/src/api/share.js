import { apiInstance } from "./index.js";
// import axios from 'axios';

const api = apiInstance();

function listPlan(success, fail) {
  api.get(`/plan/list`).then(success).catch(fail);
}

function listPlanTop6(success, fail) {
  api.get(`/plan/list/top6`).then(success).catch(fail);
}

function getPlan(planId, success, fail) {
  api.get(`/plan/detail/${planId}`).then(success).catch(fail);
}

export { listPlan, getPlan, listPlanTop6 };
