<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mt-5">
      <b-col>
        <h3>공지사항</h3>
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
          글수정
        </button>
        <button
          v-if="isAdminUser"
          class="btn custom-btn2"
          @click="deleteArticle"
          @mouseover="changeButtonColor"
          @mouseout="resetButtonColor"
        >
          글삭제
        </button>
      </div>
    </div>
    <b-row class="mb-1">
      <b-col>
        <div class="card mb-2">
          <div class="card-header">
            <div class="card-header-title mt-3 mb-3">
              <h3>{{ article.title }}</h3>
              <div>
                <font-awesome-icon :icon="['far', 'calendar']" style="color: #838891" />
                {{
                  new Date(article.createDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                }}
                <span style="margin-right: 10px"></span>
                <font-awesome-icon :icon="['far', 'eye']" style="color: #838891" />
                {{ article.views }}
              </div>
            </div>
          </div>
          <button @click="downloadImage">이미지 다운로드</button>
          <div class="card-body text-left">
            <div class="d-flex justify-content-center align-items-center">
              <img :src="imageSrc" />
            </div>
            <div v-html="message" class="mt-3" style="text-align: center"></div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import { getArticle } from "@/api/board";
import { mapState } from "vuex";
import axios from "axios";
import store from "@/store";

const memberStore = "memberStore";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
      url: null,
      imageSrc: "",
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
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
    let param = this.$route.params.noticeId;
    getArticle(
      param,
      ({ data }) => {
        this.article = data;
        console.log(this.article);
        if (this.article.fileInfo != null) {
          const sfolder = this.article.fileInfo.saveFolder;
          const ofile = this.article.fileInfo.originalFile;
          const sfile = this.article.fileInfo.saveFile;
          // console.log("file!!!", sfolder, ofile, sfile);

          axios
            .get(`http://localhost:9999/board/download/${sfolder}/${ofile}/${sfile}`, {
              responseType: "blob",
            })
            .then((response) => {
              console.log("response", response);
              this.url = window.URL.createObjectURL(new Blob([response.data]));
              this.imageSrc = this.url;
            })
            .catch((error) => {
              console.error(error);
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

    downloadImage() {
      const link = document.createElement("a");
      link.href = this.url;
      link.setAttribute("download", this.article.fileInfo.originalFile);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
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
