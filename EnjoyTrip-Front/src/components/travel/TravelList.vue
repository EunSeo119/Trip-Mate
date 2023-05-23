<template>
  <b-container v-if="travels && travels.length != 0" class="bv-example-row mt-3">
    <div class = "grid-main">
      <travel-list-item
        v-for="travel in paginatedTravels"
        :key="travel.travelInfoId"
        :travel="travel"
      />  
    </div>
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
import TravelListItem from "@/components/travel/TravelListItem";
import { mapState } from "vuex";
import Paginate from 'vuejs-paginate'

const travelStore = "travelStore";

export default {
  name: "TravelList",
  components: {
    TravelListItem,
    Paginate,
  },
  data() {
    return {
      currentPage: 1, // Current page number
      itemsPerPage: 16, // Number of items to display per page
    };
  },
  computed: {
    ...mapState(travelStore, ["travels"]),
    paginatedTravels() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.travels.slice(startIndex, endIndex);
    },
    pageCount() {
      return Math.ceil(this.travels.length / this.itemsPerPage);
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
