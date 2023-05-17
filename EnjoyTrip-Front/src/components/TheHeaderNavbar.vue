<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark"
      style="background-color: #d5e2f5; padding: 0% 10% 0% 10%"
    >
      <router-link :to="{ name: 'main' }" class="navbar-brand">
        <img
          :src="require('@/assets/logo.png')"
          id="logo"
          class="d-inline-block align-top"
          alt="로고"
        />
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#nav-collapse"
        aria-controls="nav-collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="nav-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'main' }" class="nav-link">
              <i class="bi bi-house-door" style="font-size: 2rem; animation: fade"></i>
              홈
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'travel' }" class="nav-link">
              <i class="bi bi-travel-fill" style="font-size: 2rem; animation: fade"></i>
              여행지 검색
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'planview' }" class="nav-link">
              <i class="bi bi-house-fill" style="font-size: 2rem; animation: fade"></i>
              여행 계획
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'board' }" class="nav-link">
              <i class="bi bi-journal" style="font-size: 2rem; animation: fade"></i>
              여행지 공유
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'insta' }" class="nav-link">
              <i class="bi bi-instagram" style="font-size: 2rem; animation: fade"></i>
              핫 플레이스
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'board' }" class="nav-link">
              <i class="bi bi-journal" style="font-size: 2rem; animation: fade"></i>
              공지사항
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link :to="{ name: 'todo' }" class="nav-link">
              <i
                class="bi bi-calendar-check"
                style="font-size: 2rem; animation: fade"
              ></i>
              TodoList
            </router-link>
          </li> -->
        </ul>

        <!-- after login -->
        <ul class="navbar-nav ml-auto" v-if="userInfo">
          <li class="nav-item align-self-center">
            <div class="avatar primary-bg">
              {{ userInfo.userId.charAt(0).toUpperCase() }}
            </div>
          </li>
          <li class="nav-item align-self-center">
            <span class="navbar-text" style="color: #333; font-family: 'Arial', sans-serif">
              {{ userInfo.username }}({{ userInfo.userId }})님 환영합니다.
            </span>
          </li>
          <li class="nav-item align-self-center">
            <router-link
              :to="{ name: 'mypage' }"
              class="nav-link"
              style="color: #333; font-family: 'Arial', sans-serif"
            >
              내 정보 보기
            </router-link>
          </li>
          <li class="nav-item align-self-center">
            <a href="#" class="nav-link" @click.prevent="onClickLogout">로그아웃</a>
          </li>
        </ul>

        <!-- before login -->
        <ul class="navbar-nav ml-auto" v-else>
          <li class="nav-item">
            <router-link :to="{ name: 'join' }" class="nav-link">
              <i class="bi bi-person-circle"></i> 회원가입
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'login' }" class="nav-link">
              <i class="bi bi-key"></i> 로그인
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "TheHeaderNavbar",
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    onClickLogout() {
      console.log(this.userInfo.userid);
      this.userLogout(this.userInfo.userid);
      sessionStorage.removeItem("access-token");
      sessionStorage.removeItem("refresh-token");
      sessionStorage.removeItem("vuex");
      if (this.$route.path !== "/") this.$router.push({ name: "main" });
    },
  },
};
</script>

<style scoped>
#logo {
  width: 240px;
}

.link {
  text-decoration: none;
}

.primary-bg {
  background-color: #467cc2;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.avatar {
  margin-right: 10px;
}

.navbar-text {
  margin-left: 5px;
}
</style>

<style scoped>
.navbar-dark .navbar-nav .nav-link {
  color: #333;
  font-family: "Arial", sans-serif;
}

/* .nav-link:hover {
  color: #467cc2 !important;
} */
</style>
