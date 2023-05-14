<template>
  <b-container class="bv-example-row mt-3 text-center">
    <!-- <h3 class="underline-green">
      <b-icon icon="heart"></b-icon> HotPlace Service
    </h3> -->
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-jumbotron
          bg-variant="muted"
          text-variant="dark"
          border-variant="dark"
        >
          <template #header>HOT PLACE</template>

          <template #lead> 핫 플레이스 사진들 </template>

          <hr class="my-4" />

          <p>좋아요 많은 순, 리뷰 많은 순</p>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "AppInstagram",
};
</script>

<style scoped>
.underline-green {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(56, 233, 40, 0.3) 30%
  );
}
</style>
