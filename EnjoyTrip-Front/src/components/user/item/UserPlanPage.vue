<template>
  <div>
    <div class="my-row">
      <div class="my-col">
        <div class="my-jumbotron">
          <h2>Plans</h2>
          <p>내가 만든 여행계획들</p>
          <hr class="my-4" />

          <div class="like-main">
            <plan-list-item
              v-for="plan in plans"
              :key="plan.planId"
              :plan="plan"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PlanListItem from "@/components/user/item/PlanListItem.vue";
import { mapState } from "vuex";
import { apiInstance } from "@/api/index.js";

const api = apiInstance();
const memberStore = "memberStore";

export default {
  name: "UserPlanPage",
  data() {
    return {
      plans: [],
    };
  },
  components: {
    PlanListItem,
  },
  created() {
    console.log(this.userInfo);
    api.get(`/user/plan/${this.userInfo.userId}`).then((response) => {
      this.plans = response.data;
      console.log(this.plans);
    });
  },
  computed: {
    ...mapState(memberStore, ["likes", "userInfo"]),
  },
  methods: {},
};
</script>

<style>
.like-main {
  overflow-y: auto; /* 세로 스크롤을 표시하도록 설정 */
  max-height: 380px; /* 스크롤 가능한 최대 높이를 지정 (원하는 값으로 조정) */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.custom-btn {
  border: solid 2px #467cc2;
}
.my-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-col {
  flex: 1;
}

.my-jumbotron {
  padding: 70px;
  height: 546px;
}

.my-container {
  margin-top: 20px;
}

.my-4 {
  margin: 40px 0;
}

.my-1 {
  margin: 10px 0;
}
.my-input {
  width: 80%;
  height: 30px;
  padding-left: 10px;
  border: 1px solid #eaeaea;
}
</style>
