<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mt-5">
      <b-col>
        <h3>글목록</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>삭제처리중...</b-col>
    </b-row>
  </b-container>
</template>

<script>
import { apiInstance } from "@/api/index.js";
// import { deleteArticle } from "@/api/board";

const api = apiInstance();

export default {
  name: "PlanDelete",
  created() {
    let param = this.$route.params.planId;
    api.delete(`/plan/delete/${param}`).then((response) => {
      let msg = "여행계획 삭제 성공!!!";
      console.log(response.data);
      alert(msg);
      this.moveList();
    });
    // deleteArticle(
    //   param,
    //   ({ data }) => {
    //     let msg = "삭제 처리시 문제가 발생했습니다.";
    //     if (data === "success") {
    //       msg = "삭제가 완료되었습니다.";
    //     }
    //     alert(msg);
    //     // 현재 route를 /list로 변경.
    //     this.$router.push({ name: "boardlist" });
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  },
  methods: {
    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "sharelist" });
    },
  },
};
</script>

<style></style>
