<template>
  <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
    <div class = "grid-main">
      <house-list-item
        v-for="house in paginatedHouses"
        :key="house.travelInfoId"
        :house="house"
      />  
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="houses.length"
      :per-page="perPage"
      aria-controls="house-list"
      class="mt-3 pagination-m justify-content-center custom-pagination"
    ></b-pagination>
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show style = "border: 2px solid ##c2d6f0; background-color:#fff; ">여행지 목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import HouseListItem from "@/components/house/HouseListItem";
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    HouseListItem,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 8,
    };
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
    paginatedHouses() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.houses.slice(start, end);
    },
  },
};
</script>

<style scoped>
.grid-main{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.custom-pagination > li > a {
  color: red!important;;
}

.custom-pagination > li.active > a,
.custom-pagination > li > a:hover
{
  color: white;
  background-color: green!important;
}

</style>
