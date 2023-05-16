<template>
  <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
    <div class = "grid-main">
      <house-list-item
        v-for="house in paginatedHouses"
        :key="house.travelInfoId"
        :house="house"
      />  
    </div>
    <!-- <b-pagination
      v-model="currentPage"
      :total-rows="houses.length"
      :per-page="perPage"
      aria-controls="house-list"
      class="mt-3 pagination-m justify-content-center custom-pagination"
    ></b-pagination> -->
     <paginate
        :page-count="pageCount"
        :click-handler="goToPage"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        class = "justify-content-center"
      ></paginate>
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
import Paginate from 'vuejs-paginate'

const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    HouseListItem,
    Paginate,
  },
  data() {
    return {
      currentPage: 1, // Current page number
      itemsPerPage: 8, // Number of items to display per page
    };
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
    paginatedHouses() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.houses.slice(startIndex, endIndex);
    },
    pageCount() {
      return Math.ceil(this.houses.length / this.itemsPerPage);
    },
  },
  methods: {
     goToPage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style>
  .grid-main{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
    .pagination {
        margin:24px;
    }
    .pagination li {
        width:45px;
        height: 35px;
        padding:2px 6px;
        text-align:center;
        margin:0 3px;
        border-radius: 6px;
        border:1px solid #eee;
        padding-top: 5px;
    }
    .pagination li:hover {
        background: #467cc2;
    }
    .page-item a {
        color: black;
    }
    .pagination li.active {
        background-color : #c2d6f0;
        color:#fff;
    }
    .pagination li.active a {
        color:#fff;
    }
</style>
