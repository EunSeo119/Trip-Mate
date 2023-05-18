<template>
  <div id="main">
    <b-row id="mainrow" class="justify-content-center">
      <b-col md="2" class="shadow p-3 bg-body rounded text-center" style="height: 868px">
        <div class="choice">
          <!-- <h3 :v-bind="place" class="pt-4">"{{ place }}"위치에서</h3> -->
          <h3 class="pt-4">""위치에서</h3>
          <h3>ㅇㅇ카테고리에서</h3>
          <div class="search-input">
            <input type="text" placeholder="검색어를 입력하세요" class="form-control" />
            <!-- <button class="search-btn" @click="search">검색</button> -->
            <button class="search-btn">검색</button>
          </div>
        </div>
        <hr />
        <div class="scrolldiv">
          <b-container class="m-0">
            <b-card
              no-body
              class="overflow-hidden places"
              style="max-width: 100%"
              v-for="(tour, idx) in this.travels"
              :key="idx"
            >
              <b-row>
                <b-col>
                  <b-card-img
                    :src="`${tour.firstImage}`"
                    img-alt="Image"
                    style="min-height: 100%"
                  ></b-card-img>
                </b-col>
                <b-col>
                  <b-card-text id="recommendtitle">
                    {{ tour.title }}
                  </b-card-text>
                  <button class="planbtn" @click="addChoice(tour)">
                    <i class="fa-solid fa-circle-plus" style="color: #d5e2f5" />
                  </button>
                </b-col>
              </b-row>
            </b-card>
          </b-container>
        </div>
      </b-col>
      <b-col md="8">
        <b-row>
          <b-container style="padding-top: 30px">
            <!-- <plan-option-bar @makeMarker="makeMapMarkers"></plan-option-bar> -->
            <plan-option-bar></plan-option-bar>
            <!-- <the-kakao-map :chargers="this.travels"></the-kakao-map> -->
            <the-kakao-map></the-kakao-map>
          </b-container>
        </b-row>
      </b-col>
      <b-col md="2" class="shadow" style="padding-top: 10px; max-height: 950px; text-align: center">
        <h3 style="font-weight: bold; padding: 43px 0px 43px 0px">내 계획</h3>
        <hr />
        <div class="scrolldiv">
          <draggable v-model="myChoices">
            <transition-group>
              <div v-for="(choice, idx) in myChoices" :key="idx + 0" class="text-align-center">
                <b-card
                  :img-src="`${choice.imgsrc}`"
                  img-top
                  img-height="130px"
                  class="mb-2 me-3"
                  style="max-width: 13rem; min-width: 15rem"
                >
                  <button class="planbtn" @click="deleteChoice(choice.name)">
                    <i class="fa-solid fa-circle-minus" style="color: red" />
                  </button>
                  <b-card-text>
                    {{ choice.name }}
                  </b-card-text>
                </b-card>
              </div>
            </transition-group>
          </draggable>
        </div>
        <b-row style="display: flex; justify-content: center"
          ><b-button size="lg" @click="completePlan()" id="btncomplete">저장하기</b-button></b-row
        >
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { apiInstance } from "@/api/index.js";
import draggable from "vuedraggable";
import PlanOptionBar from "@/components/plan/PlanOptionBar.vue";
import TheKakaoMap from "@/components/TheKakaoMap.vue";
// import memberStore from "@/store/modules/memberStore";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const travelStore = "travelStore";
const memberStore = "memberStore";

// const api = apiInstance();
// const tourListStore = "tourListStore";

export default {
  name: "PlanView",
  data() {
    return {
      myChoices: [],
    };
  },
  components: {
    draggable,
    PlanOptionBar,
    TheKakaoMap,
    // FontAwesomeIcon,
  },
  computed: {
    ...mapState(travelStore, ["travels"]),
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    addChoice(tour_info) {
      console.log(tour_info);
      let newInfo = {
        idx: tour_info.travelInfoId,
        name: tour_info.title,
        type: tour_info.travelTypeId,
        imgsrc: tour_info.firstImage,
        lat: tour_info.latitude,
        lng: tour_info.longitude,
        addr: tour_info.addr1,
      };
      this.myChoices.push(newInfo);
    },
    deleteChoice(delete_name) {
      let temp = [];
      for (let i = 0; i < this.myChoices.length; i++) {
        if (this.myChoices[i].name !== delete_name) {
          temp.push(this.myChoices[i]);
        }
      }
      // let filtered = this.myChoices.filter((o) => o.name !== delete_name);
      this.myChoices = temp;
    },
    completePlan() {},
  },
};
</script>

<style scoped>
#mainrow {
  margin: 5px;
  max-height: 800px;
  min-height: 800px;
}

.scrolldiv {
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  min-height: 700px;
  max-height: 700px;
}
.places {
  min-width: 120px;
  margin: 20px 20px 10px 0;
}
.choice > * {
  /* font-family: "Noto Sans KR", sans-serif; */
  font-weight: bold;
  color: #13151f;
  text-align: center;
  padding: 5px;
}

.planbtn {
  float: right;
  background-color: transparent;
  border-style: none;
  border: none;
  box-shadow: none;
  height: auto;
}

.card {
  border: 1px solid rgb(241, 241, 241);
}
.wrap {
  margin-top: 5%;
  height: 100%;
}
.map_wrap {
  position: relative;
  overflow: hidden;
  /* min-height: 300px; */
  margin-bottom: 5%;
}
.radius_border {
  border: 1px solid #919191;
  border-radius: 5px;
}
.custom_zoomcontrol {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 80px;
  overflow: hidden;
  z-index: 1;
  background-color: #f5f5f5;
}
.custom_zoomcontrol span {
  display: block;
  width: 36px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}
.custom_zoomcontrol span img {
  width: 15px;
  height: 15px;
  margin-top: 9px;
  margin-right: 1px;
  border: none;
}
.custom_zoomcontrol span:first-child {
  border-bottom: 1px solid #bfbfbf;
}

/* map overlay */
#map >>> .wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  min-height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 288px;
  min-height: 120px;
  border-radius: 10px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info >>> .title {
  padding: 5px 0 0 10px;
  min-height: 30px;
  background: rgb(208, 222, 240);
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
  width: 288px;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}
.info .body {
  width: 288px;
  margin-top: 7px;
  margin-bottom: 10px;
  display: flex;
}
.info .img {
  margin-left: 7px;
  margin-right: 5px;
}

.info .ellipsis {
  width: 200px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: normal;
}
#btncomplete {
  background-color: #d5e2f5;
  border: 0;
  color: black;
  font-weight: bold;
  padding: 16px;
  border-style: none;
  border: none;
  box-shadow: none;
  width: 80%;
  line-height: 10px;
  height: 50px;
}
#btncomplete:hover {
  background-color: #c2d6f0;
  color: black;
}
.search-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search-input input {
  flex: 1;
  margin-right: 10px;
}

.search-btn {
  background-color: #d5e2f5;
  border: none;
  padding: 6px 12px;
  font-weight: bold;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #c2d6f0;
}
</style>
