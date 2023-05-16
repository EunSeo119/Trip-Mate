<template>
  <div>
    <h3>
      <b-icon icon="heart"></b-icon> 여행계획세우기<b-icon
        icon="heart"
      ></b-icon>
    </h3>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AppPlan",
};
</script>

<style scoped>
div {
  margin-top: 100px;
}
</style>
