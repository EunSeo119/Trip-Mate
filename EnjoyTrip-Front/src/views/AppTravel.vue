<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
      <b-col>
        <travel-search-bar></travel-search-bar>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <travel-list />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import TravelSearchBar from "@/components/travel/TravelSearchBar.vue";
import TravelList from "@/components/travel/TravelList.vue";

export default {
  name: "AppTravel",
  components: {
    TravelSearchBar,
    TravelList,
  },
};
</script>
<style scoped>
.underline-orange {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 149, 27, 0.3) 30%
  );
}
</style>
