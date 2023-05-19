import { apiInstance } from "./index.js";
import axios from 'axios';

const api = apiInstance();

function sidoList(success, fail) {
  api.get(`/map/sido`).then(success).catch(fail);
}

function gugunList(params, success, fail) {
  const sidoCode = params.sido;
  api.get(`/travel/list/gugun/${sidoCode}`).then(success).catch(fail);
}

function travelListBySido(params, success, fail) {
  const sidoCode = params.sido;
  api.get(`/travel/list/${sidoCode}`).then(success).catch(fail);
}

function travelListByGugun(params, success, fail) {
  const sidoCode = params.sido;
  const gugunCode = params.gugun;
  console.log(sidoCode, gugunCode);
  api.get(`/travel/list/${sidoCode}/${gugunCode}`).then(success).catch(fail);
}

function travelListByType (params, success, fail) {
  const sidoCode = params.sido;
  const gugunCode = params.gugun;
  const typeCode = params.type;
  console.log(sidoCode, gugunCode, typeCode);
  api.get(`/travel/list/${sidoCode}/${gugunCode}/${typeCode}`).then(success).catch(fail);
}
// function travelLike (params, success, fail) {
//   const travelInfoID = params.id;
//   console.log(travelInfoID);
//   // api.get(`/travel/status/${sidoCode}/${gugunCode}/${typeCode}`).then(success).catch(fail);
// }
function modifyLike(params, success, fail){
  console.log(params);
  axios.put('http://localhost:9999/travel/status/like', params).then(success).catch(fail);
}
export { sidoList, gugunList, travelListBySido, travelListByGugun, travelListByType, modifyLike };
