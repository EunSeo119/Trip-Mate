<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="subject-group" label="제목:" label-for="subject" description="제목을 입력하세요.">
          <b-form-input
            id="subject"
            v-model="article.subject"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group label="이미지 첨부:">
          <input type="file" accept=".png, .jpg, .jpeg" ref="file" @change="handleImageUpload">
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <!-- <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'register'">글작성</b-button>
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="reset" variant="primary" class="m-1">초기화</b-button>
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
         -->
        <button type="submit" class="btn custom-btn m-1" v-if="this.type === 'register'">글작성</button>
        <button type="submit" class="btn custom-btn m-1" v-else>글수정</button>  
        <button type="reset" class="btn custom-btn m-1">초기화</button>
        <button class="btn custom-btn" @click="moveList">목록</button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { writeArticle, modifyArticle, getArticle } from "@/api/board";

export default {
  name: "BoardInputItem",
  data() {
    return {
      article: {
        articleno: 0,
        subject: "",
        content: "",
      },
      isUserid: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      let param = this.$route.params.articleno;
      getArticle(
        param,
        ({ data }) => {
          this.article = data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.isUserid = true;
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImage = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      err && !this.article.subject && ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err && !this.article.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
      this.moveList();
    },
    registArticle() {
      let formData = new FormData();
      formData.append("title", this.article.subject);
      formData.append("content", this.article.content);
      formData.append("file", this.$refs.file.files[0]); // 이미지 파일 추가
      writeArticle(
        formData,
        ({ data }) => {
          console.log(data);
          let msg = "등록이 완료되었습니다.";
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    modifyArticle() {
      let param = {
        articleno: this.article.articleno,
        userid: this.article.userid,
        subject: this.article.subject,
        content: this.article.content,
      };
      modifyArticle(
        param,
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
