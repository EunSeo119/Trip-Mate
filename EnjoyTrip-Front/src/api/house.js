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

function houseList(params, success, fail) {
  const sidoCode = params.sido;
  const gugunCode = params.gugun;
  api.get(`/travel/list/gugun/${sidoCode}/${gugunCode}`).then(success).catch(fail);
}

export { sidoList, gugunList, houseList };
