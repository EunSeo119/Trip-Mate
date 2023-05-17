<template>
  <div class="register-container">
    <div class="register-title">
      <h3 class="text-primary font-weight-bold">회원가입</h3>
    </div>
    <form class="register-form">
      <div class="form-group">
        <label class="input-title font-weight-bold text-primary" for="userId">아이디</label>
        <input
          id="userId"
          v-model="user.userId"
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
        <label class="input-title font-weight-bold text-primary" for="password">비밀번호</label>
        <input
          type="password"
          id="password"
          class="form-control input-item"
          v-model="user.password"
          required
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <div class="form-group">
        <label class="input-title font-weight-bold text-primary" for="passwordConfirm"
          >비밀번호 확인</label
        >
        <input
          type="password"
          id="passwordConfirm"
          class="form-control input-item"
          v-model="user.passwordConfirm"
          required
          placeholder="비밀번호를 다시 입력해주세요"
        />
        <div
          v-if="user.password && user.passwordConfirm && user.password !== user.passwordConfirm"
          class="alert alert-danger mt-2"
          role="alert"
        >
          비밀번호가 일치하지 않습니다.
        </div>
      </div>
      <div class="form-group">
        <label class="input-title font-weight-bold text-primary" for="name">이름</label>
        <input
          id="name"
          v-model="user.name"
          class="form-control input-item"
          required
          placeholder="이름을 입력해주세요"
        />
      </div>
      <div class="form-group">
        <label class="input-title font-weight-bold text-primary" for="email">이메일</label>
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
        <label class="input-title font-weight-bold text-primary">현재 거주 지역</label>
        <b-col class="sm-3">
          <b-form-select v-model="user.sidoCode" :options="sidos"></b-form-select>
        </b-col>
      </div>
      <div class="form-group text-center">
        <button
          type="button"
          class="btn btn-primary font-weight-bold btn-register"
          :disabled="user.password !== user.passwordConfirm"
          @click="register"
        >
          회원가입
        </button>
      </div>
    </form>
    <router-link to="/login" class="text-primary font-weight-bold"> 로그인 </router-link>
  </div>
</template>

<script>
import { apiInstance } from "@/api/index.js";
import { mapState, mapMutations } from "vuex";

const api = apiInstance();

const travelStore = "travelStore";

export default {
  name: "UserRegister",
  data() {
    return {
      user: {
        userId: null,
        password: null,
        passwordConfirm: null,
        name: null,
        email: null,
        sidoCode: null,
      },
    };
  },
  computed: {
    ...mapState(travelStore, ["sidos"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
  },
  methods: {
    ...mapMutations(travelStore, ["CLEAR_SIDO_LIST"]),
    register() {
      // 비동기
      // alert("회원가입 하러가자!!!!");
      let user = {
        userId: this.user.userId,
        password: this.user.password,
        name: this.user.name,
        email: this.user.email,
        sidoCode: this.user.sidoCode,
      };
      // api.post(`/user/join`, user).then(({data}) => {
      //   let msg = "회원가입 시 문제 발생!!!";
      //   if(data === "success")
      //     msg = "회원가입 성공!!!";
      //   alert(msg);
      //   this.moveList();
      // })
      // let _this = this;
      console.log(user);
      api.post(`/user/join`, user).then((response) => {
        let msg = "회원가입 성공!!!";
        console.log(response.data);
        alert(msg);
        console.log(this.$router);
        this.$router.push({ name: "login" });
      });
    },

    moveList() {
      console.log("로그인 하러가자!!!");
      this.$router.push({ path: "/user/login" });
    },
  },
};
</script>

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
