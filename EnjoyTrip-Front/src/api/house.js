import { apiInstance } from "./index.js";

const api = apiInstance();
// const house = houseInstance();

function sidoList(success, fail) {
  api.get(`/map/sido`).then(success).catch(fail);
}

function gugunList(params, success, fail) {
  const sidoCode = params.sido;
  api.get(`/travel/list/gugun/${sidoCode}`).then(success).catch(fail);
}

function houseListBySido(params, success, fail) {
  const sidoCode = params.sido;
  api.get(`/travel/list/${sidoCode}`).then(success).catch(fail);
}

function houseListByGugun(params, success, fail) {
  const sidoCode = params.sido;
  const gugunCode = params.gugun;
  console.log(sidoCode, gugunCode);
  api.get(`/travel/list/${sidoCode}/${gugunCode}`).then(success).catch(fail);
}

function houseListByType (params, success, fail) {
  const sidoCode = params.sido;
  const gugunCode = params.gugun;
  const typeCode = params.type;
  console.log(sidoCode, gugunCode, typeCode);
  api.get(`/travel/list/${sidoCode}/${gugunCode}/${typeCode}`).then(success).catch(fail);
}

export { sidoList, gugunList, houseListBySido, houseListByGugun, houseListByType };
