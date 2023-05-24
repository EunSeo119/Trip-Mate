<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mt-5">
      <b-col>
        <h3>여행계획 상세보기</h3>
      </b-col>
    </b-row>
    <div class="d-flex justify-content-between mb-3">
      <div>
        <button
          class="btn custom-btn"
          @click="moveList"
          @mouseover="changeButtonColor"
          @mouseout="resetButtonColor"
        >
          목록
        </button>
      </div>
      <div>
        <button
          class="btn custom-btn2 mr-2"
          @click="showMap"
          @mouseover="changeButtonColor"
          @mouseout="resetButtonColor"
        >
          지도에서 보기
        </button>
        <button
          v-if="isUser"
          class="btn custom-btn2 mr-2"
          @click="moveModifyArticle"
          @mouseover="changeButtonColor"
          @mouseout="resetButtonColor"
        >
          게시물공유취소
        </button>
        <button
          v-if="isUser"
          class="btn custom-btn2"
          @click="deletePlan"
          @mouseover="changeButtonColor"
          @mouseout="resetButtonColor"
        >
          게시물삭제
        </button>
      </div>
    </div>
    <b-row class="mb-1">
      <b-col>
        <div class="card mb-2">
          <div class="card-header">
            <div class="card-header-title mt-3 mb-3">
              <h3>{{ plan.title }}</h3>
              <div>
                <h6>{{ plan.userId }}</h6>
              </div>
              <div class="plan-info">
                <div>
                  <font-awesome-icon
                    :icon="['far', 'calendar']"
                    style="color: #838891"
                  />
                  {{
                    new Date(plan.createDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  }}
                </div>
                <div>
                  <font-awesome-icon
                    :icon="['far', 'eye']"
                    style="color: #838891"
                  />
                  {{ plan.views }}
                </div>
              </div>
              <div class="card-body text-left">
                <div v-html="message" class="mt-3" style="text-align: center"></div>
              </div>
            </div>
          </div>
<<<<<<< HEAD
          <div class="card-body text-left">
            <div v-html="message" class="mt-3"></div>
          </div>
          <div class="travel-section">여행지들</div>
          <div class="container mt-5">
            <div class="p-x-15 blur">
              <div class="row">
                <div
                  class="col-md-6 bg-img"
                  style="
                    background-image: url(https://www.bootdey.com/image/600x600/FFB6C1/000000);
                    min-height: 320px;
                  "
                >
                  <p class="mb-0"></p>
                </div>
                <!-- / box-bg-image -->
                <div class="col-md-6 col-md-offset-6 p-30 text-center bg-white">
                  <h4 class="mb-50 fw-bold">ACHIEVEMENTS</h4>
                  <ul class="timeline">
                    <li class="timeline">
                      <div class="timeline-badge"></div>
                      <div class="timeline-panel">
                        <div class="timeline-heading">
                          <h5 class="timeline-title">University</h5>
                          <p class="text-sm">Web Development</p>
                          <p class="timeline-meta text-xs">
                            <i class="fas fa-map-marker-alt va-middle mr-5"></i>
                            <span class="va-middle mr-5">Miami</span>
                            <i class="fas fa-calendar-alt va-middle mr-5"></i>
                            <span class="va-middle">2016-2020</span>
                          </p>
                        </div>
                        <!-- / time-line-heading -->
                        <div class="timeline-body">
                          <p>
                            Quisque sit amet urna et neque porttitor mattis.
                          </p>
                        </div>
                        <!-- / timeline-body -->
                      </div>
                      <!-- / timeline-panel -->
                    </li>
                    <!-- timeline -->

                    <li class="timeline-inverted">
                      <div class="timeline-badge"></div>
                      <div class="timeline-panel">
                        <div class="timeline-heading">
                          <h5 class="timeline-title">High School</h5>
                          <p class="text-sm">Web Design</p>
                          <p class="timeline-meta text-xs">
                            <i class="fas fa-map-marker-alt va-middle mr-5"></i>
                            <span class="va-middle mr-5">New York</span>
                            <i class="fas fa-calendar-alt va-middle mr-5"></i>
                            <span class="va-middle">2012-2016</span>
                          </p>
                        </div>
                        <!-- / time-line-heading -->
                        <div class="timeline-body">
                          <p>
                            Quisque sit amet urna et neque porttitor mattis.
                          </p>
                        </div>
                        <!-- / timeline-body -->
                      </div>
                      <!-- / timeline-panel -->
                    </li>
                    <!-- timeline-inverted -->
                  </ul>
                  <!-- / timeline -->
                </div>
                <!-- / column -->
              </div>
              <!-- / row -->
            </div>
            <!-- / p-15 -->
          </div>
          <div class="route-container">
            <div class="center-bar"></div>
            <div class="route-line"></div>
            <div class="route-group">
              <div
                class="route"
                v-for="(travel, index) in stravels"
                :key="travel.no"
                :class="index % 2 === 0 ? 'left-route' : 'right-route'"
              >
                <div class="card travel-card">
                  <img
                    :src="travel.travelInfo.firstImage"
                    class="travel-image"
                    alt="여행지 이미지"
                  />
                  <div class="travel-details">
                    <div class="travel-title">
                      {{ travel.travelInfo.title }}
                    </div>
                    <div class="travel-address">
                      {{ travel.travelInfo.addr1 }}
                    </div>
                  </div>
=======

          <div class="container">
            <div class="p-x-15 blur">
              <div class="row" style="justify-content: center">
                <div
                  class="col-md-6 col-md-offset-6 p-30 text-center bg-white"
                  style="max-width: 80%"
                >
                  <ul class="timeline" style="width: 700px">
                    <li
                      class="timeline"
                      v-for="(travel, index) in stravels"
                      :key="travel.no"
                      :class="index % 2 === 0 ? 'timeline' : 'timeline-inverted'"
                    >
                      <div class="timeline-badge"></div>
                      <div class="timeline-panel" @click="selectedTravel = travel.travelInfo">
                        <div class="timeline-heading">
                          <h5 class="timeline-title">{{ travel.travelInfo.title }}</h5>
                          <p class="timeline-meta text-xs">
                            <i class="fas fa-map-marker-alt va-middle mr-5"></i>
                            <span class="va-middle mr-5">{{ travel.travelInfo.addr1 }}</span>
                          </p>
                        </div>
                        <div class="timeline-body">
                          <img
                            :src="travel.travelInfo.firstImage"
                            class="travel-image"
                            alt="여행지 이미지"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                  <p class="timeline-meta text-xs" style="padding: 3%">
                    <i class="fas fa-calendar-alt va-middle mr-5"></i>
                    <span class="va-middle"
                      >{{
                        new Date(plan.startDate).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      }}~{{
                        new Date(plan.endDate).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      }}</span
                    >
                  </p>
>>>>>>> bd481a0407f1ef20a54fbfb340380a1431ef2ce1
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- 템플릿 내에 다음 코드를 추가합니다 -->
    <modal-window
      v-if="selectedTravel"
      :travel="selectedTravel"
      @close="selectedTravel = null"
    ></modal-window>
  </b-container>
</template>

<script>
import { getPlan } from "@/api/share";
import { mapState, mapMutations } from "vuex";
import store from "@/store";
import ModalWindow from "@/components/share/ModalWindow.vue";

const memberStore = "memberStore";
const travelStore = "travelStore";

export default {
  name: "ShareDetail",
  components: {
    ModalWindow
  },
  data() {
    return {
      plan: {},
      stravels: [],
      selectedTravel: null,
    };
  },
  computed: {
    ...mapState(travelStore, ["travels"]),
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.plan.description)
        return this.plan.description.split("\n").join("<br>");
      return "";
    },
    isUser() {
      const checkUserInfo = store.getters["memberStore/checkUserInfo"];
      if (checkUserInfo != null && checkUserInfo.userId == this.plan.userId)
        return 1;
      else {
        return 0;
      }
    },
  },
  created() {
    let param = this.$route.params.planId;
    getPlan(
      param,
      ({ data }) => {
        this.plan = data;
        this.stravels = data.planTravels;
        console.log(this.plan);
        console.log("이거" + this.stravels[1].title);
        console.log("요고요고 나옴?" + this.stravels[1].title);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    ...mapMutations("travelStore", ["SET_STRAVELS"]),
    showMap() {
      this.SET_STRAVELS(this.stravels);
      this.$router.replace({
        name: "planview",
        // params: { shareTravels: this.stravels },
      });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { noticeId: this.article.noticeId },
      });
    },
    deletePlan() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "plandelete",
          params: { planId: this.plan.planId },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "sharelist" });
    },
    changeButtonColor(event) {
      const target = event.target;
      if (target.classList.contains("custom-btn")) {
        target.style.backgroundColor = "#c2d6f0";
      } else if (target.classList.contains("custom-btn2")) {
        target.style.backgroundColor = "#BCF0B6";
      }
    },
    resetButtonColor(event) {
      const target = event.target;
      target.style.backgroundColor = "";
    },
  },
};
</script>

<style>
body {
  background-color: #f9f9f9;
  margin-top: 20px;
}
.blur {
<<<<<<< HEAD
  -webkit-box-shadow: 0 0 15px rgba(188, 191, 200, 0.1),
    0 0 15px rgba(188, 191, 200, 0.2) !important;
  box-shadow: 0 0 15px rgba(188, 191, 200, 0.1),
    0 0 15px rgba(188, 191, 200, 0.2) !important;
=======
  -webkit-box-shadow: 0 0 15px rgba(188, 191, 200, 0.1), 0 0 15px rgba(188, 191, 200, 0.2) !important;
  box-shadow: 0 0 15px rgba(188, 191, 200, 0.1), 0 0 15px rgba(188, 191, 200, 0.2) !important;
  margin: 3%;
>>>>>>> bd481a0407f1ef20a54fbfb340380a1431ef2ce1
}
.mr-5 {
  margin-right: 5px !important;
}
.va-middle {
  vertical-align: middle !important;
}
.bg-img {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.timeline {
  list-style: none;
  padding: 20px 0;
  position: relative;
}
.timeline:before {
  top: 0;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 4px;
  background-color: #dddfe6;
  left: 50%;
  margin-left: -2px;
}
.timeline.w-icons:before {
  top: 0;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 3px;
  background-color: #dddfe6;
  left: 50%;
  margin-left: -1.5px;
}
.timeline > li {
  margin-bottom: 20px;
  position: relative;
}
.timeline > li:before,
.timeline > li:after {
  content: " ";
  display: table;
}
.timeline > li:after {
  clear: both;
}
.timeline > li:before,
.timeline > li:after {
  content: " ";
  display: table;
}
.timeline > li:after {
  clear: both;
}
.timeline > li > .timeline-panel {
  background-color: #fff;
  width: 50%;
  float: left;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  -moz-transition: 0.2s ease-in-out;
  -o-transition: 0.2s ease-in-out;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
<<<<<<< HEAD
  box-shadow: 0 2px 12px rgba(188, 191, 200, 0.1),
    0 2px 12px rgba(188, 191, 200, 0.2) !important;
}
.timeline > li > .timeline-panel:hover {
  transform: translateY(-3px);
  -webkit-box-shadow: 0 3px 20px rgba(188, 191, 200, 0.1),
    0 3px 20px rgba(188, 191, 200, 0.3) !important;
  box-shadow: 0 3px 20px rgba(188, 191, 200, 0.1),
    0 3px 20px rgba(188, 191, 200, 0.3) !important;
=======
  box-shadow: 0 2px 12px rgba(188, 191, 200, 0.1), 0 2px 12px rgba(188, 191, 200, 0.2) !important;
}
.timeline > li > .timeline-panel:hover {
  transform: translateY(-3px);
  -webkit-box-shadow: 0 3px 20px rgba(188, 191, 200, 0.1), 0 3px 20px rgba(188, 191, 200, 0.3) !important;
  box-shadow: 0 3px 20px rgba(188, 191, 200, 0.1), 0 3px 20px rgba(188, 191, 200, 0.3) !important;
>>>>>>> bd481a0407f1ef20a54fbfb340380a1431ef2ce1
}
.timeline > li:not(.timeline-inverted) {
  padding-right: 50px;
}
.timeline > li.timeline-inverted {
  padding-left: 50px;
}
.timeline.w-icons > li:not(.timeline-inverted) {
  padding-right: 85px;
}
.timeline.w-icons > li.timeline-inverted {
  padding-left: 85px;
}
.timeline > li > .timeline-badge {
  color: #fff;
  background: #dddfe6;
  width: 25px;
  height: 25px;
  line-height: 15px !important;
  font-size: 0.75rem;
  text-align: center;
  position: absolute;
  top: 20px;
  left: 50%;
  margin-left: -12.5px;
<<<<<<< HEAD
  z-index: 100;
=======
  /* z-index: 100; */
>>>>>>> bd481a0407f1ef20a54fbfb340380a1431ef2ce1
  border: 5px solid #fff;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}
.timeline.w-icons > li > .timeline-badge {
  color: #fff;
  background: #5d3997;
  width: 60px;
  height: 60px;
  line-height: 65px !important;
  font-size: 1rem;
  text-align: center;
  position: absolute;
  top: 20px;
  left: 50%;
  margin-left: -30px;
  z-index: 100;
  border: 0;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}
.timeline.w-icons > li > .timeline-badge .material-icons {
  line-height: 60px !important;
}
.timeline > li.timeline-inverted > .timeline-badge {
  top: 0;
}
.timeline > li.timeline-inverted > .timeline-panel {
  float: right;
}
ul.timeline {
  margin-bottom: 0;
}
.timeline-body > p,
.timeline-body > ul {
  margin-bottom: 0;
}
.timeline-body > p + p {
  margin-top: 5px;
}
.custom-btn {
  border: solid 2px #c2d6f0;
}
.custom-btn2 {
  border: solid 2px #bcf0b6;
}

.card-header-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plan-info {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  color: #838891;
  width: 15%;
}

.travel-section {
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
}

.route-container {
  position: relative;
  margin-top: 20px;
}

.center-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background-color: #ccc;
  transform: translateX(-50%);
  z-index: -1;
}

.route-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ccc;
  transform: translateY(-50%);
  z-index: -1;
}

.route-group {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: wrap;
}

.route {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 50px;
}

.left-route {
  justify-content: flex-start;
  float: left;
}

.right-route {
  justify-content: flex-end;
  float: right;
}

.travel-card {
  width: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.travel-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}

.travel-details {
  padding: 10px;
}

.travel-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.travel-address {
  color: #555;
}
</style>
