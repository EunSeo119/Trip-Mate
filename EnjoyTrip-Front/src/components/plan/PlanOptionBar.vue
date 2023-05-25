<template>
  <b-container fluid>
    <b-row class="mb-4 text-center justify-content-md-center">
      <!-- <h5>여행계획</h5> -->
      <b-col md="3">
        <b-form-select v-model="sidoCode" :options="sidos" @change="this.gugunList"></b-form-select>
      </b-col>
      <b-col md="3">
        <b-form-select
          v-model="gugunCode"
          :options="guguns"
          @change="this.searchTravel"
        ></b-form-select>
        <!-- <travel-search-bar></travel-search-bar> -->
      </b-col>
    </b-row>
    <b-tabs content-class="mt-3" v-model="tabInit" fill>
      <b-tab title="전체" @click="setContentTypeId(0)"></b-tab>
      <b-tab title="관광지" @click="setContentTypeId(12)"></b-tab>
      <b-tab title="문화시설" @click="setContentTypeId(14)"></b-tab>
      <b-tab title="축제" @click="setContentTypeId(15)"></b-tab>
      <b-tab title="여행코스" @click="setContentTypeId(25)"></b-tab>
      <b-tab title="레포츠" @click="setContentTypeId(28)"></b-tab>
      <b-tab title="숙박" @click="setContentTypeId(32)"></b-tab>
      <b-tab title="쇼핑" @click="setContentTypeId(38)"></b-tab>
      <b-tab title="음식점" @click="setContentTypeId(39)"></b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

const travelStore = "travelStore";

export default {
  name: "PlanListOptinBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      typeCode: null,
      tabInit: 0,
      selectedSido: "",
    };
  },
  computed: {
    ...mapState(travelStore, ["sidos", "guguns", "types", "travels"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_TYPE_LIST();
    this.CLEAR_TRAVELS_LIST();
  },
  methods: {
    ...mapActions(travelStore, [
      "getSido",
      "getGugun",
      "getTravelListBySido",
      "getTravelListByGugun",
      "getTravelListByType",
    ]),
    ...mapMutations(travelStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_TYPE_LIST",
      "CLEAR_TRAVELS_LIST",
      "CLEAR_APT_LIST",
      "SET_CONTENT_TYPE_ID",
    ]),
    // 시도에 따라 구군 설정하기
    gugunList() {
      // let selectedSido = "''위치에서";
      console.log("이건나옴");  
      console.log(this.sidoCode);
      this.gugunCode = null;
      this.CLEAR_GUGUN_LIST();
      if (this.sidoCode) this.getGugun(this.sidoCode);
      this.searchTravel();

      this.$emit("sidoCode", this.sidoCode);
    },
    // 관광지 정보 검색하기
    searchTravel() {
      if (this.sidoCode && this.gugunCode == null) this.getTravelListBySido(this.sidoCode);
      else if (this.sidoCode && this.gugunCode && this.typeCode == null)
        this.getTravelListByGugun({ sidoCode: this.sidoCode, gugunCode: this.gugunCode });
      else {
        this.getTravelListByType({
          sidoCode: this.sidoCode,
          gugunCode: this.gugunCode,
          typeCode: this.typeCode,
        });
      }
    },
    setContentTypeId(inputId) {
      console.log("실행");
      this.typeCode = inputId;
      // this.SET_CONTENT_TYPE_ID(inputId);
      this.searchTravel();
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 5%;
}
#btn-back {
  float: right;
}
h5 {
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 0;
}
.row {
  line-height: 50px;
}
.custom-select {
  height: 50px;
  width: 100%;
  border-style: none;
}
</style>
