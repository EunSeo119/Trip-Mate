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
              <div>
                <font-awesome-icon :icon="['far', 'calendar']" style="color: #838891" />
                {{
                  new Date(plan.createDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                }}
                <span style="margin-right: 10px"></span>
                <font-awesome-icon :icon="['far', 'eye']" style="color: #838891" />
                {{ plan.views }}
              </div>
            </div>
          </div>
          <!-- <button @click="downloadImage">이미지 다운로드</button> -->
          <div class="card-body text-left">
            <!-- <div class="d-flex justify-content-center align-items-center">
              <img :src="imageSrc" />
            </div> -->
            <div v-html="message" class="mt-3"></div>
          </div>
          <div>여행지들</div>
          <h6 v-for="travel in travels" :key="travel.no">{{ travel }}</h6>
          <!-- <board-list-item
            v-for="article in articles"
            :key="article.articleno"
            :article="article"
          ></board-list-item> -->
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
// import { apiInstance } from "@/api/index.js";
import { getPlan } from "@/api/share";
import { mapState } from "vuex";
// import axios from "axios";
import store from "@/store";

// const api = apiInstance();
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
      if (this.plan.description) return this.plan.description.split("\n").join("<br>");
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
        console.log("이거" + this.travels);
      },
      (error) => {
        console.log(error);
      }
    );
    
    // api.get(`/travel/detail/${this.travels.travelInfoId}`).then((response) => {
    //   let msg = "여행지들 얻어오기 성공!!!";
    //   console.log(response.data);
    //   alert(msg);
    //   this.moveList();
    // });
  },
  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { noticeId: this.article.noticeId },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
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
</style>
