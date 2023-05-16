import { sidoList, gugunList, houseListBySido, houseListByGugun, houseListByType} from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" },],
    guguns: [{ value: null, text: "선택하세요" }],
    types:[],
    houses: [],
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
    CLEAR_TYPE_LIST(state) {
      state.types = [{ value: null, text: "선택하세요" },
                    { value: 12, text: '관광지' },
                    { value: 14, text: '문화시설' },
                    { value: 15, text: '축제공연행사' },
                    { value: 25, text: '여행코스' },
                    { value: 28, text: '레포츠' },
                    { value: 32, text: '숙박' },
                    { value: 38, text: '쇼핑' },
                    { value: 39, text: '음식점' },
                    ];
    },
    CLEAR_HOUSES_LIST(state) {
      state.houses = [];
    },
    // SET_SIDO_LIST(state, sidos) {
    //   sidos.forEach((sido) => {
    //     state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
    //   });
    // },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
        console.log(state.guguns);
      });
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
      console.log(state.houses);
    },
    // SET_DETAIL_HOUSE(state, house) {
    //   state.house = house;
    // },
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
    getHouseListBySido: ({ commit }, sidoCode) => {
      const params = { sido : sidoCode };
      houseListBySido(
        params,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseListByGugun: ({ commit }, {sidoCode, gugunCode}) => {
      const params = { 
        sido : sidoCode,
        gugun : gugunCode,
      };
      houseListByGugun(
        params,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseListByType: ({ commit }, {sidoCode, gugunCode, typeCode}) => {
      const params = { 
        sido : sidoCode,
        gugun : gugunCode,
        type : typeCode,
      };
      houseListByType(
        params,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data);
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
