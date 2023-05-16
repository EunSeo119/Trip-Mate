<template>
  <div class="login-container">
    <div class="login-title">
      <h3 class="text-success font-weight-bold">로그인</h3>
      <!-- <p class="font-italic">login</p> -->
    </div>
    <form class="login-form" @submit.prevent="confirm">
      <div class="form-group">
        <label class="input-title font-weight-bold text-success" for="userid">아이디</label>
        <input
          id="userId"
          v-model="user.userId"
          class="form-control input-item"
          required
          placeholder="아이디를 입력해주세요"
          @keyup.enter="confirm"
        />
      </div>
      <div class="form-group">
        <label class="input-title font-weight-bold text-success" for="userpwd">비밀번호</label>
        <input
          type="password"
          id="password"
          class="form-control input-item"
          v-model="user.password"
          required
          placeholder="비밀번호를 입력해주세요"
          @keyup.enter="confirm"
        />
      </div>
      <div class="form-group text-center">
        <button type="submit" class="btn btn-success font-weight-bold btn-login">로그인</button>
      </div>
    </form>
    <div class="login-links">
      <router-link to="/findpassword" class="text-success font-weight-bold"
        >비밀번호 찾기</router-link
      >
      <router-link :to="{ name: 'join' }" class="text-success font-weight-bold"
        >회원가입</router-link
      >
    </div>
    <div v-if="isLoginError" class="alert alert-danger mt-3 text-center" role="alert">
      아이디 또는 비밀번호를 확인하세요.
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserLogin",
  data() {
    return {
      user: {
        userId: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getUserInfo(token);
        // console.log("4. confirm() userInfo :: ", this.userInfo);
        this.$router.push({ name: "main" });
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 450px;
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-top: 10%;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
}

.input-title {
  margin-bottom: 5px;
  display: block;
}

.input-item {
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  width: 100%;
  border-radius: 0;
  border-bottom-color: lightgray;
}

.input-item:focus {
  outline: none;
  border-bottom-width: 2px;
  border-bottom-color: #467cc2;
}

.btn-login {
  width: 100%;
  background-color: #467cc2;
  border: none;
}

.btn-login:hover {
  background-color: #c2d6f0;
}

.login-links {
  margin-top: 20px;
  text-align: center;
}

.login-links a {
  margin: 0 10px;
}

.text-success {
  color: #467cc2 !important;
}
</style>
