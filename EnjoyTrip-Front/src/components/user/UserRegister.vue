<template>
  <div class="register-container">
    <div class="register-title">
      <h3 class="text-primary font-weight-bold">회원가입</h3>
    </div>
    <form class="register-form" @submit.prevent="register">
      <div class="form-group">
        <label class="input-title font-weight-bold text-primary" for="userid"
          >아이디</label
        >
        <input
          id="userid"
          v-model="user.userid"
          class="form-control input-item"
          required
          placeholder="아이디를 입력해주세요"
        />
        <!-- <button
          type="button"
          class="btn btn-primary btn-check"
          @click="checkDuplicateId"
        >
          중복확인
        </button> -->
      </div>
      <div class="form-group">
        <label class="input-title font-weight-bold text-primary" for="userpwd"
          >비밀번호</label
        >
        <input
          type="password"
          id="userpwd"
          class="form-control input-item"
          v-model="user.userpwd"
          required
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <div class="form-group">
        <label
          class="input-title font-weight-bold text-primary"
          for="userpwdConfirm"
          >비밀번호 확인</label
        >
        <input
          type="password"
          id="userpwdConfirm"
          class="form-control input-item"
          v-model="user.userpwdConfirm"
          required
          placeholder="비밀번호를 다시 입력해주세요"
        />
        <div
          v-if="
            user.userpwd &&
            user.userpwdConfirm &&
            user.userpwd !== user.userpwdConfirm
          "
          class="alert alert-danger mt-2"
          role="alert"
        >
          비밀번호가 일치하지 않습니다.
        </div>
      </div>
      <div class="form-group">
        <label class="input-title font-weight-bold text-primary" for="username"
          >이름</label
        >
        <input
          id="username"
          v-model="user.username"
          class="form-control input-item"
          required
          placeholder="이름을 입력해주세요"
        />
      </div>
      <div class="form-group">
        <label class="input-title font-weight-bold text-primary" for="email"
          >이메일</label
        >
        <input
          type="email"
          id="email"
          class="form-control input-item"
          v-model="user.email"
          required
          placeholder="이메일을 입력해주세요"
        />
      </div>
      <div class="form-group">
        <label class="input-title font-weight-bold text-primary"
          >현재 거주 지역</label
        >
        <b-col class="sm-3">
          <b-form-select
            v-model="sidoCode"
            :options="sidos"
            @change="gugunList"
          ></b-form-select>
        </b-col>
        <!-- <input
          id="favorite-color"
          v-model="user.favoriteColor"
          class="form-control input-item"
          required
          placeholder="현 거주 지역을 입력해주세요"
        /> -->
      </div>
      <div class="form-group text-center">
        <button
          type="submit"
          class="btn btn-primary font-weight-bold btn-register"
          :disabled="user.userpwd !== user.userpwdConfirm"
        >
          회원가입
        </button>
      </div>
    </form>
    <router-link to="/login" class="text-primary font-weight-bold">
      로그인
    </router-link>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 490px;
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-top: 10%;
}

.register-title {
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

.btn-register {
  width: 100%;
  background-color: #467cc2;
  border: none;
}

.btn-register:hover {
  background-color: #c2d6f0;
}

.register-links {
  margin-top: 20px;
  text-align: center;
}

.register-links a {
  margin: 0 10px;
}

.text-primary {
  color: #467cc2 !important;
}
</style>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserRegister",
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
        userpwdConfirm: null,
        username: null,
        email: null,
        sidoCode: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isRegistrationError"]),
  },
  methods: {
    ...mapActions(memberStore, ["registerUser", "checkDuplicateId"]),
    async register() {
      await this.registerUser(this.user);
      if (!this.isRegistrationError) {
        this.$router.push({ name: "login" });
      }
    },
    async checkDuplicateId() {
      await this.checkDuplicateId(this.user.userid);
      // Handle duplicate ID check response
    },
  },
};
</script>
