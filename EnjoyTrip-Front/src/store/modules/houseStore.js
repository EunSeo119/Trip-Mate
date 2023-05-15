import { sidoList, gugunList, houseList } from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" },],
    guguns: [{ value: null, text: "선택하세요" }],
    houses: [],
    house: null,
  },
  getters: {},
  mutations: {
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "선택하세요" },
                      { value: "1", text: "서울" },
                      { value: "2", text: "인천" },
                      { value: "4", text: "대구" },
                      { value: "5", text: "광주" },
                      { value: "6", text: "부산" },
                      { value: "8", text: "세종특별자치시" },
                      { value: "31", text: "경기도" },
                      { value: "32", text: "강원도" },
                      { value: "33", text: "충청북도" },
                      { value: "34", text: "충청남도" },
                      { value: "35", text: "경상북도" },
                      { value: "36", text: "경상남도" },
                      { value: "37", text: "전라북도" },
                      { value: "38", text: "전라남도" },
                      { value: "39", text: "제주도" },
                      { value: "1013900", text: "대전" },
                      { value: "1013911", text: "울산" },
                    ];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    // SET_SIDO_LIST(state, sidos) {
    //   sidos.forEach((sido) => {
    //     state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
    //   });
    // },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        console.log(gugun)
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
        // console.log(state.guguns);
      });
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
    },
    SET_DETAIL_HOUSE(state, house) {
      state.house = house;
    },
  },
  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = { sido: sidoCode };
      gugunList(
        params,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseList: ({ commit }, sidoCode, gugunCode) => {
      const params = {
        sido : sidoCode,
        gugun : gugunCode
      };
      houseList(
        params,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data.response.body.items.item);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_HOUSE", house);
    },
  },
};

export default houseStore;
