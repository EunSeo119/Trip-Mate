<template>
  <b-row class="mt-4 mb-4 text-center">
    <b-col class="sm-3">
      <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select v-model="gugunCode" :options="guguns"></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select v-model="typeCode" :options="types" ></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <button type="button" id="list-btn" class="btn custom-backgroud" @click="searchTravel" @mouseover="changeButtonColor" @mouseout="resetButtonColor" style = "border: solid 2px #c2d6f0;">
        조회하기
      </button>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

const travelStore = "travelStore";

export default {
  name: "TravelSearchBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      typeCode: null,
    };
  },
  computed: {
    ...mapState(travelStore, ["sidos", "guguns", "types", "travels"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_TYPE_LIST();
    this.CLEAR_HOUSES_LIST();
  },
  methods: {
    ...mapActions(travelStore, ["getSido", "getGugun", "getTravelListBySido", "getTravelListByGugun", "getTravelListByType"]),
    ...mapMutations(travelStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_TYPE_LIST", "CLEAR_HOUSES_LIST", "CLEAR_APT_LIST"]),
    // 시도에 따라 구군 설정하기
    gugunList() {
      console.log(this.sidoCode);
      this.gugunCode = null;
      this.CLEAR_GUGUN_LIST();
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    // 관광지 정보 검색하기
    searchTravel() {
      if (this.sidoCode && this.gugunCode == null)
        this.getTravelListBySido(this.sidoCode);
      else if(this.sidoCode && this.gugunCode && this.typeCode == null)
        this.getTravelListByGugun({ sidoCode: this.sidoCode, gugunCode: this.gugunCode });
      else{
        this.getTravelListByType({ sidoCode: this.sidoCode, gugunCode: this.gugunCode,  typeCode: this.typeCode});
      }

    },
    changeButtonColor(event) {
      event.target.style.backgroundColor = '#c2d6f0'; 
    },
    resetButtonColor(event) {
      event.target.style.backgroundColor = '#fff';
    },
  },
};
</script>

<style>

</style>