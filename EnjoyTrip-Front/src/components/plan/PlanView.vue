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
            <!-- <div class="tab-content mt-2" id="mapcontent">
              <div
                class="tab-pane fade show active"
                id="tabpane"
                role="tabpanel"
                aria-labelledby="tabpane"
              >
                <div class="map_wrap">
                  <div id="map" style="width: 100%; height: 700px"></div>
                  지도 확대, 축소 컨트롤 div 입니다
                  <div class="custom_zoomcontrol radius_border">
                    <span @click="zoomIn"
                    <span 
                      ><img
                        src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
                        alt="확대"
                    /></span>
                    <span @click="zoomOut"
                    <span
                      ><img
                        src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
                        alt="축소"
                    /></span>
                  </div>
                </div>
              </div>
            </div> -->
          </b-container>
        </b-row>
      </b-col>
      <b-col md="2" class="shadow" style="padding-top: 10px; max-height: 950px; text-align: center">
        <h3 style="font-weight: bold; padding: 43px 0px 43px 0px">내 계획</h3>
        <!-- <div class="p-3">
          <b-row class="mb-1 justify-content-center"
            ><p class="mb-4" v-if="sdate && edate">{{ sdate }} ~ {{ edate }}</p>
            <b-form-datepicker
              size="sm"
              v-model="sdate"
              placeholder="시작일을 선택해주세요"
              :min="nowtime"
              :max="edate"
              class="mb-1"
              style="max-width: 200px"
            ></b-form-datepicker
          ></b-row>
          <b-row class="justify-content-center">
            <b-form-datepicker
              size="sm"
              v-model="edate"
              placeholder="시작일을 선택해주세요"
              :min="sdate"
              class="mb-1"
              style="max-width: 200px"
            ></b-form-datepicker
          ></b-row>
        </div> -->
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
        <b-row style="display: flex; justify-content: center">
          <!-- <b-button size="lg" @click="completePlan()" id="btncomplete">저장하기</b-button> -->
          <b-button size="lg" @click="showModal" id="btncomplete">저장하기</b-button>
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
          <b-form-datepicker id="start-date" v-model="startDate" locale="ko"></b-form-datepicker>
        </b-form-group>
        <b-form-group label="끝 날짜" label-for="end-date">
          <b-form-datepicker id="end-date" v-model="endDate" locale="ko"></b-form-datepicker>
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
    savePlan() {
      // 저장하기 버튼을 클릭했을 때 실행되는 메소드
      // 입력된 제목, 내용, 시작 날짜, 마감 날짜, 공유 여부를 사용하여 저장하는 로직을 추가하세요.
      console.log("제목:", this.title);
      console.log("내용:", this.content);
      console.log("시작 날짜:", this.startDate);
      console.log("마감 날짜:", this.endDate);
      console.log("공유 여부:", this.shared);

      // 저장 후에는 모달을 닫을 수 있습니다.
      this.modalVisible = false;
    },
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
  },
};

// export default {
//   name: "PlanView",
//   components: {
//     draggable,
//     PlanOptionBar,
//   },
//   computed: {
//     ...mapState(tourListStore, ["sidoCode", "gugunCode", "contentTypeId", "tourList"]),
//     ...mapState(memberStore, ["userInfo"]),
//   },
//   watch: {
//     sidoCode: function () {
//       this.place = this.donames[this.sidoCode];
//     },
//     sdate: function () {
//       this.planInfo.start_date = this.sdate;
//       // console.log("시작 날짜 선택 : " + this.planInfo.start_date);
//     },
//     edate: function () {
//       this.planInfo.end_date = this.edate;
//       // console.log("종료 날짜 선택 : " + this.planInfo.end_date);
//     },
//   },
//   data() {
//     return {
//       donames: {
//         1: "서울",
//         2: "인천",
//         3: "대전",
//         4: "대구",
//         5: "광주",
//         6: "부산",
//         7: "울산",
//         8: "세종시",
//         31: "경기도",
//         32: "강원도",
//         33: "충청북도",
//         34: "충청남도",
//         35: "경상북도",
//         36: "경상남도",
//         37: "전라북도",
//         38: "전라남도",
//         39: "제주도",
//       },
//       place: "전체",
//       nowtime: "2022-11-25",
//       sdate: "",
//       edate: "",
//       planInfo: {
//         title: "나의 여행 계획 1",
//         start_date: "",
//         end_date: "",
//         user_id: "",
//         invited_user: "joody",
//       },
//       myChoices: [],
//       places: [],
//       map: null,
//       markers: [],
//       latitude: 0,
//       longitude: 0,
//       overlay: null,
//       msg: "여행 계획 등록 중 문제가 발생하였습니다.",
//     };
//   },
//   mounted() {
//     window.kakao && window.kakao.maps ? this.initMap() : this.addKakaoMapScript();
//   },
//   methods: {
//     addChoice(tour_info) {
//       console.log(tour_info);
//       let newInfo = {
//         idx: tour_info.idx,
//         name: tour_info.title,
//         type: tour_info.contentTypeId,
//         imgsrc: tour_info.image,
//         lat: tour_info.mapy,
//         lng: tour_info.mapx,
//         addr: tour_info.addr1,
//       };
//       this.myChoices.push(newInfo);
//     },
//     deleteChoice(delete_name) {
//       // 여행지 선택 취소
//       let filtered = this.myChoices.filter((o) => o.name !== delete_name);
//       this.myChoices = filtered;
//     },
//     completePlan() {
//       // 여행 계획 저장(완성)하기 버튼 클릭 시
//       let myId = this.userInfo.id;
//       this.planInfo.user_id = myId;

//       if (this.myChoices.length == 0) alert("추천 장소에서 여행지를 선택해주세요.");
//       if (this.sdate == "" || this.edate == "") alert("날짜를 선택해주세요");
//       else {
//         let idxInfo = [];
//         this.myChoices.forEach((item) => {
//           idxInfo.push(item.idx); // 선택한 여행지들의 idx만 담는다.
//         });
//         // 나의 여행 계획 정보를 추가
//         api.post(`/plan/regist`, this.planInfo).then(({ data }) => {
//           if (data == "fail") {
//             alert(this.msg);
//             this.$router.push({ name: "planview" });
//           } else this.addDetails(idxInfo, myId);
//         });
//       }
//     },
//     addDetails(idxInfo, myId) {
//       // 선택한 여행지 목록들을 post
//       api.post(`/plan/detail/${myId}`, idxInfo).then(({ data }) => {
//         if (data == "fail") {
//           alert(this.msg);
//           this.$router.push({ name: "planview" });
//         } else {
//           // 유저가 새로 생성한 계획의 idx가 잘 반환되었으므로 다음 페이지로 전환
//           // console.log(data + "번 계획 추가 완료");
//           this.$router.push({ name: "planinfo", params: { planidx: data } });
//         }
//       });
//     },
//     zoomIn() {
//       this.map.setLevel(this.map.getLevel() - 1);
//     },
//     zoomOut() {
//       this.map.setLevel(this.map.getLevel() + 1);
//     },
//     addKakaoMapScript() {
//       const script = document.createElement("script");
//       /* global kakao */
//       script.onload = () => kakao.maps.load(this.initMap);
//       script.src =
//         "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
//         process.env.VUE_APP_KAKAOMAP_KEY;
//       document.head.appendChild(script);
//     },
//     initMap() {
//       const container = document.getElementById("map");
//       const options = {
//         center: new kakao.maps.LatLng(33.450701, 126.570667),
//         level: 3,
//       };
//       this.map = new kakao.maps.Map(container, options);
//     },
//     makeMapMarkers() {
//       // ****** 여러개 마커에 이벤트 등록하기1 ******
//       this.markers.forEach(function (mark) {
//         mark.setMap(null);
//       });
//       this.markers = [];

//       var positions = [];
//       this.tourList.forEach((tour) => {
//         let addr = tour.addr1;
//         let image;
//         if (tour.image) image = tour.image;
//         else image = "/defaultImage.jpg";
//         let mapx = tour.mapx;
//         let mapy = tour.mapy;
//         let tel = tour.tel;
//         let title = tour.title;
//         let zipcode = tour.zipcode;
//         positions.push({
//           content: `<div class="wrap" style="border-radius: 5px; margin-top: 3%;">
//         <div class="info" style="border-radius: 5px; background-color: white;">
//           <div class="title" style=" border-radius: 5px; background-color: #ffdbdb; padding-left:5px; padding-right:5px;">${title}
//          </div>
//           <div class="body">
//             <div>
//               <b-img :img-src="${image}" width="73" height="70">
//             </div>
//             <div class="desc">
//               <div class="ellipsis">${addr}</div>
//               <div class="ellipsis">(우) ${zipcode}</div>
//               <div class="ellipsis">(전화번호) ${tel}</div>
//             </div>
//           </div>
//         </div>
//       </div>`,
//           latlng: new kakao.maps.LatLng(mapy, mapx),
//         });
//       });

//       for (var i = 0; i < positions.length; i++) {
//         // 마커를 생성합니다
//         var marker = new kakao.maps.Marker({
//           map: this.map, // 마커를 표시할 지도
//           position: positions[i].latlng, // 마커의 위치
//         });

//         this.map.setLevel(7);
//         this.map.setCenter(positions[i].latlng);

//         this.markers.push(marker);

//         // 마커 위에 커스텀오버레이를 표시합니다
//         // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
//         let overlay = new kakao.maps.CustomOverlay({
//           content: positions[i].content,
//           map: this.map,
//           position: marker.getPosition(),
//         });

//         overlay.setMap(null);
//         // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
//         kakao.maps.event.addListener(marker, "mouseover", () => {
//           overlay.setMap(this.map);
//         });

//         kakao.maps.event.addListener(marker, "mouseout", () => {
//           overlay.setMap(null);
//         });
//       }
//     },
//   },
// };
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
