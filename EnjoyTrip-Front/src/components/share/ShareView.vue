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
          v-if="isAdminUser"
          class="btn custom-btn2 mr-2"
          @click="moveModifyArticle"
          @mouseover="changeButtonColor"
          @mouseout="resetButtonColor"
        >
          게시물공유취소
        </button>
        <button
          v-if="isAdminUser"
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
            </div>
          </div>
          <div class="card-body text-left">
            <div v-html="message" class="mt-3"></div>
          </div>
          <div class="travel-section">여행지들</div>
          <div class="route-container">
            <div class="center-bar"></div>
            <div class="route-line"></div>
            <div class="route-group">
              <div
                class="route"
                v-for="(travel, index) in travels"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { getPlan } from "@/api/share";
import { mapState } from "vuex";
import store from "@/store";

const memberStore = "memberStore";

export default {
  name: "ShareDetail",
  data() {
    return {
      plan: {},
      travels: [],
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.plan.description)
        return this.plan.description.split("\n").join("<br>");
      return "";
    },
    isAdminUser() {
      const checkUserInfo = store.getters["memberStore/checkUserInfo"];
      if (checkUserInfo != null && checkUserInfo.userId == "admin") return 1;
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
        this.travels = data.planTravels;
        console.log(this.plan);
        console.log("이거" + this.travels[1].title);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
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
}

.right-route {
  justify-content: flex-end;
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
