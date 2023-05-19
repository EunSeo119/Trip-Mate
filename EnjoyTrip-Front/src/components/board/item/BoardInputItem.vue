<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="subject-group" label="제목:" label-for="subject" description="제목을 입력하세요.">
          <b-form-input
            id="subject"
            v-model="article.title"
            type="text"
            ref = "title"
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
            ref = "content"
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>
        <div class="d-flex justify-content-between mb-1">
          <div>
            <button type="submit" class="btn custom-btn2 m-1" v-if="this.type === 'register'" @mouseover="changeButtonColor" @mouseout="resetButtonColor" style = "border: solid 2px #BCF0B6;">글작성</button>
            <button type="submit" class="btn custom-btn2 m-1" v-else @mouseover="changeButtonColor" @mouseout="resetButtonColor" style = "border: solid 2px #BCF0B6;">글수정</button>  
            <button type="reset" class="btn custom-btn2 m-1" @mouseover="changeButtonColor" @mouseout="resetButtonColor" style = "border: solid 2px #BCF0B6;">초기화</button>
          </div>
          <div>
            <button class="btn custom-btn" @click="moveList" @mouseover="changeButtonColor" @mouseout="resetButtonColor">목록</button>
          </div>
        </div>
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
        noticeId: 0,
        title: "",
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
      let param = this.$route.params.noticeId;
      getArticle(
        param,
        ({ data }) => {
          this.article = data;
          console.log("here~~", this.article.noticeId);
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
      err && !this.article.title && ((msg = "제목 입력해주세요"), (err = false), this.$refs.title.focus());
      err && !this.article.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.noticeId = 0;
      this.article.title = "";
      this.article.content = "";
      this.$refs.file.value = null;
      
    },
    registArticle() {
      let formData = new FormData();
      formData.append("title", this.article.title);
      formData.append("content", this.article.content);
      formData.append("file", this.$refs.file.files[0]); // 이미지 파일 추가
      
      writeArticle(
        formData,
        ({ data }) => {
          console.log("data", data)
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    modifyArticle() {
      let formData = new FormData();
      formData.append("noticeId", this.article.noticeId);
      formData.append("title", this.article.title);
      formData.append("content", this.article.content);
      formData.append("file", this.$refs.file.files[0]);
      modifyArticle(
        formData,
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
  },
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
