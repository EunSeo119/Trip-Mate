<template>
  <div class="wrapper mt-5">
    <div class="sidebar">
      <nav class="sidebar-nav">
        <ul class="nav">
          <li
            @click="changePage('UserModifyPageVue')"
            :class="{ 'sidebar-item-active': currentPage === 'UserModifyPageVue' }"
            class="sidebar-item"
          >
            <font-awesome-icon :icon="['far', 'user']" />
            <span>내 정보</span>
          </li>
          <li
            @click="changePage('UserLikePageVue')"
            :class="{ 'sidebar-item-active': currentPage === 'UserLikePageVue' }"
            class="sidebar-item"
          >
            <font-awesome-icon :icon="['far', 'heart']" />
            <span>관광지</span>
          </li>
          <li
            @click="changePage('UserLikePageVue')"
            :class="{ 'sidebar-item-active': currentPage === 'UserLikePageVue' }"
            class="sidebar-item"
          >
            <font-awesome-icon :icon="['far', 'star']" />
            <span>내여행계획</span>
          </li>
        </ul>
      </nav>
    </div>
    <div class="content">
      <component :is="currentPage"></component>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserLikePageVue from "./item/UserLikePage.vue";
import UserModifyPageVue from "./item/UserModifyPage.vue";

const memberStore = "memberStore";

export default {
  name: "UserMyPage",
  data() {
    return {
      currentPage: "UserModifyPageVue",
    };
  },
  components: {
    UserModifyPageVue,
    UserLikePageVue,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["getLikeListById"]),
    changePage(page) {
      this.getLikeListById();
      this.currentPage = page;
    },
  },
};
</script>

<style>
.wrapper {
  display: flex;
  justify-content: center;
  border: 2px solid #c2d6f0;
  height: 550px;
  width: 90%;
  margin-left: 15px;
}
.sidebar {
  flex: 0 0 200px;
  border-right: 2px solid #c2d6f0;
}
.nav {
  width: 100%;
}
.sidebar-item {
  transition: background-color 0.3s;
  width: 100%;
}

.sidebar-item:hover {
  background-color: #c2d6f0;
}
.sidebar-item-active {
  background-color: #c2d6f0;
}
.sidebar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
}

.sidebar-nav li {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
}

.sidebar-nav li span {
  margin-left: 10px;
  margin-top: 5px;
}

.content {
  flex-grow: 1;
  height: 100%;
}
</style>
