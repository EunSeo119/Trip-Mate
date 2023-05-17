<template>
  <b-container class="bv-example-row mt-3">
    <b-row align-h="between" class="mt-5">
      <b-col cols="auto">
        <h3 style="text-align: left">글목록</h3>
      </b-col>
      <b-col cols="auto">
        <button class = "btn custom-btn" @click="moveWrite()" @mouseover="changeButtonColor" @mouseout="resetButtonColor">글쓰기</button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
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
        params: { articleno: article.articleno },
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
      event.target.style.backgroundColor = '#c2d6f0'; 
    },
    resetButtonColor(event) {
      event.target.style.backgroundColor = '#fff';
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
