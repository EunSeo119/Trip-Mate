<template>
  <b-container class="bv-example-row mt-3">
    <div style="display: flex; justify-content: space-between; align-items: center" class="mt-5">
      <h3 style="text-align: center; flex-grow: 1">여행계획 공유</h3>
      <!-- <button v-if="isAdminUser" class="btn custom-btn" @click="moveWrite()" @mouseover="changeButtonColor" @mouseout="resetButtonColor">글쓰기</button> -->
    </div>
    <b-row>
      <b-col class="mt-2">
        <b-table striped hover :items="plans" :fields="fields" @row-clicked="viewSharePlan">
          <template #cell(createDate)="data">
            {{ formatDate(data.item.createDate) }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { listPlan } from "@/api/share";
// import store from "@/store";

export default {
  name: "ShareList",
  data() {
    return {
      plans: [],
      fields: [
        { key: "planId", label: "글번호", tdClass: "tdClass" },
        { key: "title", label: "제목", tdClass: "tdSubject font-weight-bold text-center" },
        { key: "userId", label: "작성자", tdClass: "tdClass" },
        { key: "createDate", label: "작성일", tdClass: "tdClass" },
        { key: "views", label: "조회수", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    listPlan(
      ({ data }) => {
        this.plans = data;
        console.log(this.plans);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    // moveWrite() {
    //   this.$router.push({ name: "boardwrite" });
    // },
    viewSharePlan(plan) {
      console.log(plan.planId )
      this.$router.push({
        name: "shareview",
        params: { planId: plan.planId },
      });
    },
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear().toString().slice(-2);
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      const day = ("0" + d.getDate()).slice(-2);
      return `${year}.${month}.${day}`;
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
      target.style.backgroundColor = ""; // 원래의 배경색으로 되돌리려면 빈 문자열로 설정합니다.
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
.custom-btn {
  border: solid 2px #c2d6f0;
}
</style>
