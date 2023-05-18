<template>
  <b-container class="bv-example-row mt-3">
    <b-row class = "mt-5">
      <b-col>
        <h3>글보기</h3>
      </b-col>
    </b-row>
    <div class="d-flex justify-content-between mb-3">
      <div>
        <button class="btn custom-btn" @click="moveList" @mouseover="changeButtonColor" @mouseout="resetButtonColor">목록</button>
      </div>
      <div>
        <button class="btn custom-btn2 mr-2" @click="moveModifyArticle" @mouseover="changeButtonColor" @mouseout="resetButtonColor">글수정</button>
        <button class="btn custom-btn2" @click="deleteArticle" @mouseover="changeButtonColor" @mouseout="resetButtonColor">글삭제</button>
      </div>
    </div>
    <b-row class="mb-1">
      <b-col>
        <div class="card mb-2">
          <div class="card-header">
            <div class="card-header-title mt-3 mb-3">
              <h3>{{ article.title }}</h3>
              <div>
                <font-awesome-icon :icon="['far', 'calendar']" style="color: #838891;"/>
                {{ new Date(article.createDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
                <span style="margin-right: 10px;"></span>
                <font-awesome-icon :icon="['far', 'eye']" style="color: #838891;"/>
                {{ article.views }}
              </div>
            </div>
          </div>
          <img :src="imageSrc" alt="Image">
          <div class="card-body text-left">
            <div v-html="message"></div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import { getArticle,  } from "@/api/board";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
       imageUrl: null,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    let param = this.$route.params.noticeId;
    getArticle(
      param,
      ({ data }) => {
        this.article = data;
        console.log(this.article);
        if (this.article.fileInfo != null){
        
            const sfolder = this.article.fileInfo.saveFolder; 
            const ofile = this.article.fileInfo.originalFile; 
            const sfile = this.article.fileInfo.saveFile; 
            const apiUrl = ` http://localhost:9999/download/${sfolder}/${ofile}/${sfile}`; // 이미지를 요청할 API 경로

            // 이미지 요청
            fetch(apiUrl)
              .then(response => response.blob())
              .then(blob => {
                // Blob을 URL로 변환하여 이미지 표시
                this.imageUrl = URL.createObjectURL(blob);
              })
              .catch(error => {
                console.error('Failed to load image:', error);
            });
        }
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
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "boarddelete",
          params: { noticeId: this.article.noticeId },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
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
      target.style.backgroundColor = '';
    },

    getImageUrl(fileInfo) {
      return `/upload/${fileInfo.saveFolder}/${fileInfo.saveFile}`;
    }
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style>
.custom-btn{
  border: solid 2px #c2d6f0;
}
.custom-btn2{
  border: solid 2px #BCF0B6;
}
</style>
