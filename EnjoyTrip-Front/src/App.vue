<template>
  <div id="app">
    <the-header-navbar></the-header-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar";

export default {
  name: "App",
  components: {
    TheHeaderNavbar,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

#app {
  font-family: 'Jua', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1.15rem;
}

a.router-link-exact-active {
  color: #89bfef;
}

a.router-link-exact-active:hover {
  text-decoration: none;
}
</style>