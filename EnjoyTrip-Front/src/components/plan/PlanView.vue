<template>
  <div id="main">
    <b-row id="mainrow" class="justify-content-center">
      <b-col
        md="2"
        class="shadow p-3 bg-body rounded text-center"
        style="height: 868px"
      >
        <div class="choice">
          <!-- <h3 :v-bind="place" class="pt-4">"{{ place }}"위치에서</h3> -->
          <h3 class="pt-4">""위치에서</h3>
          <h3>ㅇㅇ카테고리에서</h3>
          <div class="search-input">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              class="form-control"
            />
            <!-- <button class="search-btn" @click="search">검색</button> -->
            <button class="search-btn">검색</button>
          </div>
        </div>
        <hr />
        <div class="scrolldiv">
          <b-container class="m-0">
            <b-card
              no-body
              class="overflow-hidden places hover-effect"
              style="max-width: 100%"
              v-for="(tour, travelId) in this.travels"
              :key="travelId"
              @click="addChoice(tour)"
              @mouseover="mouseOverMarker(tour.title)"
              @mouseout="mouseOutMarker(tour.title)"
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
                  <div class="overlay">
                    <i class="fa-solid fa-circle-plus add-icon"></i>
                  </div>
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
            <the-kakao-map
              :travels="this.travels"
              :planTravels="this.planTravels"
              ref="kakao_map"
            ></the-kakao-map>
          </b-container>
        </b-row>
      </b-col>
      <b-col
        md="2"
        class="shadow"
        style="padding-top: 10px; max-height: 950px; text-align: center"
      >
        <h3 style="font-weight: bold; padding: 43px 0px 43px 0px">내 계획</h3>

        <hr />
        <div class="scrolldiv">
          <draggable v-model="myChoices" @end="updatePlanTravels">
            <transition-group>
              <div
                v-for="(choice, travelId) in myChoices"
                :key="travelId + 0"
                class="text-align-center my-plan-card"
              >
                <b-card
                  :img-src="`${choice.imgsrc}`"
                  img-top
                  img-height="130px"
                  class="mb-2 me-3"
                  style="max-width: 13rem; min-width: 15rem"
                >
                  <button
                    class="planbtn delete-btn"
                    @click="deleteChoice(choice.name)"
                  >
                    <i class="fa-solid fa-circle-minus" />
                  </button>
                  <b-card-text>
                    {{ choice.name }}
                  </b-card-text>
                </b-card>
              </div>
            </transition-group>
          </draggable>
        </div>
        <b-row style="display: flex; justify-content: center">
          <!-- <b-button size="lg" @click="completePlan()" id="btncomplete">저장하기</b-button> -->
          <b-button size="lg" @click="showModal" id="btncomplete"
            >저장하기</b-button
          >
        </b-row>
      </b-col>
    </b-row>
    <!-- 모달 -->
    <b-modal v-model="modalVisible" title="저장하기" hide-footer>
      <div class="d-flex flex-column align-items-center">
        <b-form-group label="제목" label-for="title-input">
          <b-form-input
            id="title-input"
            v-model="title"
            placeholder="제목을 입력하세요"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="내용" label-for="content-input">
          <b-form-textarea
            id="content-input"
            v-model="content"
            placeholder="내용을 입력하세요"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="시작 날짜" label-for="start-date">
          <b-form-datepicker
            id="start-date"
            v-model="startDate"
            locale="ko"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group label="끝 날짜" label-for="end-date">
          <b-form-datepicker
            id="end-date"
            v-model="endDate"
            locale="ko"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox v-model="shared">공유하기</b-form-checkbox>
        </b-form-group>
        <b-button @click="savePlan" class="mt-3">저장</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { apiInstance } from "@/api/index.js";
import { mapState } from "vuex";
import draggable from "vuedraggable";
import PlanOptionBar from "@/components/plan/PlanOptionBar.vue";
import TheKakaoMap from "@/components/TheKakaoMap.vue";
// import memberStore from "@/store/modules/memberStore";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const api = apiInstance();
const travelStore = "travelStore";
const memberStore = "memberStore";

export default {
  name: "PlanView",
  data() {
    return {
      planTravels: [],
      myChoices: [],
      modalVisible: false, // 모달 표시 여부를 관리하는 변수
      title: "", // 제목을 저장하는 변수
      content: "", // 내용을 저장하는 변수
      startDate: null, // 시작 날짜를 저장하는 변수
      endDate: null, // 마감 날짜를 저장하는 변수
      shared: false, // 공유 여부를 저장하는 변수
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
    showModal() {
      // 모달 표시 여부를 true로 설정하여 모달을 엽니다.
      this.modalVisible = true;
    },
    updatePlanTravels() {
      // 드래그가 완료되었을 때 호출되는 메소드
      this.planTravels = this.myChoices.map((choice) => {
        return {
          travelInfoId: choice.travelId,
          title: choice.name,
          lat: choice.lat,
          lng: choice.lng,
        };
      });
    },
    savePlan() {
      // 저장하기 버튼을 클릭했을 때 실행되는 메소드
      // 입력된 제목, 내용, 시작 날짜, 마감 날짜, 공유 여부를 사용하여 저장하는 로직을 추가하세요.
      console.log("제목:", this.title);
      console.log("내용:", this.content);
      console.log("시작 날짜:", this.startDate);
      console.log("마감 날짜:", this.endDate);
      console.log("공유 여부:", this.shared);

      let planInfo = {
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.content,
        userId: this.userInfo.userId,
        shared: this.shared,
        planTravels: this.planTravels,
      };
      console.log(planInfo);
      // api.post(`/plan/regist`, planInfo).then(({ data }) => {
      //   let msg = "여행계획 저장 시 문제 발생!!!";
      //   if (data === "success") msg = "여행계획 저장 성공!!!";
      //   alert(msg);
      //   // 저장 후에는 모달을 닫을 수 있습니다.
      //   this.modalVisible = false;
      // });
      api.post(`/plan/regist`, planInfo).then((response) => {
        let msg = "여행계획 저장 성공!!!";
        console.log(response.data);
        alert(msg);
        // 저장 후에는 모달을 닫을 수 있습니다.
        this.modalVisible = false;
      });
    },
    addChoice(tour_info) {
      console.log(tour_info);
      let newInfo = {
        travelId: tour_info.travelInfoId,
        name: tour_info.title,
        type: tour_info.travelTypeId,
        imgsrc: tour_info.firstImage,
        lat: tour_info.latitude,
        lng: tour_info.longitude,
        addr: tour_info.addr1,
      };
      let planTravel = {
        travelInfoId: tour_info.travelInfoId,
        title: tour_info.title,
        lat: tour_info.latitude,
        lng: tour_info.longitude,
      };
      this.planTravels.push(planTravel);
      this.myChoices.push(newInfo);
      console.log(this.myChoices);
    },
    mouseOverMarker(tour_name) {
      console.log("이름 나옴?" + tour_name);
      this.$refs.kakao_map.hoverMarker(tour_name);
    },
    mouseOutMarker(tour_name) {
      console.log("나옴나옴 나옴?????");
      this.$refs.kakao_map.hoverOutMarker(tour_name);
    },
    deleteChoice(delete_name) {
      // let temp = [];
      // for (let i = 0; i < this.myChoices.length; i++) {
      //   if (this.myChoices[i].name !== delete_name) {
      //     temp.push(this.myChoices[i]);
      //   }
      // }
      // this.myChoices = temp;
      // console.log(this.myChoices);
      this.myChoices = this.myChoices.filter(
        (choice) => choice.name !== delete_name
      );
      this.updatePlanTravels();
    },
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
  position: relative; /* add this */
}

/* Add these classes */
.hover-effect:hover {
  filter: brightness(0.8);
  cursor: pointer;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: #008cba;
}

.hover-effect:hover .overlay {
  opacity: 0.7;
}

.add-icon {
  color: white;
  font-size: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
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

.my-plan-card {
  position: relative;
}

.my-plan-card:hover {
  filter: brightness(80%);
}

.my-plan-card:hover .delete-btn {
  display: block;
}

.delete-btn {
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  background-color: rgba(255, 0, 0, 0.5); /* you can adjust color as needed */
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>
