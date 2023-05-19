<template>
  <b-container class="bv-example-row mt-3">
    <div style="display: flex; justify-content: space-between; align-items: center;" class="mt-5">
      <h3 style="text-align: center; flex-grow: 1;">글목록</h3>
      <button v-if="isAdminUser" class="btn custom-btn" @click="moveWrite()" @mouseover="changeButtonColor" @mouseout="resetButtonColor">글쓰기</button>
    </div>
    <b-row>
      <b-col class="mt-2">
        <b-table striped hover :items="articles" :fields="fields" @row-clicked="viewArticle">
           <template #cell(createDate)="data">
              {{ formatDate(data.item.createDate) }}
            </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { listArticle } from "@/api/board";
import store from "@/store";

export default {
  name: "BoardList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "noticeId", label: "글번호", tdClass: "tdClass" },
        { key: "title", label: "제목", tdClass: "tdSubject font-weight-bold text-center" },
        { key: "createDate", label: "작성일", tdClass: "tdClass" },
        { key: "views", label: "조회수", tdClass: "tdClass" },
      ],
    };
  },
  computed: {
    isAdminUser() {
      const checkUserInfo = store.getters["memberStore/checkUserInfo"];
      if (checkUserInfo != null && checkUserInfo.userId == "admin")
        return 1;
      else{
        return 0;
      }
    },
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listArticle(
      param,
      ({ data }) => {
        this.articles = data;
        console.log(this.articles);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "boardview",
        params: { noticeId: article.noticeId },
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
      if (target.classList.contains('custom-btn')) {
        target.style.backgroundColor = '#c2d6f0';
      } else if (target.classList.contains('custom-btn2')) {
        target.style.backgroundColor = '#BCF0B6';
      }
    },

    resetButtonColor(event) {
      const target = event.target;
      target.style.backgroundColor = ''; // 원래의 배경색으로 되돌리려면 빈 문자열로 설정합니다.
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
.custom-btn{
  border: solid 2px #c2d6f0;
}
</style>
