<template>
  <div>
    <b-container v-if="travels && travels.length != 0" class="bv-example-row mt-3">
      <!-- <hr style="border: double 3px #eee" /> -->
      <div class="total_check">
        <div class="left_section">
          <strong>총<span id="totalCnt">38,876</span>건</strong>
        </div>
        <div class="right_section">
          <div class="btn-group">
            <button type="button" class="btn btn-primary">기본순</button>
            <button type="button" class="btn btn-primary">인기순</button>
            <button type="button" class="btn btn-primary">조회순</button>
          </div>
        </div>
      </div>
      <div class="grid-main">
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
        class="justify-content-center"
      ></paginate>
    </b-container>
    <b-container v-else class="bv-example-row mt-3">
      <b-row>
        <b-col
          ><b-alert show style="border: 2px solid ##c2d6f0; background-color: #fff"
            >여행지 목록이 없습니다.</b-alert
          ></b-col
        >
      </b-row>
    </b-container>
    <!-- <modal-window
      v-if="selectedTravel"
      :travel="selectedTravel"
      @close="selectedTravel = null"
    ></modal-window> -->
  </div>
</template>

<script>
import TravelListItem from "@/components/travel/TravelListItem";
// import ModalWindow from "@/components/share/ModalWindow.vue";
import { mapState } from "vuex";
import Paginate from "vuejs-paginate";

const travelStore = "travelStore";

export default {
  name: "TravelList",
  components: {
    // ModalWindow,
    TravelListItem,
    Paginate,
  },
  data() {
    return {
      currentPage: 1, // Current page number
      itemsPerPage: 16, // Number of items to display per page
      selectedTravel: null,
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
.grid-main {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.total_check {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: #f8f8f8; */
  padding: 10px;
  border-radius: 6px;
  margin: 10px;
}
.left_section {
  order: 1;
}
.right_section {
  order: 2;
}
.pagination {
  margin: 24px;
}
.pagination li {
  width: 45px;
  height: 35px;
  padding: 2px 6px;
  text-align: center;
  margin: 0 3px;
  border-radius: 6px;
  border: 1px solid #eee;
  padding-top: 5px;
}
.pagination li:hover {
  background: #467cc2;
  /* background-color: #c2d6f0 !important;
  border-color: #c2d6f0 !important; */
}
.page-item a {
  color: black;
}
.pagination li.active {
  background-color: #c2d6f0;
  color: #fff;
}
.pagination li.active a {
  color: #fff;
}
.btn-primary {
  background-color: #c2d6f0 !important;
  border-color: #c2d6f0 !important;
}
</style>
